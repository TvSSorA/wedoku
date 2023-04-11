<script lang="ts">
	import Fa from 'svelte-fa';
	import { Button, Text } from '@svelteuidev/core';
	import {
		faArrowRotateLeft,
		faEraser,
		faLightbulb,
		faPencil,
		faPlay,
		faPause
	} from '@fortawesome/free-solid-svg-icons';
	import { buttonStyles } from '$lib/frontend/ColorScheme';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	let playing: boolean = true;
	let note = false;
	const darkMode: Readable<boolean> = getContext('darkMode');

	let fg: string, hl: string;
	$: ({fg, hl} = buttonStyles($darkMode));
	
	const buttonCommonProps = {
		color: '$grape500'
	} as const;
</script>

<div class="controller">
	<div class="time-and-play-button">
		<Text root="h3" override={{ userSelect: 'none' }}>0:00</Text>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<Button
			variant="outline"
			color={fg}
			radius={9999}
			override={{ 
				aspectRatio: 1,
				'&:hover': { color: hl }
			}}
			on:click={() => {
				playing = !playing;
			}}
		>
			<Fa icon={playing ? faPlay : faPause} />
		</Button>
	</div>
	<div class="game-buttons">
		<div class="extra-buttons">
			{#each [{ icon: faArrowRotateLeft, label: 'Undo' }, { icon: faEraser, label: 'Erase' }, { icon: faLightbulb, label: 'Hint' }] as { icon, label }}
				<div class="extra-button-wrapper">
					<Button
						variant="outline"
						color={fg}
						radius={9999}
						override={{
							aspectRatio: 1,
							height: '100%',
							'&:hover': { color: hl }
						}}
						fullSize
					>
						<Fa {icon} fw size="1.5x" />
					</Button>
					<Text>{label}</Text>
				</div>
			{/each}
			<div class="extra-button-wrapper">
				<Button
					variant={note ? 'filled' : 'outline'}
					color={fg}
					radius={9999}
					override={{
						aspectRatio: 1,
						height: '100%',
						'&:hover': { color: note ? "" : hl }
					}}
					fullSize
					on:click={() => {
						note = !note;
					}}
				>
					<Fa icon={faPencil} fw size="1.5x" />
				</Button>
				<Text>Note</Text>
			</div>
		</div>
		<div class="numeric-buttons">
			{#each { length: 9 } as _, i}
				<Button
					variant="outline"
					color={fg}
					override={{
						fontSize: "3rem",
						aspectRatio: 1,
						height: '100%',
						'&:hover': { color: hl }
					}}
					fullSize
				>
					{i + 1}
				</Button>
			{/each}
		</div>
		<Button {...buttonCommonProps} override={{ fontSize: '1.5rem' }}>NEW GAME</Button>
	</div>
</div>

<style lang="scss">
	@use 'sass:color';

	.controller {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 0.5rem 0;
	}

	.time-and-play-button {
		display: flex;
		flex-direction: row;
		justify-content: right;
		align-items: center;
		gap: 60px;
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
				justify-content: flex-end;
				gap: 7px;
				width: 64px;
			}
		}

		.numeric-buttons {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(3, 1fr);
			gap: 10px;
		}
	}
</style>
