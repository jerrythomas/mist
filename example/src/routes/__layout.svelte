<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		return { props: { activePage: page.path, user: session.user } };
	}
</script>

<script>
	import { onMount } from 'svelte';
	import '../app.postcss';
	import '@fontsource/montserrat-alternates';
	import '@fontsource/montserrat-alternates/300.css';
	import '@fontsource/montserrat-alternates/700.css';
	import '@fontsource/kalam';
	import '@fontsource/victor-mono';
	import 'svelte-themable-ui/theme.css';

	import { Sidebar, UserCard, gravatar, Switch } from 'svelte-themable-ui';
	import { icons } from '$lib/icons';

	export let activePage = '/';
	let menu = [
		{ icon: icons.Tag, label: 'Preview', target: '/' },
		{ icon: icons.Home, label: 'Input', target: '/input' },
		{ icon: icons.Categories, label: 'Cards', target: '/cards' },
		{ icon: icons.BookMark, label: 'Lists', target: '/lists' },
		{ icon: icons.Sparkles, label: 'Icons', target: '/icons' }
	];

	let firstName = 'Jerry';
	let lastName = 'Thomas';
	let email = 'jerry.thomas@senecaglobal.com';
	let dark = false;

	function onChange(event) {
		dark
			? window.document.body.classList.add('dark')
			: window.document.body.classList.remove('dark');
	}

	onMount(() => {
		dark = window.document.body.classList.contains('dark');
		console.log(window.document.body.classList);
	});

	$: avatar = gravatar(email);
</script>

<Sidebar {menu} {activePage}>
	<UserCard {firstName} {lastName} {avatar} slot="header" />
	<div slot="footer" class="foot rounded-xl border  p-4 flex flex-col">
		<span class="flex flex-row w-full items-center">
			<p class="flex flex-grow">Toggle Theme</p>
			<Switch bind:isChecked={dark} on:change={onChange} />
		</span>
		<p>Preview of all themable components.</p>
	</div>
</Sidebar>
<content class="flex flex-col flex-grow p-8">
	<slot />
</content>

<style lang="postcss">
	:global(.dark) .foot {
		@apply border-gray-800 bg-gray-700;
	}
</style>
