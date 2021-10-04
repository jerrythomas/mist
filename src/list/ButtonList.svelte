<script>
	import { createEventDispatcher } from 'svelte'
	export const dispatch = createEventDispatcher()

	export let items = []

	function click(index) {
		if (!items[index].used) {
			dispatch('click', items[index])
			items[index].used = false
		}
	}
</script>

<div class="p-4 flex flex-col w-96 border-l border-gray-500">
	{#each items as { value, used }, index}
		<button on:click={click(index)} class:used>
			{value}
		</button>
	{/each}
</div>

<style class="postcss">
	button {
		@apply w-full px-4 py-2;
	}
</style>
