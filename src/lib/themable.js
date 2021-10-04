export function pannable(node, { options, current }) {
	let data = { options, current }

	function toggle(event) {
		const previous = data.current
		data.current = (data.current + 1) % data.options.length

		document.body.classList.remove(data.options[previous])
		document.body.classList.add(data.options[data.current])
	}

	node.addEventListener('change', toggle)

	return {
		destroy() {
			node.removeEventListener('mousedown', toggle)
		}
	}
}
