<script lang="ts">
    import DifficultySelectorMulti from "$lib/components/DifficultySelectorMulti.svelte";
    import { Text, Button } from "@svelteuidev/core";
    import { createRoom } from "$lib/firebase/multi";

    let difficulty = 'easy';
    let roomId = Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000)

    const user = {
        avatar: "/favicon.png",
        name: "whar"
    }
</script>

<div class="room">
    <div class="difficulty">
        <DifficultySelectorMulti bind:selected={difficulty}/>
    </div>
    
    <div class="teams">
        <div class="team-blue">
            <Text color='blue'>Blue Team</Text>
            <div class="players">
                <div class="player">
                    <img src={user.avatar || ""} alt="avatar">
                    <Text size={12} align="center" override={{ overflow: "hidden", textOverflow: "ellipsis" }}>{user.name || ""}</Text>
                </div>
            </div>
        </div>
        <div class="team-red">
            <Text color='red'>Red Team</Text>
            <div class="players">
                <div class="player">
                    <img src={user.avatar || ""} alt="avatar">
                    <Text size={12} align="center" override={{ overflow: "hidden", textOverflow: "ellipsis" }}>{user.name || ""}</Text>
                </div>
            </div>
        </div>
    </div>

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
                        background-color: rgba(47, 71, 255, 0.729);
                        border-radius: 5px;
                        padding: 15px;
                        cursor: pointer;

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