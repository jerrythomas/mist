<script>
	import { Markdown } from 'svelte-themable-ui/markdown';

	let content = '# The Heading 1 \n\
\n\
sample text \n\
\n\
```c\n\
const a = 111\n\
\n\
```\n\
';
</script>

<Markdown {content} />
