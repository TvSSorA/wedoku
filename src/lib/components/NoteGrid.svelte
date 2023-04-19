<script lang="ts">
    import { Text } from '@svelteuidev/core';
    export let notes: number[][][];
    export let row: number;
    export let col: number;

    $: displayDigits = (digit: number) => {
        if (notes[row][col].includes(digit)) {
            return ""
        }

        return "visibility: hidden"
    };
</script>

<div class="note-grid">
    {#each { length: 9 } as _, i}
        <Text color="dark" size={13} style={displayDigits(i + 1)}>{i + 1}</Text>
    {/each}
</div>

<style lang="scss">
    .note-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
        
        column-gap: 10px;
        row-gap: 3px;
    }
</style>