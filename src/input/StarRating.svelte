<script>
	import StarIcon from '../icon/outline/Star.svelte'
	import Icon from '../icon/Icon.svelte'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let value = 0
	export let max = 5
	export let editable = true
	export let fill = 'currentColor'
	export let stroke = 'orange'

	function handleClick(index) {
		if (editable) {
			// console.log(value, index)
			value = value == 1 && index == 0 ? index : index + 1

			dispatch('change', { value })
		}
	}

	$: stars = [...Array(max).keys()].map((i) => i < value)
</script>

<input type="number" min="0" {max} hidden bind:value />
<div class="flex flex-row text-pink-400" style="--stars: {max}">
	{#each stars as selected, index}
		<Icon
			icon={StarIcon}
			fill={selected ? fill : 'none'}
			{stroke}
			on:click={() => handleClick(index)}
		/>
	{/each}
</div>

<style>
	div {
		width: calc(var(--stars) * 1.5em);
	}
</style>
