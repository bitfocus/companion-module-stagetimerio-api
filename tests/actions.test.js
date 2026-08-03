import { describe, test } from 'node:test'
import { deepEqual } from 'node:assert/strict'

import { assignTruthyOptionsToParams, resolveTargetParams } from '../src/actions.js'

/** Helper mirroring what sendActionToApi() does with the action options */
function toParams (options) {
  const params = assignTruthyOptionsToParams(options)
  resolveTargetParams(params)
  return params
}

describe('actions.assignTruthyOptionsToParams', () => {
  test('filters undefined, null and false values', () => {
    deepEqual(
      assignTruthyOptionsToParams({ name: undefined, notes: null, focus: false, autostart: true, amount: '5s' }),
      { autostart: true, amount: '5s' },
    )
  })

  test('keeps empty strings, they are a valid value for text fields', () => {
    deepEqual(assignTruthyOptionsToParams({ text: '', name: '' }), { text: '', name: '' })
  })
})

describe('actions.resolveTargetParams', () => {
  test('timer ID takes precedence over index', () => {
    deepEqual(
      toParams({ index: '1', timer_id: '63f59467d68bfdeef6b3bfc3' }),
      { timer_id: '63f59467d68bfdeef6b3bfc3' },
    )
  })

  test('index is used when no timer ID is set', () => {
    deepEqual(toParams({ index: '4', timer_id: '' }), { index: '4' })
  })

  test('whitespace-only values are dropped', () => {
    deepEqual(toParams({ index: '1', timer_id: '  ' }), { index: '1' })
    deepEqual(toParams({ index: ' ', timer_id: ' abc ' }), { timer_id: 'abc' })
  })

  test('message ID takes precedence over index', () => {
    deepEqual(
      toParams({ index: '2', message_id: '63f59467d68bfdeef6b3bfc3', focus: true }),
      { message_id: '63f59467d68bfdeef6b3bfc3', focus: true },
    )
  })

  test('numeric index from actions saved before v2.6.0 still works', () => {
    deepEqual(toParams({ index: 1, timer_id: '' }), { index: 1 })
    deepEqual(toParams({ index: 1, timer_id: 'abc' }), { timer_id: 'abc' })
  })

  test('leaves other empty text fields untouched', () => {
    deepEqual(toParams({ index: '1', name: '', notes: '' }), { index: '1', name: '', notes: '' })
  })
})
