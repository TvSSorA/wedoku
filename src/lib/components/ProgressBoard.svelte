<script lang="ts">
	import { theme } from "@svelteuidev/core"
	import { db } from "$lib/firebase/app";
	import { doc, onSnapshot, type DocumentData } from "firebase/firestore";
	import { onMount } from "svelte";

	let fullBoard: DocumentData, currentBoard: DocumentData;
    export let opponentSlot: string;
	export let roomId: string;

    onMount(() => {
		onSnapshot(doc(db, "rooms", roomId), (doc) =>{
			fullBoard = JSON.parse(doc.data()![opponentSlot].boards.fullBoard)
			currentBoard = JSON.parse(doc.data()![opponentSlot].boards.currentBoard)
		})
	})
</script>

{#if fullBoard}
<div class="progress">
	{#each { length: 9 } as _, block}
		{@const rowStartIdx = Math.floor(block / 3) * 3}
		{@const colStartIdx = (block % 3) * 3}
		<div class="block">
			{#each { length: 3 } as _, i}
				{#each { length: 3 } as _, j}
					{@const row = rowStartIdx + i}
					{@const col = colStartIdx + j}
					<div
						class="cell"
						style={currentBoard[row][col] === fullBoard[row][col] ? `background-color: ${theme.colors.grape900.value + "cf"};` : ""}
					/>
				{/each}
			{/each}
		</div>
	{/each}
</div>
{/if}

<style lang="scss">
	.progress {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);

		margin: auto;

		width: 250px;
		height: 250px; 
		border: 4px solid $board-border-color;

		.block {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(3, 1fr);
			border: 2px solid $board-border-color;

			.cell {
				border: 1px solid $cell-border-color;
			}
		}
	}
</style>