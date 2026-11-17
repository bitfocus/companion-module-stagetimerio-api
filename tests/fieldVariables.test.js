import { describe, test } from 'node:test'
import { deepEqual, equal } from 'node:assert/strict'

import {
  buildCurrentFieldValues,
  buildNextFieldValues,
  fieldVariableDefinitions,
  slugifyFieldKey,
  toVariableValue,
} from '../src/fieldVariables.js'

describe('fieldVariables.slugifyFieldKey', () => {
  test('makes a valid Companion ID', () => {
    equal(slugifyFieldKey('VT image'), 'vt_image')
    equal(slugifyFieldKey('  auto-go!  '), 'auto_go')
    equal(slugifyFieldKey('Größe'), 'gro_e')
    equal(slugifyFieldKey('Café'), 'cafe')
  })

  test('is empty when no usable character remains', () => {
    equal(slugifyFieldKey('日本語'), '')
  })
})

describe('fieldVariables.toVariableValue', () => {
  test('keeps scalars', () => {
    equal(toVariableValue('a'), 'a')
    equal(toVariableValue(14), 14)
    equal(toVariableValue(false), false)
    equal(toVariableValue(0), 0)
  })

  test('turns nested values into a JSON string', () => {
    equal(toVariableValue([{ name: 'Intro', at: 2 }]), '[{"name":"Intro","at":2}]')
    equal(toVariableValue({ a: 1 }), '{"a":1}')
  })

  test('turns null into undefined', () => {
    equal(toVariableValue(null), undefined)
  })
})

describe('fieldVariables.fieldVariableDefinitions', () => {
  test('defines a current and a next variable for each slug', () => {
    deepEqual(fieldVariableDefinitions(new Set(['vlc'])).map((d) => d.variableId), [
      'currentTimerField.vlc',
      'nextTimerField.vlc',
    ])
  })
})

describe('fieldVariables.buildCurrentFieldValues', () => {
  test('reports new slugs and sets their values', () => {
    const { newSlugs, values } = buildCurrentFieldValues(new Set(), { 'VT image': 'a.png', vlc: 14 })
    deepEqual(newSlugs, ['vt_image', 'vlc'])
    deepEqual(values, { 'currentTimerField.vt_image': 'a.png', 'currentTimerField.vlc': 14 })
  })

  test('clears a known key the timer does not have', () => {
    const { newSlugs, values } = buildCurrentFieldValues(new Set(['vlc', 'old']), { vlc: 14 })
    deepEqual(newSlugs, [])
    deepEqual(values, { 'currentTimerField.vlc': 14, 'currentTimerField.old': undefined })
  })

  test('clears all known keys when the timer has no fields', () => {
    deepEqual(buildCurrentFieldValues(new Set(['vlc']), undefined).values, { 'currentTimerField.vlc': undefined })
    deepEqual(buildCurrentFieldValues(new Set(['vlc']), {}).values, { 'currentTimerField.vlc': undefined })
  })

  test('skips a key without a usable slug', () => {
    deepEqual(buildCurrentFieldValues(new Set(), { '日本語': 'x' }), { newSlugs: [], values: {} })
  })
})

describe('fieldVariables.buildNextFieldValues', () => {
  test('uses the next timer prefix', () => {
    deepEqual(buildNextFieldValues(new Set(), { vlc: 14 }).values, { 'nextTimerField.vlc': 14 })
  })
})
