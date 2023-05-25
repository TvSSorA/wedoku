<script lang="ts">
	import SudokuBoard from '$lib/components/SudokuBoard.svelte';
	import Controller from '$lib/components/Controller.svelte';
	import DifficultySelector from '$lib/components/DifficultySelector.svelte';
	import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
	import { db } from '$lib/firebase/app.js';
	import { userCred } from '$lib/firebase/user';

	export let data;

	let controllerComponent: Controller;
	let boardComponent: SudokuBoard;
	let difficulty: string = data.difficulty;

	function recordGame() {
		controllerComponent.playing = false;
		updateDoc(doc(db, "users", $userCred!.uid), {
			soloGameHistory: arrayUnion({
				difficulty,
				time: controllerComponent.time,
				initialBoard: JSON.stringify(boardComponent.board),
				fullBoard: JSON.stringify(boardComponent.fullBoard),
				moves: JSON.stringify(boardComponent.moves)
			})
		});
	};
</script>

<svelte:head>
	<title>Single Player Mode</title>
</svelte:head>

<div class="game">
	<div class="diff-board-wrapper">
		<DifficultySelector bind:selected={difficulty}/>
		<SudokuBoard on:solved|once={recordGame} on:penalty={() => { if (controllerComponent.time) {controllerComponent.time += 60000} }} bind:this={boardComponent} board={data.board} fullBoard={data.fullBoard}/>
	</div>

	<Controller bind:this={controllerComponent} board={boardComponent}/>
</div>

<style lang="scss">
	@use 'sass:color';
	.game {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 50px;

		.diff-board-wrapper {
			display: flex;
			flex-direction: column;
			justify-content: left;
		}
	}
</style>
