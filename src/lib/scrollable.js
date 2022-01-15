export function scrollable(node, data) {
	let { start, size, maxVisible, current } = data

	function handleKeyup(event) {
		console.log(event)
		if (event.key === 'ArrowDown') {
			if (current < size) {
				current++
				if (current > start + maxVisible) {
					start++
				}
			}
		} else if (event.key === 'ArrowUp') {
			if (current > 0) {
				current--
				if (current < start + maxVisible) {
					start--
				}
			}
		}
	}

	window.addEventListener('keyup', handleKeyup)

	return {
		destroy() {
			window.removeEventListener('keyup', handleKeyup)
		}
	}
}
