<script>
	import { Icon } from 'svelte-themable-ui';
	export let title;
	export let icons = {};
	export let columns = 8;

	$: count = Object.keys(icons).length;
	$: cols = [...Array(columns).keys()];
	$: rows = [...Array(Math.ceil(count / columns)).keys()];
	$: items = Object.keys(icons).map((name, index) => ({
		name,
		icon: icons[name],
		col: index % columns,
		row: Math.floor(index / columns)
	}));
</script>

<h1 class="text-2xl">{title}</h1>
<div class="flex flex-row gap-6 w-full p-8">
	{#each cols as col}
		<div class="flex flex-grow flex-col gap-6">
			{#each rows as row}
				{#if row * columns + col < count}
					<div class="flex flex-col justify-center items-center gap-4">
						<Icon
							icon={items[row * columns + col].icon}
							title={items[row * columns + col].name}
							size="1.5em"
						/>
						<span>{items[row * columns + col].name}</span>
					</div>
				{/if}
			{/each}
		</div>
	{/each}
</div>
