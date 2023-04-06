<script lang="ts">
	import { theme, Text } from '@svelteuidev/core';
	import { getContext } from 'svelte';
	import { cellStyles } from './ColorScheme';
	import type { Readable } from 'svelte/store';

	export let board: number[][];
	export let selected: Record<'row' | 'col' | 'block', number | null> = {
		row: null,
		col: null,
		block: null
	};

	const darkMode: Readable<boolean> = getContext('darkMode');
	let hl1: string, hl2: string;
	$: ({ hl1, hl2 } = cellStyles($darkMode));

	$: getHighlightStyle = (row: number, col: number, block: number, type: 'bg' | 'digit') => {
		const isSelectedCell = selected.row === row && selected.col === col;
		const isSelectedSiblings =
			selected.row === row || selected.col === col || selected.block === block;

		if (type === 'bg') {
			if (isSelectedCell) return `background-color: ${hl1};`;
			if (isSelectedSiblings) return `background-color: ${hl2};`;
		}
	};
</script>

<div class="board">
	{#each { length: 9 } as _, block}
		{@const rowStartIdx = Math.floor(block / 3) * 3}
		{@const colStartIdx = (block % 3) * 3}
		<div class="block block-{block}">
			{#each { length: 3 } as _, i}
				{#each { length: 3 } as _, j}
					{@const row = rowStartIdx + i}
					{@const col = colStartIdx + j}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="cell row-{row} col-{col}"
						style={getHighlightStyle(row, col, block, 'bg')}
						on:click={() => {
							selected = { row, col, block };
						}}
					>
						<Text
							size={35}
							color="dark"
							override={{ userSelect: "none" }}
						>
							{board[row][col] === 0 ? '' : board[row][col]}
						</Text>
					</div>
				{/each}
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.board {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);

		margin: auto;

		width: 500px; // fix these later
		height: 500px; // hhhhh
		border: 4px solid $board-border-color;

		.block {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(3, 1fr);
			border: 2px solid $board-border-color;

			.cell {
				border: 1px solid $cell-border-color;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.digit {
					font-family: sans-serif;
					font-size: 2.5rem;
					user-select: none;
					line-height: 1;
					color: var(--agnostic-dark);
				}
			}
		}
	}
</style>
