<script lang="ts">
    import { Button } from 'agnostic-svelte';
    import Fa from 'svelte-fa';
	import { faCirclePlay, faCirclePause, faLightbulb } from '@fortawesome/free-regular-svg-icons';
	import { faArrowRotateLeft, faEraser, faPencil } from '@fortawesome/free-solid-svg-icons';
	import { blurButton } from '$lib/utils';

    let playing: boolean = true;
	let note = false;
</script>

<div class="time-and-play-button">
    <h3 id="time">0:00</h3>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="play-pause-wrapper" on:click={() => (playing = !playing)}>
        <Fa icon={playing ? faCirclePlay : faCirclePause} />
    </div>
</div>
<div class="game-buttons">
    <div class="extra-buttons">
        {#each [{ icon: faArrowRotateLeft, label: 'Undo' }, { icon: faEraser, label: 'Erase' }, { icon: faLightbulb, label: 'Hint' }] as { icon, label }}
            <div class="extra-button-wrapper">
                <Button isCircle isBordered mode="primary" type="faux">
                    <Fa {icon} fw size="1.5x" />
                </Button>
                <h4>{label}</h4>
            </div>
        {/each}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="extra-button-wrapper">
            <Button
                isCircle
                isBordered={!note}
                mode="primary"
                on:click={(e) => {
                    note = !note;
                    blurButton(e);
                }}
            >
                <Fa icon={faPencil} fw size="1.5x"/>
            </Button>
            <h4>Note</h4>
        </div>
    </div>
    <div class="numeric-buttons">
        {#each { length: 9 } as _, i}
            <Button
                mode="primary"
                isBordered
                isRounded
                on:click={e => {
                    blurButton(e);
                }}
            >
                {i + 1}
            </Button>
        {/each}
    </div>
    <div id="new-game">
        <p>NEW GAME</p>
    </div>
</div>

<style lang="scss">
    @use "sass:color";

    .time-and-play-button {
        display: flex;
        flex-direction: row;
        justify-content: right;
        align-items: center;
        gap: 60px;

        #time {
            user-select: none;
        }

        .play-pause-wrapper {
            cursor: pointer;
            color: $numeric-button-color;
            font-size: 2rem;
        }
    }

    .game-buttons {
        display: flex;
        flex-direction: column;
        gap: 30px;

        .extra-buttons {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 20px;

            .extra-button-wrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 7px;

                :global(.btn) {
                    padding: 2rem;
                }

                h4 {
                    user-select: none;
                }
            }
        }

        .numeric-buttons {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
            gap: 10px;

            :global {
                .btn {
                    aspect-ratio: 1;
                    font-size: 50px;
                }
            }
        }
        #new-game {
            text-align: center;
            font-size: 25px;
            padding: 20px 100px;
            background-color: color.adjust($numeric-button-color, $lightness: - 30%);
            user-select: none;
            cursor: pointer;

            &:hover {
                background-color: color.adjust($numeric-button-color, $lightness: - 15%);
            }

            &:active {
                background-color: $numeric-button-color;
            }
        }
    }
</style>