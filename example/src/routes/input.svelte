<script>
	import ShowFillable from '$lib/ShowFillable.svelte';
	// // import Radio from '$lib/input/NewRadio.svelte'
	// import { init } from 'svelte/internal';

	// export let options = [
	// 	{ label: 'One' },
	// 	{ label: 'Two' },
	// 	{
	// 		label:
	// 			'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et'
	// 	}
	// ];

	// function initIndex(options) {
	//   let current = -1
	//   for (let i = 0; i < options.length && current != -1; i++) {
	//     current = option.checked ? i : current
	//   }
	//   return current
	// }
	// let index = -1
	// $: index = initIndex(options)

	// $: console.log(options);
	// function handleChange(event) {}
</script>

<ShowFillable />
<!-- <content class="p-8 w-1/3 space-y-4">
  <h1>Radio Group</h1>
  <group class="flex flex-col space-y-2">
    {#each options as { header, label, checked }, i}
      <Radio {header} {label} {checked} on:change={handleChange} />
    {/each}
  </group>
</content> -->
