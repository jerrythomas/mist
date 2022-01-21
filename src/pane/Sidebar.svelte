<script>
	import Menu from '../list/Menu.svelte'
	import { getContext } from 'svelte'

	let site = getContext('site')
	let sidebar

	export let menu
	export let activePage

	function toggle() {
		sidebar.classList.toggle('-translate-x-full')
		$site.toggleSidebar = false
	}

	$: if ($site.toggleSidebar) toggle()
</script>

<aside
	bind:this={sidebar}
	class="sidebar absolute inset-y-0 left-0 md:relative transform md:translate-x-0 -translate-x-full"
>
	<slot name="header" />
	<Menu items={menu} {activePage} />
	<slot name="footer" />
</aside>

<style lang="postcss">
	aside {
		z-index: 1;
		@apply flex flex-col;
		@apply transition duration-200 ease-in-out;
	}
</style>
