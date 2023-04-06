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
>
	<section id="bg" style="background-color: {theme.colors['dark700'].computedValue}" />

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
	#bg {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: -99;
	}

	.menu {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		overflow-y: hidden;

		position: absolute;
		width: 10vw;
		height: 100vh;
		z-index: 99;

		//background-color: $menu-color;
	}

	.friends {
		position: absolute;
		right: 0;
		top: 0;
		width: 10vw;
		height: 100vh;
		z-index: 99;
		overflow: hidden;

		//background-color: $menu-color;
	}
</style>
