<script lang="ts">
	import { Text } from '@svelteuidev/core';
	import { getContext } from 'svelte';
	import { cellStyles } from '$lib/frontend/ColorScheme';
	import { blockFromCoords } from '$lib/utils';
	import NoteGrid from './NoteGrid.svelte';
	import type { Readable } from 'svelte/store';

	export let board: number[][];
	export let fullBoard: number[][];

	let currentBoard: number[][];
	let rowMap: number[][], colMap: number[][], blockMap: number[][];
	$: {
		currentBoard = board.map(row => [...row]); // Clone the board
		rowMap = Array(9).fill(0).map(_ => Array(9).fill(0));
		colMap = Array(9).fill(0).map(_ => Array(9).fill(0));
		blockMap = Array(9).fill(0).map(_ => Array(9).fill(0));
		for (let row = 0; row < 9; ++row)
			for (let col = 0; col < 9; ++col)
			{
				let digit = board[row][col];
				if (!digit--) continue;
				rowMap[row][digit]++;
				colMap[col][digit]++;
				blockMap[blockFromCoords(row, col)][digit]++;
			}
	}

	let selected: Record<'row' | 'col' | 'block', number | null> = {
		row: null,
		col: null,
		block: null
	};

	let moves: string[] = [];
	let notes: number[][][] = 
		Array.from({
            length: 9
        }, () => Array.from({
            length: 9
        }, () => []));

	export function insertDigit(digit: number)
	{
		const { row, col } = selected;
		if (row === null || col === null) return;
		if (board[row][col] !== 0) return;
		if (currentBoard[row][col] === digit) return;
		moves.unshift(`${row} ${col} ${currentBoard[row][col]} ${digit}`)
		currentBoard[row][col] = digit;
	}

	export function eraseDigit()
	{
		insertDigit(0);
	}

	export function undo() {
		const moveToUndo = moves.shift();
		if (!moveToUndo) return;
		const sections = moveToUndo.split(' ');
		currentBoard[parseInt(sections[0])][parseInt(sections[1])] = parseInt(sections[2])
	}

	export function selectCell(row: number, col: number)
	{
		selected = { row, col, block: blockFromCoords(row, col) };
	}

	export function hint() {
		const { row, col } = selected;
		if (row === null || col === null) return;
		if (board[row][col] !== 0) return;
		if (currentBoard[row][col] === fullBoard[row][col]) return;

		currentBoard[row][col] = fullBoard[row][col];
		moves = moves.filter(move => parseInt(move.split(' ')[0]) !== row || parseInt(move.split(' ')[1]) !== col)
	}

	export function note(digit: number) {
		const { row, col } = selected;
		if (row === null || col === null) return;
		if (board[row][col] !== 0) return;

		if (notes[row][col].includes(digit)) {
			const index = notes[row][col].indexOf(digit);
			notes[row][col].splice(index, 1);
		}
		else {
			notes[row][col].push(digit)
		}
	}

	const darkMode: Readable<boolean> = getContext('darkMode');
	let hl1: string, hl2: string, digitColor: string;

	$: ({ hl1, hl2, digitColor } = cellStyles($darkMode));
	$: getHighlightStyle = (row: number, col: number, block: number, type: 'bg' | 'digit') => {
		const isSelectedCell = selected.row === row && selected.col === col;
		const isSelectedSiblings =
			selected.row === row || selected.col === col || selected.block === block;

		if (type === 'bg') {
			if (isSelectedCell) return `background-color: ${hl1};`;
			if (isSelectedSiblings) return `background-color: ${hl2};`;
		}
		else {
			if (board[row][col] !== 0) return "dark";
			if (currentBoard[row][col] !== fullBoard[row][col]) return "red";
			return digitColor;
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
							color={getHighlightStyle(row, col, block, 'digit')}
							override={{ userSelect: "none" }}
						>
							{#if currentBoard[row][col]}
								{currentBoard[row][col]}
							{:else}
								<NoteGrid bind:notes {row} {col} />
							{/if}
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
