<script lang="ts">
    import { Text } from '@svelteuidev/core';
    import { userCred } from '$lib/firebase/user';
    import Fa from 'svelte-fa';
    import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
    
    export let data;

    const difficultyColors: Record<string, string> = {
        easy: "cyan",
        normal: "yellow",
        hard: "orange",
        expert: "red",
        evil: "purple"
    }
</script>

<svelte:head>
	<title>Profile Page</title>
</svelte:head>

{#if $userCred}
<div class="profile">
    <div class="user-info">
        <div class="avatar">
            <img src={$userCred.photoURL} alt="Avatar">
        </div>
        <div class="info">
            <Text weight="bold" size={35}>{$userCred.displayName}</Text>
            <Text>UID: {$userCred.uid}</Text>
        </div>
    </div>

    <div class="solo-matches">
        <Text weight="bold" size={22} align="center" override={{ marginTop: "1rem" }}>Solo Matches History</Text>
        <table>
            <thead>
                <tr>
                    <th><Text weight="bold" align="center">No.</Text></th>
                    <th><Text weight="bold" align="center">Difficulty</Text></th>
                    <th><Text weight="bold" align="center">Time</Text></th>
                </tr>
            </thead>
            <tbody>
                {#each data.soloGames as soloGame, i}
                    {@const time = Math.floor((soloGame.time + 60000) / 1000)}
                    {@const hours = Math.floor(time / 3600)}
                    {@const minutes = Math.floor((time % 3600) / 60)}
                    {@const seconds = time % 60}
                    <tr>
                        <td><Text align="center">{i + 1}</Text></td>
                        <td><Text align="center" color={difficultyColors[soloGame.difficulty]}>{soloGame.difficulty.charAt(0).toUpperCase() + soloGame.difficulty.slice(1)}</Text></td>
                        <td><Text align="center">{hours !== 0 ? `${hours}:` : ""}{minutes}:{seconds}</Text></td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <div class="pvp-matches">
        <Text weight="bold" size={22} align="center" override={{ marginTop: "1rem" }}>PVP Matches History</Text>
        <table>
            <thead>
                <tr>
                    <th><Text weight="bold" align="center">No.</Text></th>
                    <th><Text weight="bold" align="center" color="blue">Blue Team</Text></th>
                    <th></th>
                    <th></th>
                    <th><Text weight="bold" align="center" color="red">Red Team</Text></th>
                    <th><Text weight="bold" align="center">Difficulty</Text></th>
                </tr>
            </thead>
            <tbody>
                {#each data.pvpGames as pvpGame, i}
                <tr>
                    <td><Text align="center">{i + 1}</Text></td>
                    <td><Text align="center">{pvpGame.blue.name}</Text></td>
                    <td><Text align="center" color={pvpGame.winner === "blue" ? "green" : "red"}>{pvpGame.winner === "blue" ? "Win" : "Lose"}</Text></td>
                    <td><Text align="center" color={pvpGame.winner === "red" ? "green" : "red"}>{pvpGame.winner === "red" ? "Win" : "Lose"}</Text></td>
                    <td><Text align="center">{pvpGame.red.name}</Text></td>
                    <td><Text align="center" color={difficultyColors[pvpGame.difficulty]}>{pvpGame.difficulty.charAt(0).toUpperCase() + pvpGame.difficulty.slice(1)}</Text></td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
{/if}

<style lang="scss">
    .profile {
        display: flex;
        flex-direction: column;
        align-content: center;
        gap: 1rem;

        .user-info {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 2rem;

            background-color: rgba(0, 0, 0, 0.401);
            padding: 1rem 0;

            .avatar {
                width: 13%;

                img {
                    aspect-ratio: 1;
                    width: 100%;
                }
            }

            .info {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
        }

        .solo-matches {
            display: flex;
            flex-direction: column;
            gap: 2rem;

            background-color: rgba(0, 0, 0, 0.401);

            tbody td {
                padding: 0.6rem 0;
            }
        }

        .pvp-matches {
            display: flex;
            flex-direction: column;
            gap: 2rem;

            background-color: rgba(0, 0, 0, 0.401);

            tbody td {
                padding: 0.6rem 0;
            }
        }
    }
</style>