<!-- blame firebase's strict client side query for all the if (room) checks lol -->
<script lang="ts">
    import DifficultySelectorMulti from "$lib/components/DifficultySelectorMulti.svelte";
    import SudokuBoardMulti from "$lib/components/SudokuBoardMulti.svelte";
	import ControllerMulti from "$lib/components/ControllerMulti.svelte";
    import ProgressBoard from "$lib/components/ProgressBoard.svelte";
    import Fa from "svelte-fa";
    import { faXmark, faCrown, faRightFromBracket, faLink, faCheck } from "@fortawesome/free-solid-svg-icons";
	import { db } from "$lib/firebase/app";
	import { userCred } from "$lib/firebase/user";
    import { Text, Button, ActionIcon, Modal, Space, Title, Overlay } from "@svelteuidev/core";
	import { deleteDoc, doc, onSnapshot, setDoc, type DocumentData, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
	import { onDestroy, onMount } from "svelte";
    import { page } from "$app/stores";
    import { getBoard } from "$lib/firebase/boardFirebase";

    let roomId = $page.params.roomSlug;
    let room: DocumentData;
    let difficulty: string;
    let started: boolean;
    let ended: boolean;
    let winner: "blue" | "red";
    let owner: boolean;
    let slot: "blue" | "red" = "blue";
    $: opponentSlot = slot === "blue" ? "red" : "blue";
    $: if (room) {
        ({difficulty, started, ended, winner} = room)
        owner = room[slot].owner
    }
    
    let boardComponent: SudokuBoardMulti;
    let controllerComponent: ControllerMulti;
    let board: number[][];
    let currentBoard: number[][];
    let fullBoard: number[][];

    $: if (room) {
        if (room[slot].boards) {
            board = JSON.parse(room[slot].boards.board);   
            fullBoard = JSON.parse(room[slot].boards.fullBoard);   
        }
    }

    let info: Record<string, string | null>;

    $: if ($userCred) {
        info = {
            uid: $userCred?.uid,
            name: $userCred?.displayName,
            avatar: $userCred?.photoURL
        }
    }

    let copied = false;

    let countdown: number;
    $: if (room) {
        countdown = room.countdown;
    }

    function startCountdown() {
        if (countdown !== 0) {
            setDoc(doc(db, "rooms", roomId), {
                countdown: countdown - 1
            }, { merge: true })
        }
    }

    function deleteRoom(roomID: string) {
        deleteDoc(doc(db, "rooms", roomID));
    }

    function copyMatchLink() {
        navigator.clipboard.writeText(`wedoku.vercel.app/multi/${roomId}`);
        copied = true;
    }

    function moveToSlot(oldTeam: "blue" | "red", newTeam: "blue" | "red", roomID: string) {
        if (room[newTeam].info.uid !== null) return
        setDoc(doc(db, "rooms", roomID), {
            [oldTeam]: {
                info: {
                    uid: null,
                    name: null,
                    avatar: null
                },
                owner: false
            }
            ,
            [newTeam]: {
                info,
                owner
            }
        }, { merge: true })
        slot = newTeam;
    }

    function addToRoom(roomID: string) {
        const sides: ["blue", "red"] = ["blue", "red"];

        if (room) {
            if (room.blue.info.uid === info.uid || room.red.info.uid === info.uid) return;

            for (const side of sides) {
                if (room.blue.info.uid === null && room.red.info.uid === null) {
                    setDoc(doc(db, "rooms", roomID), {                        
                        [side]: {
                            owner: true
                        }
                    }, { merge: true })
                }

                if (room[side].info.uid === null) {
                    setDoc(doc(db, "rooms", roomID), {                        
                        [side]: {info}
                    }, { merge: true })
                    slot = side;
                    
                    return
                }
            }        
        }
        // no more slots
    }

    function moveOwner(){
        if (room[slot].owner === false) return
        else {
            setDoc(doc(db, "rooms", roomId),{
                [slot]: {
                    owner: false
                },
                [opponentSlot]: {
                    owner: true
                }
            }, { merge: true })    
        }
    }

    function removeFromRoom(team: "blue" | "red", roomID: string) {
        setDoc(doc(db, "rooms", roomID), {
            [team]: {
                info: {
                    uid: null,
                    name: null,
                    avatar: null
                }
            }
        }, { merge: true })
    }

    function kick(team: "blue" | "red", roomID: string) {
        removeFromRoom(team, roomID);
    }

    function leaveRoom(team: "blue" | "red", roomID: string) {
        removeFromRoom(team, roomID);
        moveOwner();
    }

    async function startMatch(roomID: string) {
        if (room.blue.info.uid === null || room.red.info.uid === null) return
        ({ board, fullBoard } = await getBoard(difficulty))
        const boards = {
            board: JSON.stringify(board),
            currentBoard: JSON.stringify(board),
            fullBoard: JSON.stringify(fullBoard)
        }

        setDoc(doc(db, "rooms", roomID), {
            blue: {
                boards
            },
            red: {
                boards
            },
            started: true
        }, { merge: true })

        setInterval(startCountdown, 1000);
    }

    function recordGame() {
        updateDoc(doc(db, "users", $userCred!.uid), {
            pvpGameHistory: arrayUnion({
                difficulty,
                board: JSON.stringify(board),
                fullBoard: JSON.stringify(fullBoard),
                blue: room.blue.info,
                red: room.red.info,
                winner: slot
            })
        })
        updateDoc(doc(db, "users", room[opponentSlot].info.uid), {
            pvpGameHistory: arrayUnion({
                difficulty,
                board: JSON.stringify(board),
                fullBoard: JSON.stringify(fullBoard),
                blue: room.blue.info,
                red: room.red.info,
                winner: slot
            })
        })
    }

    function endMatch(roomID: string) {
        controllerComponent.playing = false;
        setDoc(doc(db, "rooms", roomID), {
            ended: true,
            winner: slot
        }, { merge: true })
        recordGame()
    }

    onMount(async () => {
        room = (await getDoc(doc(db, "rooms", roomId))).data()!
        addToRoom(roomId);
        onSnapshot(doc(db, "rooms", roomId), (doc) => {
			room = doc.data()!
		}) 
    })
    
    onDestroy(async () => {
        leaveRoom(slot, roomId)

        if (room.blue.info.uid === null || room.red.info.uid === null) {
            console.log("game deleted")
            deleteRoom(roomId)
        }
    })
</script>

<svelte:head>
	<title>Multiplayer Mode</title>
</svelte:head>

{#if started}
    {#if countdown}
        <Overlay opacity={0.6} color="#000" zIndex={5}/>
        <Text size={500} weight="bold" align="center">{countdown}</Text>
    {:else}
    <div class="game">
        <SudokuBoardMulti on:solved|once={() => endMatch(roomId)} bind:this={boardComponent} bind:currentBoard {board} {fullBoard} {roomId} {slot}/>
        <ControllerMulti bind:this={controllerComponent} board={boardComponent}/>
        <ProgressBoard {opponentSlot} {roomId}/>
        {#if ended}
        <Modal opened centered withCloseButton={false}>
            <Text align="center" size={50} color={slot === winner ? "green" : "red"}>{slot === winner ? "You won!" : "You lost..."}</Text>
            <Space h={100}/>
            <Button href="/" color="grape">BACK TO MENU</Button>
        </Modal>
        {/if}
    </div>
    {/if}
{:else}
    {#if room}
    <div class="room">
        <div class="difficulty">
            <DifficultySelectorMulti bind:selected={difficulty} {roomId} {owner}/>
        </div>
        
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="teams">
            <div class="team-blue">
                <Text color='blue'>Blue Team</Text>
                {#if room.blue}
                <div class="players">
                    <div class="player" >
                        <div class="info blue-team" on:click={() => moveToSlot("red", "blue", roomId)}>
                            {#if room.blue.info.avatar} <img src={room.blue.info.avatar || ""} alt="avatar"> {/if}
                            <Text size={12} align="center" override={{ overflow: "hidden", textOverflow: "ellipsis" }}>{room.blue.info.name || ""}</Text>
                        </div>
                        {#if room.blue.info.uid !== null && owner && room.blue.owner !== owner}
                        <ActionIcon color="red" on:click={() => kick("blue", roomId)}>
                            <Fa icon={faXmark} size="lg"/>
                        </ActionIcon>
                        {/if}
                        {#if room.blue.owner}
                            <Fa icon={faCrown} size="lg" color="gold" />
                        {/if}
                    </div>
                </div>
                {/if}
            </div>
            <div class="team-red">
                <Text color='red'>Red Team</Text>
                {#if room.red}
                <div class="players">
                    <div class="player" >
                        <div class="info red-team" on:click={() => moveToSlot("blue", "red", roomId)}>
                            {#if room.red.info.avatar} <img src={room.red.info.avatar || ""} alt="avatar"> {/if}
                            <Text size={12} align="center" override={{ overflow: "hidden", textOverflow: "ellipsis" }}>{room.red.info.name || ""}</Text>
                        </div>
                        {#if room.red.info.uid !== null && owner && room.red.owner !== owner}
                        <ActionIcon color="red" on:click={() => kick("red", roomId)}>
                            <Fa icon={faXmark} size="lg"/>
                        </ActionIcon>
                        {/if}
                        {#if room.red.owner}
                            <Fa icon={faCrown} size="lg" color="gold" />
                        {/if}
                    </div>
                </div>
                {/if}
            </div>
        </div>

        <Button disabled={!owner} on:click={() => startMatch(roomId)} color="grape">START MATCH</Button>
        <div class="exit-and-link">
            <a href="/" style="text-decoration: none"><Button color="red"> <!-- bugs HMR if use <Button href> -->
                <Fa icon={faRightFromBracket} slot="leftIcon"/>
                Leave Room
            </Button></a>
            <div class="copy-button-wrapper">
                <Button color="silver" on:click={copyMatchLink}>
                    <Fa icon={faLink} slot="leftIcon"/>
                    Copy Room ID
                </Button>
                {#if copied}
                    <Fa icon={faCheck} color="green" size="2.5x"/>
                {/if}
            </div>
        </div>
        <Text>ROOM ID: {roomId}</Text>

        {#if room[slot].info.uid === null}
        <Modal opened centered withCloseButton={false}>
            <Text align="center" size={50} color="red">Oopsie...</Text>
            <Space h={20}/>
            <Text align="center">Looks like you have been kicked from the room. You can always join another one though.</Text>
            <Space h={100}/>
            <Button href="/" color="grape">BACK TO MENU</Button>
        </Modal>
        {/if}
    </div>
    {:else}
    <div class="room-not-found">
        <Title align="center" weight="bold">*cricket sounds*</Title>
        <Text size={20}>Hmm, looks like this room does not exist. You can create a new one below.</Text>
        <a href="/multi" style="text-decoration: none"><Button color="grape">CREATE NEW ROOM</Button></a>
    </div>
    {/if}
{/if}

<style lang="scss">
    .game {
		display: flex;
		flex-direction: row;
		justify-content: center;

        margin-top: 4rem;
    }
    .room {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3rem;

        margin-top: 8rem;

        .difficulty {
            width: 60%;
        }

        .teams {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 20rem;

            .team-blue, .team-red {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2rem;

                .players {
                    display: flex;
                    flex-direction: row;

                    .player {
                        display: flex;
                        flex-direction: row;
                        gap: 8px;

                        .info {
                            display: flex;
                            flex-direction: column;
                            gap: 8px;

                            width: 5rem;
                            height: 6.5rem;
                            
                            border-radius: 5px;
                            padding: 15px;
                            cursor: pointer;

                            img {
                                aspect-ratio: 1;
                                width: 100%;
                            }
                        }

                        .blue-team {
                            background-color: rgba(47, 71, 255, 0.588);

                            &:hover {
                                background-color: rgba(47, 71, 255, 0.729);
                            }
                        }

                        .red-team {
                            background-color: rgba(255, 47, 47, 0.588);

                            &:hover {
                                background-color: rgba(255, 47, 47, 0.729);
                            }
                        }
                    }
                }
            }
        }

        .exit-and-link {
            display: flex;
            flex-direction: row;
            gap: 50vw;

            .copy-button-wrapper {
                display: flex;
                flex-direction: row;
                gap: 1rem;
            }
        }
    }

    .room-not-found {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5rem;
        
        margin-top: 10rem;
    }
</style>