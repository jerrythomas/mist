import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { ListData } from '../src/lib/list-data.js'

const ListDataSuite = suite('List Data')

ListDataSuite.before(async (context) => {
	context.invalidItem = [
		{
			key: 'id',
			items: [
				{ item: undefined, expected: RegExp('Expected object') },
				{ item: null, expected: RegExp('Expected object') },
				{ item: {}, expected: RegExp('Expected object to contain "id"') }
			]
		},
		{
			key: 'key',
			items: [
				{ item: undefined, expected: RegExp('Expected object') },
				{ item: null, expected: RegExp('Expected object') },
				{ item: {}, expected: RegExp('Expected object to contain "key"') }
			]
		}
	]

	context.initial = [
		{ id: 1, name: 'Alpha' },
		{ id: 2, name: 'Beta' },
		{ id: 3, name: 'Charlie' }
	]
})
ListDataSuite('Should only allow Arrays for data', () => {
	try {
		new ListData()
	} catch (err) {
		assert.instance(err, TypeError)
		assert.match(err.message, 'Expected data to be an array')
	}

	try {
		new ListData({})
	} catch (err) {
		assert.instance(err, TypeError)
		assert.match(err.message, 'Expected data to be an array')
	}
})

ListDataSuite('Should only allow strings for key', () => {
	try {
		new ListData([], {})
	} catch (err) {
		assert.instance(err, TypeError)
		assert.match(err.message, 'Expected key to be a string')
	}
})

ListDataSuite('Should initialize with valid options', () => {
	let list = new ListData([])
	assert.equal(list.data, [])
	assert.equal(list.key, 'id')
	assert.not(list.selected)

	list = new ListData([], 'key')
	assert.equal(list.data, [])
	assert.equal(list.key, 'key')
	assert.not(list.selected)
})

ListDataSuite(
	'Should throw error when invalid item is passed to `findIndex`',
	(context) => {
		context.invalidItem.forEach(({ key, items }) => {
			let list = new ListData([], key)
			items.map(({ item, expected }, index) => {
				assert.throws(
					() => list.findIndex(item),
					(err) => err instanceof TypeError,
					`Invalid item for key ${key} test ${index}`
				)
				assert.throws(
					() => list.findIndex(item),
					expected,
					`Invalid item for key ${key} test ${index}`
				)
			})
		})
	}
)
ListDataSuite(
	'Should throw error when invalid item is passed to `add`',
	(context) => {
		context.invalidItem.forEach(({ key, items }) => {
			let list = new ListData([], key)
			items.map(({ item, expected }, index) => {
				assert.throws(
					() => list.add(item),
					(err) => err instanceof TypeError,
					`Invalid item for key ${key} test ${index}`
				)
				assert.throws(
					() => list.add(item),
					expected,
					`Invalid item for key ${key} test ${index}`
				)
			})
		})
	}
)

ListDataSuite(
	'Should throw error when invalid item is passed to `modify`',
	(context) => {
		context.invalidItem.forEach(({ key, items }) => {
			let list = new ListData([], key)
			items.map(({ item, expected }, index) => {
				assert.throws(
					() => list.modify(item),
					(err) => err instanceof TypeError,
					`Invalid item for key ${key} test ${index}`
				)
				assert.throws(
					() => list.modify(item),
					expected,
					`Invalid item for key ${key} test ${index}`
				)
			})
		})
	}
)
ListDataSuite(
	'Should throw error when invalid item is passed to `remove`',
	(context) => {
		context.invalidItem.forEach(({ key, items }) => {
			let list = new ListData([], key)
			items.map(({ item, expected }, index) => {
				assert.throws(
					() => list.remove(item),
					(err) => err instanceof TypeError,
					`Invalid item for key ${key} test ${index}`
				)
				assert.throws(
					() => list.remove(item),
					expected,
					`Invalid item for key ${key} test ${index}`
				)
			})
		})
	}
)
ListDataSuite(
	'Should throw error when invalid item is passed to `select`',
	(context) => {
		context.invalidItem.forEach(({ key, items }) => {
			let list = new ListData([], key)
			// nulls and undefined are allowed in select.
			items.slice(2).map(({ item, expected }, index) => {
				assert.throws(
					() => (list.selected = item),
					(err) => err instanceof TypeError,
					`Invalid item for key ${key} test ${index}`
				)
				assert.throws(
					() => (list.selected = item),
					expected,
					`Invalid item for key ${key} test ${index}`
				)
			})
		})
	}
)
ListDataSuite('Should find an item using key', (context) => {
	let list = new ListData(context.initial)
	context.initial.map((item, index) => {
		assert.equal(list.findIndex(item), index, 'Index should match')
	})
	assert.equal(list.findIndex({ id: 10 }), -1, 'Should return -1')
})
ListDataSuite('Should add an item using key', (context) => {
	let list = new ListData([...context.initial])
	let delta = { id: 4, name: 'Delta' }

	assert.equal(list.data, context.initial, 'Verify initial data')
	list.add(delta)
	assert.equal(list.data.length, 4, 'Verify item was added')
	assert.equal(list.data[3], delta, 'Verify added item')

	let item = { id: 3, name: 'Echo' }
	assert.not.equal(list.data[2], item, 'Added item is not same')
	list.add(item)
	assert.equal(list.data.length, 4, 'Verify data length did not change')
	assert.equal(list.data[2], item, 'Verify added item has updated')
})
ListDataSuite('Should modify an item using key', (context) => {
	let list = new ListData([...context.initial])
	let item = { id: 3, name: 'Echo' }
	assert.not.equal(list.data[2], item, 'Modified item is not same')
	list.modify(item)
	assert.equal(list.data.length, 3, 'Verify data length did not change')
	assert.equal(list.data[2], item, 'Verify added item has updated')
})
ListDataSuite('Should remove an item using key', (context) => {
	let list = new ListData([...context.initial])
	let item = { id: 3, name: 'Echo' }

	assert.not.equal(list.data[2], item, 'item to be removed is not same')
	list.remove(item)
	assert.equal(list.data.length, 2, 'Verify data length did not change')
})

ListDataSuite('Should select an item using key', (context) => {
	let list = new ListData([...context.initial])

	list.selected = { id: 2 }
	assert.equal(list.selected, list.data[1])
	list.selected = null
	assert.not(list.selected)
})
ListDataSuite.run()
