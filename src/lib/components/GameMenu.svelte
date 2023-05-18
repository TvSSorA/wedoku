<script lang="ts">
	import Fa from 'svelte-fa';
	import { Button, Switch, Tooltip, Menu, Text } from '@svelteuidev/core';
	import {
		faPlay,
		faBook,
		faNewspaper,
		faShareNodes,
		faGem,
		faGear,
		faCircleQuestion,
		faPencil,
		faKhanda,
		faVolumeUp,
		faCircleHalfStroke
	} from '@fortawesome/free-solid-svg-icons';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { userCred, userData } from '$lib/firebase/user';

	const darkMode: Writable<boolean> = getContext('darkMode');
	// Do this because the checkbox state is flipped
	let lightMode = false;
	$: $darkMode = !lightMode;



</script>

<section class="menu-container">
	<a class="logo" href="/"><img src="/favicon.png" alt="Logo" /></a>
	<div class="main-buttons">
		<Menu trigger="hover" position="right" override={{ position: 'static' }}>
			<!-- most big brain section ever ngl -->
			<Button slot="control" fullSize color="red" radius={0} variant="subtle">
				<Fa slot="leftIcon" icon={faPlay} />
				Play
			</Button>
			<!-- https://github.com/svelteuidev/svelteui/issues/373 -->
			<Menu.Item
				root="a"
				href="/single"
				data-sveltekit-preload-data="off"
				icon={Fa}
				iconProps={{ iconProps: { icon: faPencil } }}
			>
				<Text size={14}>Single Player</Text>
			</Menu.Item>
			<Menu.Item
				icon={Fa}
				iconProps={{ iconProps: { icon: faKhanda } }}
				data-sveltekit-preload-data="off"
			>
				<Text size={14}>Multiplayer</Text>
			</Menu.Item>
		</Menu>
		<Tooltip label="Coming Soon!" position="right" withArrow arrowSize={3} color="grape">
			<Button fullSize color="dark" radius={0} variant="subtle">
				<Fa slot="leftIcon" icon={faBook} />
				Learn
			</Button>
		</Tooltip>
		<Tooltip label="Coming Soon!" position="right" withArrow arrowSize={3} color="grape">
			<Button fullSize color="dark" radius={0} variant="subtle">
				<Fa slot="leftIcon" icon={faNewspaper} />
				News
			</Button>
		</Tooltip>
		<Tooltip label="Coming Soon!" position="right" withArrow arrowSize={3} color="grape">
			<Button fullSize color="dark" radius={0} variant="subtle">
				<Fa slot="leftIcon" icon={faShareNodes} />
				Social
			</Button>
		</Tooltip>
		<Tooltip label="Coming Soon!" position="right" withArrow arrowSize={3} color="grape">
			<Button fullSize color="blue" radius={0} variant="subtle">
				<Fa slot="leftIcon" icon={faGem} />
				Premium
			</Button>
		</Tooltip>
	</div>
	<div class="footer-buttons">
		<Button fullSize color="dark" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faCircleHalfStroke} />
			Darky
		</Button>
		<audio src="/background_music.mp3"/>
		<Button class="bgMusic" fullSize color="dark" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faVolumeUp} />
			BGM
		  </Button>

		{#if $userCred && $userData}
			<Button href="/settings" fullSize color="dark" radius={0} variant="subtle">
				<Fa slot="leftIcon" icon={faGear} />
				Settings
			</Button>
		{/if}
		<Button fullSize color="dark" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faCircleQuestion} />
			Help
		</Button>
	</div>
</section>

<style lang="scss">
	img {
		margin-left: 13px;
		width: 80%;
	}
	audio {
		display: none;
	}

	.menu-container {
		height: 100%;
		
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		overflow-y: hidden;

		div {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.footer-buttons {
			opacity: 0.7;
			margin-bottom: 1rem;
		}
	}
</style>
