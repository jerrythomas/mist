import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { NestedListData } from '../src/lib/nested-list-data.js'

const NestedListDataSuite = suite('Nested List Data')

NestedListDataSuite.before(async (context) => {
	context.key = {
		group: 'name',
		item: 'id',
		lookup: 'lookup_id'
	}
	context.data = [
		{
			name: 'One',
			items: [
				{ id: 1, name: 'Alpha', lookup_id: 1 },
				{ id: 2, name: 'Beta', lookup_id: 1 },
				{ id: 3, name: 'Charlie', lookup_id: 1 }
			]
		},
		{
			name: 'Two',
			items: [
				{ id: 4, name: 'Delta', lookup_id: 2 },
				{ id: 5, name: 'Echo', lookup_id: 2 },
				{ id: 6, name: 'Foxtrot', lookup_id: 2 }
			]
		}
	]
	context.lookup = {
		1: 'One',
		2: 'Two'
	}

	context.invalidItem = [
		{
			data: [{ name: 'One', items: [{ id: 1, name: 'Alpha', lookup_id: 1 }] }],
			lookup: { 1: 'One' },
			key: {
				group: 'name',
				item: 'id',
				lookup: 'lookup_id'
			},
			items: [
				{ item: undefined, expected: RegExp('Expected object') },
				{ item: null, expected: RegExp('Expected object') },
				{ item: {}, expected: RegExp('Expected object to contain "id"') },
				{
					item: { id: 1 },
					expected: RegExp('Expected object to contain "lookup_id"')
				}
			]
		},
		{
			data: [{ name: 'One', items: [{ key: 1, name: 'Alpha', lookup_id: 1 }] }],
			lookup: { 1: 'One' },
			key: {
				group: 'name',
				item: 'key',
				lookup: 'lookup_id'
			},
			items: [
				{ item: undefined, expected: RegExp('Expected object') },
				{ item: null, expected: RegExp('Expected object') },
				{ item: {}, expected: RegExp('Expected object to contain "key"') },
				{
					item: { key: 1 },
					expected: RegExp('Expected object to contain "lookup_id"')
				}
			]
		}
	]
})

