<script lang="ts">
    import DifficultySelectorMulti from "$lib/components/DifficultySelectorMulti.svelte";
	import { db } from "$lib/firebase/app";
	import { userCred } from "$lib/firebase/user";
    import { Text, Button } from "@svelteuidev/core";
	import { deleteDoc, doc, onSnapshot, setDoc, updateDoc, type DocumentData } from "firebase/firestore";
	import { onDestroy, onMount } from "svelte";

    let difficulty = 'easy';
    let roomId = String(Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000))
    let teams: DocumentData;

    const user = {
        uid: $userCred?.uid,
        name: $userCred?.displayName,
        avatar: $userCred?.photoURL
    }

    function createRoom(roomID: string) {
        setDoc(doc(db, "rooms", roomID), {
            blue: [
                user
            ],
            red: [
                {
                    uid: null,
                    name: null,
                    avatar: null
                }
            ]
        });
    }

    function deleteRoom(roomID: string) {
        deleteDoc(doc(db, "rooms", roomID));
    }

    function moveToSlot(oldTeam: "blue" | "red", newTeam: "blue" | "red", roomID: string) {
        updateDoc(doc(db, "rooms", roomID), {
            [oldTeam]: [
                {
                    uid: null,
                    name: null,
                    avatar: null
                }
            ],
            [newTeam]: [
                user
            ]
        })
    }

    $: if ($userCred) {
        createRoom(roomId);
    }

    onMount(async () => {
        onSnapshot(doc(db, "rooms", roomId), (doc) => {
			teams = doc.data()!
		})
    })
    onDestroy(() => deleteRoom(roomId))
</script>

<div class="room">
    <div class="difficulty">
        <DifficultySelectorMulti bind:selected={difficulty}/>
    </div>
    
    {#if teams}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="teams">
        <div class="team-blue">
            <Text color='blue'>Blue Team</Text>
            <div class="players">
                <div class="player" on:click={() => moveToSlot("red", "blue", roomId)}>
                    {#if teams.blue[0].avatar} <img src={teams.blue[0].avatar || ""} alt="avatar"> {/if}
                    <Text size={12} align="center" override={{ overflow: "hidden", textOverflow: "ellipsis" }}>{teams.blue[0].name || ""}</Text>
                </div>
            </div>
        </div>
        <div class="team-red">
            <Text color='red'>Red Team</Text>
            <div class="players">
                <div class="player" on:click={() => moveToSlot("blue", "red", roomId)}>
                    {#if teams.red[0].avatar} <img src={teams.red[0].avatar || ""} alt="avatar"> {/if}
                    <Text size={12} align="center" override={{ overflow: "hidden", textOverflow: "ellipsis" }}>{teams.red[0].name || ""}</Text>
                </div>
            </div>
        </div>
    </div>
    {/if}

    <Button variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 35 }}>START MATCH</Button>
    <Text>ROOM ID: {roomId}</Text>
</div>

<style lang="scss">
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
                        flex-direction: column;
                        gap: 8px;

                        width: 5rem;
                        height: 6.5rem;
                        background-color: rgba(47, 71, 255, 0.588);
                        border-radius: 5px;
                        padding: 15px;
                        cursor: pointer;

                        &:hover {
                            background-color: rgba(47, 71, 255, 0.729);
                        }

                        img {
                            aspect-ratio: 1;
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
</style>