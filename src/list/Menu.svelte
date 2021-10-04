<script>
	import Icon from '../icon/Icon.svelte'

	export let items
	export let activePage
</script>

<nav class="menu">
	{#each items as item}
		<a href={item.target} class:isCurrent={item.target === activePage}>
			<Icon icon={item.icon} title={item.label} />
			<p>{item.label}</p>
		</a>
	{/each}
</nav>

<style lang="postcss">
	.menu {
		@apply select-none flex flex-col rounded-xl overflow-y-visible;
	}
	.menu a {
		@apply flex flex-row w-full items-center px-4 py-3;
		@apply first:rounded-t-xl last:rounded-b-xl;
	}
	.menu p {
		@apply px-4 flex flex-grow;
	}
</style>
