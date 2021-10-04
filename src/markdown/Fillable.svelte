<script>
	import Markdown from './Markdown.svelte'
	import { fillable } from '../lib/fillable'

	export let text
	export let options = []
	export let current = 0
	export let check = false
</script>

<fill
	use:fillable={{ options, current, check }}
	on:remove
	class="markdown-body"
>
	<Markdown content={text} />
</fill>

<style lang="postcss">
	fill {
		@apply flex-grow;
	}

	fill :global(del) {
		@apply no-underline px-2 py-1 rounded cursor-pointer shadow-md;
	}
</style>
