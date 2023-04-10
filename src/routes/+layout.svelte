<script>
	import '../app.scss';
	import FriendsList from '$lib/components/FriendsList.svelte';
	import GameMenu from '$lib/components/GameMenu.svelte';
	import { SvelteUIProvider, theme } from '@svelteuidev/core';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const darkMode = writable(true);
	setContext('darkMode', darkMode);
</script>

<SvelteUIProvider 
	withNormalizeCSS 
	withGlobalStyles 
	themeObserver={$darkMode ? 'dark' : 'light'}
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
		<FriendsList />
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
	}
</style>