NestedListDataSuite('Should only allow Arrays for data', (context) => {
	try {
		new NestedListData()
	} catch (err) {
		assert.instance(err, TypeError)
		assert.match(err.message, 'Expected data to be an array')
	}

	try {
		new NestedListData({})
	} catch (err) {
		assert.instance(err, TypeError)
		assert.match(err.message, 'Expected data to be an array')
	}
})
NestedListDataSuite('Should only allow valid key object', (context) => {
	try {
		new NestedListData([])
	} catch (err) {
		assert.instance(err, TypeError)
		assert.match(err.message, 'Expected key to be an object')
	}

	try {
		new NestedListData([], {})
	} catch (err) {
		assert.instance(err, TypeError)
		assert.match(
			err.message,
			'Expected `key` object to contain keys [group, item, lookup]'
		)
	}
})
NestedListDataSuite('Should only allow object for lookup', (context) => {
	const key = { group: 'name', item: 'id', lookup: 'lookup_id' }

	try {
		new NestedListData([], key)
	} catch (err) {
		assert.instance(err, TypeError)
		assert.match(err.message, 'Expected lookup to be an object')
	}

	try {
		new NestedListData([], key, [])
	} catch (err) {
		assert.instance(err, TypeError)
		assert.match(err.message, 'Expected lookup to be an object')
	}
})
NestedListDataSuite('Should initialize with valid options', () => {
	const key = { group: 'name', item: 'id', lookup: 'lookup_id' }

	let list = new NestedListData([], key, {})
	assert.equal(list.data, [])
	assert.equal(list.key, key)
	assert.equal(list.lookup, {})
})
NestedListDataSuite(
	'Should throw error if invalid item is provided to findIndex',
	(context) => {
		context.invalidItem.forEach(({ data, lookup, key, items }) => {
			let list = new NestedListData(data, key, lookup)
			items.map(({ item, expected }, index) => {
				assert.throws(
					() => list.findIndex(item),
					(err) => err instanceof TypeError,
					`Invalid item for key ${key.item} test ${index}`
				)
				assert.throws(
					() => list.findIndex(item),
					expected,
					`Invalid item for key ${key.item} test ${index}`
				)
			})
		})
	}
)
NestedListDataSuite(
	'Should throw error if invalid item is provided to add',
	(context) => {
		context.invalidItem.forEach(({ data, lookup, key, items }) => {
			let list = new NestedListData(data, key, lookup)
			items.map(({ item, expected }, index) => {
				assert.throws(
					() => list.add(item),
					(err) => err instanceof TypeError,
					`Invalid item for key ${key.item} test ${index}`
				)
				assert.throws(
					() => list.add(item),
					expected,
					`Invalid item for key ${key.item} test ${index}`
				)
			})
		})
	}
)
NestedListDataSuite(
	'Should throw error if invalid item is provided to remove',
	(context) => {
		context.invalidItem.forEach(({ data, lookup, key, items }) => {
			let list = new NestedListData(data, key, lookup)
			items.map(({ item, expected }, index) => {
				assert.throws(
					() => list.remove(item),
					(err) => err instanceof TypeError,
					`Invalid item for key ${key.item} test ${index}`
				)
				assert.throws(
					() => list.remove(item),
					expected,
					`Invalid item for key ${key.item} test ${index}`
				)
			})
		})
	}
)
NestedListDataSuite(
	'Should throw error if invalid item is provided to modify',
	(context) => {
		context.invalidItem.forEach(({ data, lookup, key, items }) => {
			let list = new NestedListData(data, key, lookup)
			items.map(({ item, expected }, index) => {
				assert.throws(
					() => list.modify(item),
					(err) => err instanceof TypeError,
					`Invalid item for key ${key.item} test ${index}`
				)
				assert.throws(
					() => list.modify(item),
					expected,
					`Invalid item for key ${key.item} test ${index}`
				)
			})
		})

		let list = new NestedListData(context.data, context.key, context.lookup)
		let item = { ...list.data[0].items[0] }

		assert.throws(() => list.modify(item), /Only selected item can be modified/)
		list.selected = item
		item.id = 2
		// console.log()
		assert.throws(() => list.modify(item), /Only selected item can be modified/)
	}
)
NestedListDataSuite(
	'Should throw error if invalid item is provided to select',
	(context) => {
		context.invalidItem.forEach(({ key, items }) => {
			let list = new NestedListData(context.data, key, context.lookup)
			// nulls are allowed in select to reset selection
			items.slice(2).map(({ item, expected }, index) => {
				assert.throws(
					() => (list.selected = item),
					(err) => err instanceof TypeError,
					`Invalid item for key ${key.item} test ${index}`
				)
				assert.throws(
					() => (list.selected = item),
					expected,
					`Invalid item for key ${key.item} test ${index}`
				)
			})
		})
	}
)
NestedListDataSuite('Should find an item using key', (context) => {
	let list = new NestedListData(context.data, context.key, context.lookup)

	list.data.map((g, i) => {
		g.items.map((item) => assert.equal(list.findGroupIndex(item), i))
	})

	list.data.map((g, i) => {
		g.items.map((item, j) => assert.equal(list.findIndex(item), [i, j]))
	})

	assert.equal(list.findIndex({ id: 10, lookup_id: 3 }), [-1, -1])
})
NestedListDataSuite('Should add a group', (context) => {
	let data = JSON.parse(JSON.stringify(context.data))
	let list = new NestedListData(data, context.key, context.lookup)

	assert.equal(list.data.length, 2)
	assert.equal(Object.keys(list.lookup).length, 2)
	list.addGroup('Three', 3)
	assert.equal(list.data.length, 3)
	assert.equal(list.data[2].name, 'Three')
	assert.equal(list.data[2].items, [])
	assert.equal(Object.keys(list.lookup).length, 3)
	assert.equal(list.lookup[3], 'Three')

	assert.throws(() => list.addGroup('Four', 3), /Group already exists/)
})
NestedListDataSuite('Should add an item', (context) => {
	let data = JSON.parse(JSON.stringify(context.data))
	let list = new NestedListData(data, context.key, context.lookup)
	let item = { name: 'whiskey', id: 8, lookup_id: 1 }

	list.add(item)
	assert.equal(list.data[0].items.length, 4)
	assert.equal(list.data[0].items[3], item)

	item.name = 'tango'
	assert.throws(() => list.add(item), /Cannot add item with existing key/)
	item.lookup_id = 4
	assert.throws(
		() => list.add(item),
		/Cannot add item to unknown group. Add group first/
	)
	item.lookup_id = 2
	list.add(item)
	assert.equal(list.data[1].items.length, 4)
	assert.equal(list.data[1].items[3], item)
})
NestedListDataSuite('Should modify an item using key', (context) => {
	let data = JSON.parse(JSON.stringify(context.data))
	let list = new NestedListData(data, context.key, context.lookup)
	let item = { name: 'whiskey', id: 3, lookup_id: 1 }
	list.selected = list.data[0].items[2]

	list.modify(item)
	assert.equal(list.data[0].items.length, 3)
	assert.equal(list.data[0].items[2], item)

	item.lookup_id = 2
	list.modify(item)
	assert.equal(list.data[0].items.length, 2)
	assert.equal(list.data[1].items.length, 4)
	assert.equal(list.data[1].items[3], item)
})
NestedListDataSuite('Should remove an item using key', (context) => {
	let data = JSON.parse(JSON.stringify(context.data))
	let list = new NestedListData(data, context.key, context.lookup)

	assert.equal(list.data[0].items.length, 3)
	list.remove(list.data[0].items[0])
	assert.equal(list.data[0].items.length, 2)
	list.selected = list.data[0].items[0]
	list.remove()
	assert.equal(list.data[0].items.length, 1)
})
NestedListDataSuite('Should select an item using key', (context) => {
	let data = JSON.parse(JSON.stringify(context.data))
	let list = new NestedListData(data, context.key, context.lookup)

	assert.equal(list.selected, null)
	list.selected = { id: 1, lookup_id: 1 }
	assert.equal(list.selected, list.data[0].items[0])
	list.selected = null
	assert.equal(list.selected, null)
})

NestedListDataSuite.run()
