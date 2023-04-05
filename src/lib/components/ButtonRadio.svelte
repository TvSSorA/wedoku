<script lang="ts">
	import { Button } from 'agnostic-svelte';

	export let id: string;
	export let name: string;
	export let size: string = '';
	export let legend: string = 'radio';
	export let choices: Record<'value' | 'label', string>[];
	export let disabledChoices: string[] = [];
	export let checked: string;

	export let isSkinned = true;
	export let isFieldset = true;
	export let isDisabled = false;

	$: skin = isSkinned ? `radio-legend` : '';
	$: legendClasses = [
		skin,
		// .screenreader-only is expected to be globally available via common.min.css
		isFieldset === false ? 'screenreader-only' : ''
	]
		.filter((c) => c)
		.join(' ');
	$: fieldsetClasses = () => {
		// If consumer sets is skinned to false we don't style the fieldset
		const skin = isSkinned ? `radio-group` : '';
		// we only add the fieldset class for large (not small) e.g. radio|checkbox-group-large
		const sizeSkin = isSkinned && size === 'large' ? `radio-group-${size}` : '';
		let klasses = [skin, sizeSkin, isFieldset === false ? `radio-group-hidden` : ''];
		klasses = klasses.filter((klass) => klass.length);
		return klasses.join(' ');
	};
</script>

<fieldset class={fieldsetClasses()}>
	<legend class={legendClasses}>{legend}</legend>
	<input type="hidden" value={checked} on:blur on:input on:focus {...$$restProps} />
	{#each choices as { value, label } (value)}
		<Button
			isBordered={value !== checked}
			isDisabled={isDisabled || disabledChoices.includes(value)}
			isCapsule
			mode="primary"
			on:click={() => (checked = value)}
		>
			{label}
		</Button>
	{/each}
</fieldset>

<style>
	.radio-group {
		--width-28: calc(7 * var(--fluid-4)); /* 1.75rem/28px */
		border: 1px solid var(--agnostic-checkbox-border-color, var(--agnostic-gray-light));
		padding: var(--fluid-24);
		padding-top: var(--fluid-14);
		border-radius: var(--fluid-8);
	}
	.radio-group-large {
		padding: var(--width-28);
		padding-top: var(--fluid-16);
	}
	.radio-legend {
		padding: var(--fluid-2) var(--fluid-14);
		border-radius: var(--fluid-2);
	}
</style>
