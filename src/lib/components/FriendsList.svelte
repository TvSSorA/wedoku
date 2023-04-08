<script lang="ts">
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';
	import { faCircle } from '@fortawesome/free-solid-svg-icons';
	import { Button, Burger, Text } from '@svelteuidev/core';
	export let list = [
		{
			name: 'loremipsum',
			avatar: '/favicon.png',
			status: 'online'
		},
		{
			name: 'foo',
			avatar: '/favicon.png',
			status: 'idle'
		},
		{
			name: 'bruh',
			avatar: '/favicon.png',
			status: 'offline'
		}
	];
	let opened = false;

    const statusColor: Record<string, string> = {
        online: "lime",
        idle: "red",
        offline: "gray"
    }
</script>

<div class="friends-list-container">
	<Button
		fullSize radius={0} color="gray"
		override={{ fontSize: "1rem" }}
		on:click={() => (opened = !opened)}
	>
		Friends
		<Burger slot="rightIcon" {opened} />
	</Button>
	{#if opened}
		<div class="friends-list" transition:slide>
			{#each list as { name, avatar, status }}
				<div class="friend">
					<img src={avatar} alt="{name}'s avatar" />
					<Text override={{ fontSize: '$xs', overflow: "hidden", textOverflow: "ellipsis"}}>{name}</Text>
					<Fa
						class="status"
						size="0.5x"
						icon={faCircle}
						color={statusColor[status]}
						style="margin-left: auto"
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.friends-list-container {
        display: flex;
        flex-direction: column;
		.friends-list {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			.friend {
				height: 2.5rem;
				display: flex;
				flex-direction: row;
				gap: 0.7rem;

				align-items: center;
				padding: 0 5%;
				img {
					height: 100%;
					aspect-ratio: 1;
				}
			}
		}
	}
</style>
