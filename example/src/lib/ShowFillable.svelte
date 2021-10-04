<script>
	import { Fillable, ButtonList } from 'svelte-themable-ui';

	let options = [{ value: 'magic', used: false }];
	let text =
		'# The Heading 1 \n\
\n\
something ~?~ to be filled \n\
\n\
```js\n\
const a = 111\n\
\n\
```\n\
';
</script>

<div class="flex flex-row w-full">
	<Fillable {text} bind:options />
	<ButtonList bind:items={options} />
</div>
