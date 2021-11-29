<script>
	export let stops = []
	export let id
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
	<linearGradient {id}>
		{#each stops as { offset, color }}
			<stop {offset} stop-color={color} />
		{/each}
	</linearGradient>
</svg>
