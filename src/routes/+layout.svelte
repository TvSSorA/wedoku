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
</script>
<!-- <script src="three.r134.min.js"></script>
<script src="vanta.halo.min.js"></script>
<script>
VANTA.HALO({
  el: "#your-element-selector",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  size: 3.00
})
</script> -->

<div id="vantajs">

</div>


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
	/* #bg {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: -99;
	} */

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
