<script>
	import ListItem from './ListItem.svelte'
	import { scrollable } from '../lib/scrollable'
	export let items
	export let key = 'id'
	export let label = 'label'
	export let icon = 'icon'
	export let href = 'href'
	export let maxVisible = -1

	let start = 0
	let current = -1
	$: maxVisible =
		maxVisible && maxVisible > 0
			? Math.min(maxVisible, items.length)
			: items.length
	$: data = items.slice(start, maxVisible)
</script>

<list
	class="flex flex-col"
	fucusable="true"
	tabindex={0}
	use:scrollable={{ start, current, maxVisible, size: items.length }}
>
	{#each data as item, index}
		<ListItem
			id={item[key]}
			label={item[label]}
			icon={item[icon]}
			href={item[href]}
			current={index == current}
		/>
	{/each}
</list>
