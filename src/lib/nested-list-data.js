import { ListData } from './list-data.js'
import { equals } from 'ramda'

export class NestedListData extends ListData {
	#key
	#lookup = {}
	#selected

	constructor(data, key, lookup) {
		super(data)
		this.key = key
		this.lookup = lookup
		this.selected = null
	}

	/**
	 * Verifies expected structure and sets the key if valid.
	 *
	 * @param {object} value
	 */
	set key(value) {
		if (typeof value !== 'object')
			throw new TypeError('Expected key to be an object')
		else if (!equals(['group', 'item', 'lookup'], Object.keys(value).sort()))
			throw new TypeError(
				'Expected `key` object to contain keys [group, item, lookup]'
			)

		this.#key = value
	}
	get key() {
		return this.#key
	}

	/**
	 * @param {object} value
	 */
	set lookup(value) {
		if (typeof value !== 'object')
			throw new TypeError('Expected lookup to be an object')
		this.#lookup = value
	}

	get lookup() {
		return this.#lookup
	}
	/**
	 *
	 * @param {object} item
	 */
	set selected(item) {
		if (item) {
			const index = this.findIndex(item)
			if (index[0] > -1 && index[1] > -1)
				this.#selected = this.data[index[0]].items[index[1]]
		} else {
			this.#selected = null
		}
	}
	get selected() {
		return this.#selected
	}

	/**
	 *
	 * @param {object} item
	 */
	findGroupIndex(item) {
		const group = this.lookup[item[this.key.lookup]]
		return this.data.findIndex((g) => g[this.key.group] === group)
	}

	/**
	 *
	 * @param {object} item
	 */
	findIndex(item) {
		if (!item || typeof item !== 'object')
			throw new TypeError('Expected object')
		if (!(this.key.item in item))
			throw new TypeError(`Expected object to contain "${this.key.item}"`)
		if (!(this.key.lookup in item))
			throw new TypeError(`Expected object to contain "${this.key.lookup}"`)

		const groupIndex = this.findGroupIndex(item)

		if (groupIndex > -1) {
			const itemIndex = this.data[groupIndex].items.findIndex(
				(x) => x[this.key.item] === item[this.key.item]
			)

			return [groupIndex, itemIndex]
		}

		return [-1, -1]
	}

	/**
	 *
	 * @param {string} name
	 * @param {string} key
	 */
	addGroup(name, key) {
		if (key in this.lookup) throw new Error('Group already exists')

		this.lookup[key] = name
		this.data.push({ name, items: [] })
	}

	/**
	 *
	 * @param {object} item
	 */
	add(item) {
		const index = this.findIndex(item)
		if (index[0] === -1)
			throw new Error('Cannot add item to unknown group. Add group first')
		if (index[1] > -1) throw new Error('Cannot add item with existing key')

		this.data[index[0]].items = [...this.data[index[0]].items, item].sort()
	}

	/**
	 *
	 * @param {object} item
	 */
	remove(item) {
		item = item ? item : this.#selected

		const index = this.findIndex(item)
		if (index[0] > -1 && index[1] > -1)
			this.data[index[0]] = {
				...this.data[index[0]],
				items: [
					...this.data[index[0]].items.slice(0, index[1]),
					...this.data[index[0]].items.slice(index[1] + 1)
				]
			}
	}

	/**
	 *
	 * @param {object} item
	 */
	modify(item) {
		const newIndex = this.findIndex(item)
		if (!this.selected || this.selected[this.key.item] != item[this.key.item]) {
			throw new Error('Only selected item can be modified')
		}
		const oldIndex = this.findIndex(this.selected)

		if (oldIndex[0] === newIndex[0]) {
			this.data[newIndex[0]].items[newIndex[1]] = { ...item }
			this.selected = item
		} else {
			this.remove(this.selected)
			this.add(item)
		}
	}
}
