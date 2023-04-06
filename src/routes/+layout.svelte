<script>
	import '../app.scss';
	import Fa from 'svelte-fa';
	import FriendsList from "$lib/components/FriendsList.svelte";
	import { faPlay, faBook, faNewspaper, faShareNodes, faGem, faGear, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
	import { SvelteUIProvider, Button, theme } from '@svelteuidev/core';
	import { setContext } from "svelte";
	import { writable } from "svelte/store";

	const darkMode = writable(true);
	setContext("darkMode", darkMode);
</script>

<SvelteUIProvider
	withNormalizeCSS
	withGlobalStyles
	themeObserver={$darkMode ? "dark" : "light"}
>
	<section id="bg" style="background-color: {theme.colors["dark700"].computedValue}"/>

	<section class="menu">
		<img src="/favicon.png" alt="Logo" />

		<div class="main-buttons">
			<Button color="red" radius={0} variant="subtle">
				<Fa slot="leftIcon" icon={faPlay} />
				Play
			</Button>
			<Button color="dark" radius={0} variant="subtle">
				<Fa slot="leftIcon" icon={faBook} />
				Learn
			</Button>
			<Button color="dark" radius={0} variant="subtle">
				<Fa slot="leftIcon" icon={faNewspaper} />
				News
			</Button>
			<Button color="dark" radius={0} variant="subtle">
				<Fa slot="leftIcon" icon={faShareNodes} />
				Social
			</Button>
			<Button color="blue" radius={0} variant="subtle">
				<Fa slot="leftIcon" icon={faGem} />
				Premium
			</Button>
		</div>
		<div class="footer-buttons">
			<Button color="dark" radius={0} variant="subtle">
				<Fa slot="leftIcon" icon={faGear} />
				Settings
			</Button>
			<Button color="dark" radius={0} variant="subtle">
				<Fa slot="leftIcon" icon={faCircleQuestion} />
				Help
			</Button>
		</div>
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
		img {
			width: 80%;
		}

		.main-buttons {
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 100%;
		}

		.footer-buttons {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
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
