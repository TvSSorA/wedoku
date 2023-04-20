<script lang="ts">
	import Fa from 'svelte-fa';
	import { Button, Switch, Tooltip, Menu } from '@svelteuidev/core';
	import {
		faPlay,
		faBook,
		faNewspaper,
		faShareNodes,
		faGem,
		faGear,
		faCircleQuestion
	} from '@fortawesome/free-solid-svg-icons';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const darkMode: Writable<boolean> = getContext('darkMode');
	// Do this because the checkbox state is flipped
	let lightMode = false;
	$: $darkMode = !lightMode;
</script>

<section class="menu-container">
	<img src="/favicon.png" alt="Logo" />
	<div class="main-buttons">
		<Menu trigger="click" position="right" placement="center">
			<Button slot="control" fullSize color="red" radius={0} variant="subtle">
				<Fa slot="leftIcon" icon={faPlay} />
				Play
			</Button>
			<Menu.Item>Test 123</Menu.Item>
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
		<Switch checked size="md" radius="sm" color="red" onLabel="DARK" offLabel="LIGHT"/>
		<Button fullSize color="dark" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faGear} />
			Settings
		</Button>
		<Button fullSize color="dark" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faCircleQuestion} />
			Help
		</Button>
	</div>
</section>

<style lang="scss">
	img {
		width: 80%;
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
			opacity: 0.5;
		}
	}
</style>
