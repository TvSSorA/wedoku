<script lang="ts">
	import { Text } from '@svelteuidev/core';
	import { getContext } from 'svelte';
	import { cellStyles } from '$lib/frontend/ColorScheme';
	import type { Readable } from 'svelte/store';

	export let board: number[][];
	export let fullBoard: number[][];

	let currentBoard: number[][];
	$: currentBoard = board.map(row => [...row]); // Clone the board

	let selected: Record<'row' | 'col' | 'block', number | null> = {
		row: null,
		col: null,
		block: null
	};

	let moves: string[] = [

	]

	export function insertDigit(digit: number)
	{
		const { row, col } = selected;
		if (row === null || col === null) return;
		if (board[row][col] !== 0) return;
		if (currentBoard[row][col] === digit) return;

		if (currentBoard[row][col] === 0) {
			moves.unshift(`add ${row} ${col}`)
		}
		else {
			moves.unshift(`replace ${row} ${col} ${currentBoard[row][col]} ${digit}`)
		}
		currentBoard[row][col] = digit;
	}

	export function eraseDigit()
	{
		const { row, col } = selected;
		if (row === null || col === null) return;
		if (board[row][col] !== 0) return;
		if (currentBoard[row][col] === 0) return;

		moves.unshift(`remove ${row} ${col} ${currentBoard[row][col]}`)
		currentBoard[row][col] = 0;
	}

	export function undo() {
		const moveToUndo = moves[0]
		const sections: string[] = moveToUndo.split(' ')

		if (sections[0] === 'add') {
			currentBoard[parseInt(sections[1])][parseInt(sections[2])] = 0
		}
		else { // if it's remove or replace
			currentBoard[parseInt(sections[1])][parseInt(sections[2])] = parseInt(sections[3])
		}

		moves.shift()
	}

	export function selectCell(row: number, col: number)
	{
		selected = {
			row, col,
			block: Math.floor(row / 3) * 3 + Math.floor(col / 3)
		};
	}

	export function hint() {
		const { row, col } = selected;
		if (row === null || col === null) return;
		if (board[row][col] !== 0) return;
		if (currentBoard[row][col] === fullBoard[row][col]) return;

		currentBoard[row][col] = fullBoard[row][col];
		board[row][col] = fullBoard[row][col];
		moves = moves.filter(move => parseInt(move.split(' ')[1]) === row && parseInt(move.split(' ')[2]) === col)
	}

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
		<div class="block">
			{#each { length: 3 } as _, i}
				{#each { length: 3 } as _, j}
					{@const row = rowStartIdx + i}
					{@const col = colStartIdx + j}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="cell"
						style={getHighlightStyle(row, col, block, 'bg')}
						on:click={() => selectCell(row, col)}
					>
						<Text
							size={35}
							color="dark"
							override={{ userSelect: "none" }}
						>
							{currentBoard[row][col] || ""}
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
			}
		}
	}
</style>
