<script>
	export let firstName
	export let lastName
	export let avatar
	export let title
	export let href = '#'

	export let name = firstName + ' ' + lastName
</script>

<card class="user">
	<img class="avatar" src={avatar} alt={name} />
	<a {href} class="no-underline flex flex-col justify-center">
		<h1><b>{firstName}</b> {lastName}</h1>
		{#if title}
			<h2>{title}</h2>
		{/if}
	</a>
</card>

<style lang="postcss">
	.user {
		@apply flex flex-row w-full rounded-md;
	}
</style>
