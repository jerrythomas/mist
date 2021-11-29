<script>
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let id
	export let label = 'Use Setting'
	export let isChecked = false
	export let tabindex = 0

	function toggle(event) {
		isChecked = !isChecked
		dispatch('change', { isChecked })
	}
</script>

<button
	{id}
	role="switch"
	{tabindex}
	aria-checked={isChecked}
	on:click={toggle}
>
	<span class="sr-only hidden">{label}</span>
	<mark aria-hidden="true" />
</button>

<style lang="postcss">
	button {
		width: 4em;
		height: 2em;
		border-radius: 2em 2em;
		@apply p-0 relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer;
		@apply transition-colors ease-in-out duration-200;
		@apply focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75;
	}
	.sr-only {
		@apply hidden;
	}
	button mark {
		@apply pointer-events-none inline-block rounded-full shadow-lg transform ring-0 transition ease-in-out duration-200;
		width: calc(2em - 4px);
		height: calc(2em - 4px);
		border-radius: 100%;
	}
	button[aria-checked='false'] mark {
		transform: translateX(0px);
	}
	button[aria-checked='true'] mark {
		transform: translateX(calc(2em));
	}
</style>
