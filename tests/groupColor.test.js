import { test, describe } from 'node:test'
import { equal } from 'node:assert/strict'
import { combineRgb } from '@companion-module/base'
import { hexToCompanionColor } from '../src/groupColor.js'

describe('hexToCompanionColor', () => {
  test('converts a hex color', () => {
    equal(hexToCompanionColor('#7c3aed'), combineRgb(0x7c, 0x3a, 0xed))
  })

  test('is null without a valid hex color', () => {
    equal(hexToCompanionColor(null), null)
    equal(hexToCompanionColor(undefined), null)
    equal(hexToCompanionColor('violet'), null)
  })
})
