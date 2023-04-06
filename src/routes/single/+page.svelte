<script lang="ts">
	import SudokuBoard from '$lib/components/SudokuBoard.svelte';
	import Controller from '$lib/components/Controller.svelte';
	import DifficultySelector from '$lib/components/DifficultySelector.svelte';

	export let data;

	let difficulty: string = "easy";
	$: console.log(difficulty);
</script>

<div class="game">
	<div class="diff-board-wrapper">
		<DifficultySelector bind:selected={difficulty}/>
		<SudokuBoard board={data.board} />
	</div>

	<Controller />
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
