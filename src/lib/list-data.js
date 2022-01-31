export class ListData {
	#data = []
	#key = 'id'
	#selected

	constructor(data, key) {
		this.data = data
		if (key) this.key = key
	}

	/**
	 * @param {Array} value
	 */
	set data(value) {
		if (!Array.isArray(value))
			throw new TypeError('Expected data to be an array')
		this.#data = value
	}

	get data() {
		return this.#data
	}

	/**
	 * @param {string} value
	 */
	set key(value) {
		if (!value || typeof value !== 'string')
			throw new TypeError('Expected key to be a string')
		this.#key = value
	}

	get key() {
		return this.#key
	}

	set selected(item) {
		if (item) {
			const index = this.findIndex(item)
			if (index > -1) this.#selected = this.data[index]
		} else {
			this.#selected = null
		}
	}

	get selected() {
		return this.#selected
	}

	findIndex(item) {
		if (!item || typeof item !== 'object')
			throw new TypeError('Expected object')
		if (!(this.key in item))
			throw new TypeError(`Expected object to contain "${this.key}"`)

		return this.data.findIndex((x) => x[this.key] === item[this.key])
	}

	add(item) {
		const index = this.findIndex(item)
		if (index == -1) {
			this.data = [...this.data, item]
		} else {
			this.data[index] = { ...item }
		}
	}
	remove(item) {
		item = item ? item : this.#selected

		const index = this.findIndex(item)
		if (index > -1)
			this.data = [...this.data.slice(0, index), ...this.data.slice(index + 1)]
	}
	modify(item) {
		const index = this.findIndex(item)
		if (index > -1) this.data[index] = { ...item }
	}
}
