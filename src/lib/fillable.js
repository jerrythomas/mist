export function fillable(node, { options, current, check }) {
	let data = { options, current, check }

	function click(event) {
		if ('?' !== event.target.innerHTML) {
			event.target.innerHTML = '?'
			event.target.classList.remove('isFilled')
			event.target.classList.remove('hasPassed')
			event.target.classList.remove('hasError')
			event.target.classList.add('isEmpty')
			node.dispatchEvent(
				new CustomEvent('remove', {
					detail: {
						index: event.target.name.split('-')[1],
						value: event.target['data-index']
					}
				})
			)
		}
	}

	let blanks = node.getElementsByTagName('del')
	Object.keys(blanks).map((ref) => {
		blanks[ref].addEventListener('click', click)
		blanks[ref].classList.add('isEmpty')
		blanks[ref].name = 'fill-' + ref
		blanks[ref]['data-index'] = ref
	})

	function fill(options, current) {
		if (current > -1 && current < Object.keys(blanks).length) {
			let index = data.options.findIndex(
				({ actualIndex }) => actualIndex == current
			)
			if (index > -1) {
				blanks[current].innerHTML = options[index].value
				blanks[current].classList.remove('isEmpty')
				blanks[current].classList.add('isFilled')
			}
		}
	}
	function doCheck() {
		Object.keys(blanks).map((ref) => {
			let index = data.options.findIndex(
				({ actualIndex }) => actualIndex == ref
			)
			if (index > -1)
				blanks[ref].classList.add(
					data.options[index].expectedIndex == data.options[index].actualIndex
						? 'hasPassed'
						: 'hasError'
				)
		})
	}

	return {
		update({ options, current }) {
			data.options = options
			data.current = current
			data.check = check

			fill(data.options, data.current)
			if (data.check) doCheck()
		},
		destroy() {
			Object.keys(blanks).map((ref) => {
				blanks[ref].removeEventListener('click', click)
			})
		}
	}
}
