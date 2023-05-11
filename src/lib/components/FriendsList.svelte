<script lang="ts">
	import Fa from 'svelte-fa';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { faCircle } from '@fortawesome/free-solid-svg-icons';
	import { Button, Burger, Text } from '@svelteuidev/core';
	import { userCred } from '$lib/firebase/user';
	import { doc, onSnapshot, type DocumentData, getDoc } from 'firebase/firestore';
	import { getAuth } from 'firebase-admin/auth';
	import { db } from '$lib/firebase/app';

	let rawFriendsList: string[];
	let friendsList: DocumentData[] = [];

	let opened = false;

	const statusColor: Record<string, string> = {
		online: 'lime',
		"in-game" : 'red',
		offline: 'gray'
	};

	function getFriends() {
		for (const friend of rawFriendsList) {
			getAuth()
				.getUser(friend)
				.then(async (userRecord) => {
					friendsList.push({
						name: userRecord.displayName,
						avatar: userRecord.photoURL,
						onlineStatus: (await getDoc(doc(db, "users", friend))).data()!.onlineStatus
					})
				})
		}
	}

	onMount(async () => {
		onSnapshot(doc(db, "users", $userCred!.uid), (doc) => {
			rawFriendsList = (doc.data())!.friends
		})
		getFriends()
	});
</script>

<div class="friends-list-container">
	<Button
		fullSize
		radius={0}
		color="$dark-background-color"
		override={{ fontSize: '1rem' }}
		on:click={() => (opened = !opened)}
	>
		Friends
		<Burger slot="rightIcon" {opened} />
	</Button>
	{#if opened}
		<div class="friends-list" transition:slide>
			{#each friendsList as friend}
				<div class="friend">
					<img src="/favicon.png" alt="whar's avatar" />
					<Text override={{ fontSize: '$xs', overflow: 'hidden', textOverflow: 'ellipsis' }}>
						{friend}
					</Text>
					<Fa
						class="status"
						size="0.5x"
						icon={faCircle}
						color='lime'
						style="margin-left: auto"
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.friends-list-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		.friends-list {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			.friend {
				width: 100%;
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
