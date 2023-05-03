<script lang="ts">
	import SudokuBoard from '$lib/components/SudokuBoard.svelte';
	import Controller from '$lib/components/Controller.svelte';
	import DifficultySelector from '$lib/components/DifficultySelector.svelte';

	export let data;

	let boardComponent;
	let difficulty: string = data.difficulty;
</script>

<div class="game">
	<div class="diff-board-wrapper">
		<DifficultySelector bind:selected={difficulty}/>
		<SudokuBoard bind:this={boardComponent} board={data.board} fullBoard={data.fullBoard}/>
	</div>

	<Controller board={boardComponent}/>
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
