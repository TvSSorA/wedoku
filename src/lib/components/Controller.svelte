<script lang="ts">
	import { Button } from 'agnostic-svelte';
	import Fa from 'svelte-fa';
	import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
	import {
		faArrowRotateLeft,
		faEraser,
		faPencil,
		faPlay,
		faPause
	} from '@fortawesome/free-solid-svg-icons';
	import { blurButton } from '$lib/utils';

	let playing: boolean = true;
	let note = false;
</script>

<div class="controller">
	<div class="time-and-play-button">
		<h3 id="time">0:00</h3>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<Button
			isCircle
			isBordered
			mode="primary"
			on:click={(e) => {
				playing = !playing;
				blurButton(e);
			}}
		>
			<Fa icon={playing ? faPlay : faPause} />
		</Button>
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
					<Fa icon={faPencil} fw size="1.5x" />
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
					on:click={(e) => {
						blurButton(e);
					}}
				>
					{i + 1}
				</Button>
			{/each}
		</div>
		<Button 
            mode="primary" 
            id="new-game" 
            size="large" 
            on:click={(e) => {
                blurButton(e);
            }}
        >
            NEW GAME
        </Button>
	</div>
</div>

<style lang="scss">
	@use 'sass:color';

	.controller {
        display: flex;
		flex-direction: column;
		:global {
			--agnostic-btn-primary: #{$numeric-button-color};
            button:focus {
                outline-color: $numeric-button-color;
            }
		}
	}
	.time-and-play-button {
		display: flex;
		flex-direction: row;
		justify-content: right;
		align-items: center;
		margin: 5%;
		gap: 60px;

		#time {
			user-select: none;
		}
	}

	.game-buttons {
		display: flex;
		flex-direction: column;
		gap: 25px;

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

				:global {
					.btn {
						padding: 2rem !important;
					}
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
        :global {
            #new-game {
			    text-align: center;
			    font-size: 2rem;
		    }
        }
	}
</style>
