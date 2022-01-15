<script>
	import { Icon } from 'svelte-themable-ui'

	export let label
	export let icon
	export let href = '#'
	export let id
	export let current = false
</script>

<a class="list-item" {id} {href} class:current>
	{#if icon}
		<Icon {icon} />
	{/if}
	<p class="flex flex-grow">{label}</p>
</a>

<style lang="postcss">
	.list-item {
		@apply flex gap-2 px-4 py-2 leading-loose items-center cursor-pointer select-none;
		@apply border-b last:border-0 border-skin-100;
	}
</style>
