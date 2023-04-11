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
</script>

<section class="menu-container">
	<img src="/favicon.png" alt="Logo" />

	<div class="main-buttons">
		<Button fullSize color="red" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faPlay} />
			Play
		</Button>
		<Button fullSize color="gray" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faBook} />
			Learn
		</Button>
		<Button fullSize color="gray" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faNewspaper} />
			News
		</Button>
		<Button fullSize color="gray" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faShareNodes} />
			Social
		</Button>
		<Button fullSize color="blue" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faGem} />
			Premium
		</Button>
	</div>
	<div class="footer-buttons">
		<Button fullSize color="gray" radius={0} variant="subtle">
			<Fa slot="leftIcon" icon={faGear} />
			Settings
		</Button>
		<Button fullSize color="gray" radius={0} variant="subtle">
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
	}
</style>
