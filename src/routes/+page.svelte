<script lang="ts">
	import ButtonRadio from '$lib/components/ButtonRadio.svelte';
	import SudokuBoard from '$lib/components/SudokuBoard.svelte';
	import Controller from '$lib/components/Controller.svelte';

	export let data;

	const difficulties = ['Easy', 'Normal', 'Hard', 'Expert', 'Evil'];
	let difficulty = 'easy';
	$: console.log(difficulty);
</script>

<div class="game">
	<div class="diff-board-wrapper">
		<ButtonRadio
			id="difficulty"
			name="difficulty"
			legend="Difficulty"
			choices={difficulties.map((val) => ({
				value: val.toLowerCase(),
				label: val,
				name: 'difficulty'
			}))}
			bind:checked={difficulty}
		/>

		<SudokuBoard board={data.board} />
	</div>

	<div class="buttons-wrapper">
		<Controller />
	</div>
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

			:global {
				fieldset {
					display: flex;
					flex-direction: row;
					justify-content: space-evenly;
					legend,
					span {
						font-family: var(--agnostic-font-family-body);
					}
				}
			}
		}

		.buttons-wrapper {
			display: flex;
			flex-direction: column;

			:global {
				--agnostic-btn-primary: #{$numeric-button-color};
			}
		}
	}
</style>
