<script lang="ts">
    import { Button, Text, theme } from "@svelteuidev/core";
    import { getContext } from "svelte";
    import { buttonStyles } from "./ColorScheme";
    import type { Readable } from "svelte/store";

    export let selected: string;
    const difficulties = ["easy", "normal", "hard", "expert", "evil"];

    const darkMode: Readable<boolean> = getContext("darkMode");
    $: ({fg} = buttonStyles($darkMode))
    
</script>

<div style="padding: {theme.space[7]}">
    <Text>Difficulty</Text>
    {#each difficulties as difficulty}
        <Button
            color={fg}
            variant={selected === difficulty ? "filled" : "subtle"}
            override={{
                textTransform: "capitalize",
            }}
            on:click={() => selected = difficulty}
        >
            {difficulty}
        </Button>
    {/each}
</div>

<style lang="scss">
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>