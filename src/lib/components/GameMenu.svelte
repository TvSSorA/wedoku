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

<style lang="scss">
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
</style>
