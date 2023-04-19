<script lang="ts">
    import { Text } from '@svelteuidev/core';
    export let notes: number;
</script>

<div class="note-grid">
    {#each { length: 9 } as _, i}
        {@const digit = i + 1}
        <Text color="dark" size={13}>{notes & (1 << digit) ? digit : ""}</Text>
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