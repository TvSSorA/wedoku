<script lang="ts">
	import '../app.scss';
	import FriendsList from '$lib/components/FriendsList.svelte';
	import GameMenu from '$lib/components/GameMenu.svelte';
	import { SvelteUIProvider } from '@svelteuidev/core';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { userCred, userData } from '$lib/firebase/user';
	import { onAuthStateChanged } from 'firebase/auth';
	import { doc, getDoc, updateDoc } from 'firebase/firestore';
	import { auth, db } from "$lib/firebase/app";

    import * as THREE from 'three';
    import WAVES from 'vanta/dist/vanta.waves.min';

	import { Howl, Howler } from 'howler';

	const darkMode = writable(true);
	setContext('darkMode', darkMode);

	onAuthStateChanged(auth, async (user) => {
		if (user) {
			$userCred = user
			updateDoc(doc(db, "users", user.uid), { onlineStatus: "online"});
			$userData = ((await getDoc(doc(db, "users", user.uid))).data())!
		}
		else {
			$userCred = null;
			$userData = null;
		}
	})

    function vanta(_node: HTMLDivElement) {
        WAVES ({
            el: "#bg",
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

	let sound;

	$: if ($userData) {
		sound = new Howl({
		src: ['/theme.mp3'],
		volume: 0.5,
		autoplay: $userData!.settings.music
	})
	}
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div use:vanta id="bg" />

<div id="main"> 
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
</div>
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
		z-index: 99;
	}
</style>
