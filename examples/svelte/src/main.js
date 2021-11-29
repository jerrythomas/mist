import App from './App.svelte'
import 'virtual:windi.css'
import 'svelte-themable-ui/theme.css'
import './app.css'

const app = new App({
	target: document.getElementById('app')
})

export default app
