<script>
	import Menu from '../list/Menu.svelte'

	export let menu
	export let activePage
</script>

<aside class="sidebar">
	<slot name="header" />
	<Menu items={menu} {activePage} />
	<slot name="footer" />
</aside>

<style lang="postcss">
	.sidebar {
		@apply flex flex-col p-8 h-full w-80 gap-6 flex-shrink-0 overflow-y-auto;
	}
</style>
