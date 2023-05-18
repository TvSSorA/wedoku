<script lang="ts">
    import DifficultySelectorMulti from "$lib/components/DifficultySelectorMulti.svelte";
    import SudokuBoardMulti from "$lib/components/SudokuBoardMulti.svelte";
	import ControllerMulti from "$lib/components/ControllerMulti.svelte";
    import ProgressBoard from "$lib/components/ProgressBoard.svelte";
    import Fa from "svelte-fa";
    import { faXmark } from "@fortawesome/free-solid-svg-icons";
	import { db } from "$lib/firebase/app";
	import { userCred } from "$lib/firebase/user";
    import { Text, Button, ActionIcon } from "@svelteuidev/core";
	import { deleteDoc, doc, onSnapshot, setDoc, type DocumentData, getDoc } from "firebase/firestore";
	import { onDestroy, onMount } from "svelte";
    import { page } from "$app/stores";
    import { getBoard } from "$lib/firebase/boardFirebase";

    let roomId = $page.params.roomSlug;
    let room: DocumentData;
    let difficulty: string;
    let started: boolean;
    let owner: boolean;
    let slot = "blue";
    $: opponentSlot = slot === "blue" ? "red" : "blue";
    $: if (room) {
        ({difficulty, started} = room)
        owner = room[slot].owner
    }
    
    let boardComponent: SudokuBoardMulti;
    let board: number[][];
    let currentBoard: number[][];
    let fullBoard: number[][];

    let info = {
        uid: $userCred?.uid,
        name: $userCred?.displayName,
        avatar: $userCred?.photoURL
    }

    function deleteRoom(roomID: string) {
        deleteDoc(doc(db, "rooms", roomID));
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
        const sides = ["blue", "red"];

        for (const side of sides) {
            if (room && room.blue.info.uid === null && room.red.info.uid === null) {
                setDoc(doc(db, "rooms", roomID), {                        
                    [side]: {
                        owner: true
                    }
                }, { merge: true })
            }
            if (room && room[side].info.uid === null) {
                setDoc(doc(db, "rooms", roomID), {                        
                    [side]: {info}
                }, { merge: true })
                slot = side;
                
                return
            }
        }        

        // no more slots
    }

    function removeFromRoom(team: "blue" | "red", roomID: string) {
        setDoc(doc(db, "rooms", roomID), {
            [team]: {
                info: {
                    uid: null,
                    name: null,
                    avatar: null
                },
                owner: false
            }
        }, { merge: true })
    }

    async function startMatch(roomID: string) {
        //if (room.blue.info.uid === null || room.red.info.uid === null) return
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
    }

    onMount(async () => {
        room = (await getDoc(doc(db, "rooms", roomId))).data()!
        console.log(room)
        addToRoom(roomId);
        onSnapshot(doc(db, "rooms", roomId), (doc) => {
			room = doc.data()!
		})
    })
    
    /* onDestroy(async () => {
        await setDoc(doc(db, "rooms", roomId), {
            [slot]: {
                info: {
                    uid: null,
                    name: null,
                    avatar: null
                }
            }
        }, { merge: true })

        if (room && room.blue.info.uid === null && room.red.info.uid === null) {
            deleteRoom(roomId);
        }
    }) */
</script>
{#if started}
<div class="game">
	<SudokuBoardMulti on:solved|once={() => {}} bind:this={boardComponent} bind:currentBoard {board} {fullBoard} {roomId} {slot}/>
	<ControllerMulti board={boardComponent}/>
    <ProgressBoard {opponentSlot} {roomId}/>
</div>
{:else}
<div class="room">
    <div class="difficulty">
        <DifficultySelectorMulti bind:selected={difficulty} {roomId}/>
    </div>
    
    {#if room}
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
                    <ActionIcon color="red" on:click={() => removeFromRoom("blue", roomId)}>
                        <Fa icon={faXmark} size="lg"/>
                    </ActionIcon>
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
                    {#if room.red.info.uid !== null && owner === true && room.red.owner !== owner}
                    <ActionIcon color="red" on:click={() => removeFromRoom("red", roomId)}>
                        <Fa icon={faXmark} size="lg"/>
                    </ActionIcon>
                    {/if}
                </div>
            </div>
            {/if}
        </div>
    </div>
    {/if}

    <Button disabled={!owner} on:click={() => startMatch(roomId)} variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 35 }}>START MATCH</Button>
    <Text>ROOM ID: {roomId}</Text>
</div>
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
    }
</style>