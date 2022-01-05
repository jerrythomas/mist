<script>
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let label = 'Use Setting'
	export let isChecked = false
	export let tabindex = 0

	function toggle(event) {
		isChecked = !isChecked
		dispatch('change', { isChecked })
	}
</script>

<button role="switch" {tabindex} aria-checked={isChecked} on:click={toggle}>
	<span class="sr-only">{label}</span>
	<mark aria-hidden="true" />
</button>

<style lang="postcss">
	button {
		@apply w-16 h-8 rounded-full relative;
		@apply transition-colors ease-in-out duration-200;
		@apply focus:outline-none focus-visible:ring-2;
	}
	.sr-only {
		@apply hidden;
	}
	button mark {
		@apply pointer-events-none transition ease-in-out duration-200;
		@apply h-6 w-6 rounded-full absolute top-0.5;
	}
	button[aria-checked='false'] mark {
		@apply left-0.5;
	}
	button[aria-checked='true'] mark {
		@apply right-0.5;
	}
</style>
