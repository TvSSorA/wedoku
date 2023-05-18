<script lang="ts">
    import { Button, Text, theme } from "@svelteuidev/core";
    import { getContext } from "svelte";
    import { buttonStyles } from "$lib/frontend/ColorScheme";
    import type { Readable } from "svelte/store";
	import { doc, setDoc } from "firebase/firestore";
	import { db } from "$lib/firebase/app";

    export let selected: string;
    export let roomId: string;
    const difficulties = ["easy", "normal", "hard", "expert", "evil"];

    const darkMode: Readable<boolean> = getContext("darkMode");
    $: ({fg} = buttonStyles($darkMode))
    
</script>

<div style="padding: {theme.space[7]}">
    <Text>Select Difficulty</Text>
    {#each difficulties as difficulty}
        <Button
            color={fg}
            variant={selected === difficulty ? "filled" : "outline"}
            override={{
                textTransform: "capitalize",
            }}
            on:click={() => {
                setDoc(doc(db, "rooms", roomId), {
                    difficulty
                }, { merge: true })
			}}
        >
            {difficulty}
        </Button>
    {/each}
</div>

<svelte:options accessors={true} />

<style lang="scss">
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>