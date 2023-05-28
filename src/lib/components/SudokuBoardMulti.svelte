<script lang="ts">
	import NoteGrid from './NoteGrid.svelte';
	import { Text } from '@svelteuidev/core';
	import { getContext, createEventDispatcher } from 'svelte';
	import { cellStyles } from '$lib/frontend/ColorScheme';
	import { blockFromCoords } from '$lib/utils';
	import type { Readable } from 'svelte/store';
	import { doc, increment, setDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase/app';

	export let roomId: string;
	export let slot: string;

	export let board: number[][];
	export let fullBoard: number[][];

	const dispatch = createEventDispatcher();

	export let currentBoard: number[][];
	let rowMap: number[][], colMap: number[][], blockMap: number[][];
	export let remainingCells = 0; 
	let errors = 0;

	currentBoard = board.map(row => [...row]); // Clone the board
	rowMap = Array(9).fill(0).map(_ => Array(10).fill(0));
	colMap = Array(9).fill(0).map(_ => Array(10).fill(0));
	blockMap = Array(9).fill(0).map(_ => Array(10).fill(0));
	for (let row = 0; row < 9; ++row)
		for (let col = 0; col < 9; ++col)
		{
			let digit = currentBoard[row][col];
			remainingCells += +(digit == 0);
			rowMap[row][digit]++;
			colMap[col][digit]++;
			blockMap[blockFromCoords(row, col)][digit]++;
		}

	let selected: Record<'row' | 'col' | 'block', number> | null = null;
	export let moves: string[] = [];
	let notes: number[][] = Array(9).fill(0).map(_ => Array(9).fill(0));

	function updateInternalStates(row: number, col: number, block: number,
		oldDigit: number, newDigit: number)
	{
		if (oldDigit == 0 && newDigit != 0) // zero to non-zero
			remainingCells--;
		else if (oldDigit != 0 && newDigit == 0) // non-zero to zero
			remainingCells++;

		// Hack for converting bool to int, https://stackoverflow.com/a/66000126/9806609
		errors -= (
			+!!(--rowMap[row][oldDigit] == 1)      +
			+!!(--colMap[col][oldDigit] == 1)      +
			+!!(--blockMap[block][oldDigit] == 1)
		) * +!!(oldDigit != 0);

		errors += (
			+!!(++rowMap[row][newDigit] == 2)      +
			+!!(++colMap[col][newDigit] == 2)      +
			+!!(++blockMap[block][newDigit] == 2)
		) * +!!(newDigit != 0);

		if (!remainingCells && !errors) dispatch("solved");
	}

	function updateFirebaseBoard() {
		setDoc(doc(db, "rooms", roomId), {
			[slot]: {
				boards: {
					currentBoard: JSON.stringify(currentBoard)	
				}
			}
		}, { merge: true });
	}

	export function insert(digit: number)
	{
		if (!selected) return;
		const { row, col, block } = selected;
		if (board[row][col] !== 0) return;

		const oldDigit = currentBoard[row][col];
		if (oldDigit === digit) return;
		moves.unshift(`${row} ${col} ${oldDigit} ${digit}`);
		
		updateInternalStates(row, col, block, oldDigit, digit);
		currentBoard[row][col] = digit;
		updateFirebaseBoard();

		if (digit !== 0 && digit !== fullBoard[row][col]) {
			setDoc(doc(db, "rooms", roomId), {
				[slot]: {
					mistakes: increment(1)
				}
			}, { merge: true })
		}
	}

	export function erase()
	{
		insert(0);
	}

	export function undo() {
		const moveToUndo = moves.shift();
		if (!moveToUndo) return;
		const sections = moveToUndo.split(' ');

		const row = parseInt(sections[0]);
		const col = parseInt(sections[1]);
		const oldDigit = currentBoard[row][col];
		const digit = parseInt(sections[2]);
		
		updateInternalStates(row, col, blockFromCoords(row, col), oldDigit, digit);
		currentBoard[row][col] = digit;
		updateFirebaseBoard();
	}

	export function select(row: number, col: number)
	{
		selected = { row, col, block: blockFromCoords(row, col) };
	}

	export function moveSelect(rowDelta: number, colDelta: number)
	{
		if (!selected) return;
		const { row, col } = selected;

		const newRow = Math.max(0, Math.min(8, row + rowDelta));
		const newCol = Math.max(0, Math.min(8, col + colDelta));
		select(newRow, newCol)
	}

	export function note(digit: number) {
		if (!selected) return;
		const { row, col } = selected;
		if (board[row][col] !== 0) return;

		notes[row][col] ^= (1 << digit);
	}

	const darkMode: Readable<boolean> = getContext('darkMode');
	let hl1: string, hl2: string, digitColor: string;

	$: ({ hl1, hl2, digitColor } = cellStyles($darkMode));
	$: getHighlightStyle = (row: number, col: number, block: number, type: 'bg' | 'digit') => {
		const isSelectedCell = selected && selected.row === row && selected.col === col;
		const isSelectedSiblings = selected &&
			(selected.row === row || selected.col === col || selected.block === block);

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
						on:click={() => select(row, col)}
					>
						<Text
							size={35}
							color={getHighlightStyle(row, col, block, 'digit')}
							override={{ userSelect: "none" }}
						>
							{#if currentBoard[row][col]}
								{currentBoard[row][col]}
							{:else}
								<NoteGrid notes={notes[row][col]} />
							{/if}
						</Text>
					</div>
				{/each}
			{/each}
		</div>
	{/each}
</div>

<svelte:options accessors={true} />

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
