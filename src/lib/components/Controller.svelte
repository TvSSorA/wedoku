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
	import { accurateInterval } from '$lib/utils';
	import { browser } from '$app/environment';
	import { getContext, onDestroy } from 'svelte';

	import type SudokuBoard from './SudokuBoard.svelte';
	import type { Readable } from 'svelte/store';
	import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
	import type { ButtonVariant } from '@svelteuidev/core';

	export let board: SudokuBoard;

	const darkMode: Readable<boolean> = getContext('darkMode');
	let fg: string, hl: string;
	$: ({ fg, hl } = buttonStyles($darkMode));

	let extraButtons: {
		icon: IconDefinition;
		label: string;
		variant: ButtonVariant;
		handler?: () => unknown;
	}[];
	let note: boolean = false;
	$: extraButtons = [
		{
			icon: faArrowRotateLeft,
			label: 'Undo',
			variant: 'outline',
			handler: () => board.undo()
		},
		{
			icon: faEraser,
			label: 'Erase',
			variant: 'outline',
			handler: () => board.erase()
		},
		{
			icon: faLightbulb,
			label: 'Hint',
			variant: 'outline',
			handler: () => board.hint()
		},
		{
			icon: faPencil,
			label: 'Note',
			variant: note ? 'filled' : 'outline',
			handler: () => (note = !note)
		}
	];

	let playing = true;
	let auto_paused = false;
	let time = 0;
	let cancelTimer: (() => void) | null = null;
	$: {
		if (browser) {
			if (playing && !cancelTimer) {
				cancelTimer = accurateInterval(() => (time += 100), 100);
			} else if (!playing && cancelTimer) {
				cancelTimer();
				cancelTimer = null;
			}
		}
	}
	function formatTime(ms: number) {	
		const s = Math.floor(ms / 1000);
		const m = Math.floor(s / 60);
		const h = Math.floor(m / 60);
		return (
			(h ? `${h.toString().padStart(2, '0')}:` : '') +
			`${(m % 60).toString().padStart(2, '0')}:` +
			`${(s % 60).toString().padStart(2, '0')}`
		);
	}
	onDestroy(() => (playing = false));
</script>

<svelte:window
	on:visibilitychange={() => {
		if (document.visibilityState === 'hidden' && playing)
		{
			playing = false;
			auto_paused = true;
		}
		else if (auto_paused)
		{
			playing = true;
			auto_paused = false;
		}
	}}

	on:keydown={(e) => {
		if (e.key === 'p') {
			playing = !playing;
		}
		
		if (!playing) return;

		if (parseInt(e.key)) {
			note ? board.note(parseInt(e.key)) : board.insert(parseInt(e.key))
		}
		else {
			if (e.key === 'Backspace') {
				board.undo();
			}
			if (e.key === 'd') {
				board.erase();
			}
			if (e.key === 'h') {
				board.hint()
			}
			if (e.key === 'n') {
				note = !note;
			}

			if (e.key === 'ArrowLeft') {
				board.moveSelect(0, -1);
			}
			if (e.key === 'ArrowRight') {
				board.moveSelect(0, 1)
			}
			if (e.key === 'ArrowUp') {
				board.moveSelect(-1, 0);
			}
			if (e.key === 'ArrowDown') {
				board.moveSelect(1, 0);
			}
		}
	}}
/>

<div class="controller">
	<div class="time-and-play-button">
		<Text root="h3" override={{ userSelect: 'none' }}>
			{formatTime(time)}
		</Text>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<Button
			variant="outline"
			color={fg}
			radius={9999}
			override={{
				aspectRatio: 1,
				'&:hover': { color: hl }
			}}
			on:click={() => (playing = !playing)}
		>
			<Fa icon={playing ? faPause : faPlay} />
		</Button>
	</div>
	<div class="game-buttons">
		<div class="extra-buttons">
			{#each extraButtons as { icon, label, variant, handler }}
				<div class="extra-button-wrapper">
					<Button
						{variant}
						color={fg}
						radius={9999}
						fullSize
						override={{
							aspectRatio: 1,
							height: 'auto',
							'&:hover': { color: variant == 'filled' ? '' : hl }
						}}
						on:click={() => {if (playing && handler) handler()}}
					>
						<Fa {icon} fw size="1.5x" />
					</Button>
					<Text>{label}</Text>
				</div>
			{/each}
		</div>
		<div class="numeric-buttons">
			{#each { length: 9 } as _, i}
				<Button
					variant="outline"
					color={fg}
					override={{
						fontSize: '3rem',
						aspectRatio: 1,
						height: '100%',
						'&:hover': { color: hl }
					}}
					fullSize
					on:click={() => {
						if (!playing) return;
						return note ? board.note(i + 1) : board.insert(i + 1)
					}}
				>
					{i + 1}
				</Button>
			{/each}
		</div>
		<Button color="$grape500" override={{ fontSize: '1.5rem' }} href="/single">NEW GAME</Button>
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
