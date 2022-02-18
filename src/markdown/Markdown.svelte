<script>
	import { marked } from 'marked'
	import prism from 'prismjs'

	import 'prismjs/components/prism-c.js'
	import 'prismjs/components/prism-clike.js'
	import 'prismjs/components/prism-cpp.js'
	import 'prismjs/components/prism-csharp.js'
	import 'prismjs/components/prism-css.js'
	import 'prismjs/components/prism-docker.js'
	import 'prismjs/components/prism-go.js'
	import 'prismjs/components/prism-java.js'
	import 'prismjs/components/prism-javascript.js'
	import 'prismjs/components/prism-jq.js'
	import 'prismjs/components/prism-json.js'
	import 'prismjs/components/prism-julia.js'
	import 'prismjs/components/prism-kotlin.js'
	import 'prismjs/components/prism-python.js'
	import 'prismjs/components/prism-r.js'
	import 'prismjs/components/prism-ruby.js'
	import 'prismjs/components/prism-rust.js'
	import 'prismjs/components/prism-scss.js'
	import 'prismjs/components/prism-sql.js'
	import 'prismjs/components/prism-typescript.js'
	import 'prismjs/components/prism-yaml.js'

	marked.setOptions({
		highlight: (code, lang) => {
			if (prism && prism.languages[lang]) {
				return prism.highlight(code, prism.languages[lang], lang)
			} else {
				return code
			}
		}
	})

	export let content = ''
	$: preview = marked(content || '')
</script>

<article class="markdown-body">
	{@html preview}
</article>

<style>
	@import url('./markdown.css');
	@import url('./prism.css');
</style>
