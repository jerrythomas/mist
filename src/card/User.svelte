<script>
	export let name
	export let avatar
	export let title
	export let href = '#'
	export let highlightFirst = true
	export let highlightLast = false

	$: parts = (name || '').split(' ')
	$: firstName = parts[0]
	$: lastName = parts.slice(1).join(' ')
</script>

<card class="user">
	<img class="avatar" src={avatar} alt={name} />
	<a {href} class="no-underline flex flex-col justify-center">
		<h1>
			<span class:bold={highlightFirst}>{firstName}</span>
			<span class:bold={highlightLast}>{lastName}</span>
		</h1>
		{#if title}
			<h2>{title}</h2>
		{/if}
	</a>
</card>

<style lang="postcss">
	.user {
		@apply flex flex-row w-full rounded-md;
	}
	.bold {
		@apply font-bold;
	}
</style>
