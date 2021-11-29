<script>
	import { StarRating } from 'svelte-themable-ui'
	// import { Icon } from 'svelte-themable-ui'
	import { Star } from 'svelte-themable-ui/outline'
	// import { Markdown } from 'svelte-themable-ui/markdown'
	let value = 2
	// 	let content =
	// 		'# The Heading 1 \n\
	// \n\
	// sample text \n\
	// \n\
	// ```c\n\
	// const a = 111\n\
	// \n\
	// ```\n\
	// '
</script>

<!-- <Markdown {content} /> -->
<!-- <Icon icon={icons.Star} /> -->
<StarRating bind:value />
