<script lang="ts">
	import '../app.scss';
	import FriendsList from '$lib/components/FriendsList.svelte';
	import GameMenu from '$lib/components/GameMenu.svelte';
	import { SvelteUIProvider } from '@svelteuidev/core';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { userCred, userData } from '$lib/firebase/user';
	import { onAuthStateChanged } from 'firebase/auth';
	import { doc, getDoc } from 'firebase/firestore';
	import { auth, db } from "$lib/firebase/app";

	const darkMode = writable(true);
	setContext('darkMode', darkMode);

	onAuthStateChanged(auth, async (user) => {
		if (user) {
			$userCred = user
			$userData = ((await getDoc(doc(db, "users", user.uid))).data())!
		}
		else {
			$userCred = null;
			$userData = null;
		}
	})

	import { onMount } from 'svelte';

	
	import * as THREE from 'three';
	import WAVES from 'vanta/dist/vanta.waves.min';

	function vanta(node) {
		WAVES ({
			el: bg,
			THREE: THREE,
			mouseControls: true,
			touchControls: true,
			gyroControls: false,
			minHeight: 200.00,
			minWidth: 200.00,
			scale: 1.00,
			scaleMobile: 1.00,
			color: 0x1A202C,
			shininess: 5.00,
			waveSpeed: 0.10,
			zoom: 1.02
		})

	}

</script>

<div use:vanta id="bg"> </div>

<SvelteUIProvider
	withGlobalStyles
	withNormalizeCSS
	themeObserver={'dark'}
	override={{
		display: "flex",
		flexDirection: "row",
		gap: "4rem",
	}}
>

	

	<section class="menu">
		<GameMenu />
	</section>
	
	<main>
		<slot />
	</main>

	<section class="friends">
		{#if $userCred && $userData}
			<FriendsList />
		{/if}
	</section>

</SvelteUIProvider>

<style lang="scss">
	 #bg {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: -99;
	} 

	main {
		width: 100%;
		height: 100%;
		margin-top: 1rem;
	}

	.menu, .friends {
		position: sticky;
		top: 0;
		width: 10vw;
		height: 100vh;
		overflow-x: visible;
	}
</style>
