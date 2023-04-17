<script lang="ts">
	import Fa from 'svelte-fa';
	import { Button } from '@svelteuidev/core';
	import {
		faPlay,
		faBook,
		faNewspaper,
		faShareNodes,
		faGem,
		faGear,
		faCircleQuestion
	} from '@fortawesome/free-solid-svg-icons';
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	const darkMode: Writable<boolean> = getContext("darkMode");
	// Do this because the checkbox state is flipped
	let lightMode = false;
	$: $darkMode = !lightMode;
	
</script>

<section class="menu-container">
	<img src="/favicon.png" alt="Logo" />

	<div class="main-buttons">
		<Button fullSize color="red" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faPlay} />
			Play
		</Button>
		<Button fullSize color="dark" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faBook} />
			Learn
		</Button>
		<Button fullSize color="dark" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faNewspaper} />
			News
		</Button>
		<Button fullSize color="dark" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faShareNodes} />
			Social
		</Button>
		<Button fullSize color="blue" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faGem} />
			Premium
		</Button>
	</div>
	<div class="footer-buttons">
		<Button fullSize color="dark" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faGear} />
			Settings
		</Button>
		<Button fullSize color="dark" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faCircleQuestion} />
			Help
		</Button>
		<div class="toggle-switch">
			<label class="switch-label">
				<input type="checkbox" class="checkbox" bind:checked={lightMode}/>
				<span class="slider" />
			</label>
		</div>
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

	$background-color_1: var(--dark);
	$background-color_2: var(--light);

	.toggle-switch {
		position: relative;
		width: 65px;
		height: 35px;
		--light: #d8dbe0;
		--dark: #28292c;
		padding-bottom: 40px;
	}
	.switch-label {
		position: absolute;
		width: 50%;
		height: 30px;
		background-color: $background-color_1;
		border-radius: 25px;
		cursor: pointer;
		border: 3 px solid var(--dark);
	}
	.checkbox {
		position: absolute;
		display: none;
		&:checked {
			~ {
				.slider {
					background-color: $background-color_2;
					&::before {
						-webkit-transform: translateX(30px);
						-ms-transform: translateX(30px);
						transform: translateX(30px);
						background-color: $background-color_1;
						-webkit-box-shadow: none;
						box-shadow: none;
					}
				}
			}
		}
	}
	.slider {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 25px;
		-webkit-transition: 0.3s;
		transition: 0.3s;
		&::before {
			content: '';
			position: absolute;
			top: 5px;
			left: 5px;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			-webkit-box-shadow: inset 12px -4px 0px 0px var(--light);
			box-shadow: inset 12px -4px 0px 0px var(--light);
			background-color: $background-color_1;
			-webkit-transition: 0.3s;
			transition: 0.3s;
		}
	}
</style>
