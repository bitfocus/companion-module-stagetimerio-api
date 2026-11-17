import { describe, test } from 'node:test'
import { equal, deepEqual } from 'node:assert/strict'

import { formatTimeDisplay, dhmsToFormatted } from '../src/utils/index.js'
import { formatTod } from '../src/utils/formatTod.js'
import { millisecondsToDhms } from '../src/timeutils/index.js'
import { timerAppearances } from '../src/config.js'

const sec = /** @param {number} s */ s => s * 1000
const min = /** @param {number} m */ m => sec(m) * 60

const timeset = /** @param {number} remainingAsMs */ remainingAsMs => /** @type {any} */({ totalAsMs: min(5), remainingAsMs })

describe('formatTod', () => {
  // 2026-11-17 14:05:09 UTC = 15:05:09 in Berlin
  const date = new Date('2026-11-17T14:05:09Z')
  const timezone = 'Europe/Berlin'

  test('date-fns formats', () => {
    equal(formatTod(date, { timezone, todFormat: 'H:mm:ss' }), '15:05:09')
    equal(formatTod(date, { timezone, todFormat: 'H:mm' }), '15:05')
    equal(formatTod(date, { timezone, todFormat: 'h:mm:ss aa' }), '3:05:09 PM')
    equal(formatTod(date, { timezone, todFormat: 'h:mm aa' }), '3:05 PM')
    equal(formatTod(date, { timezone, todFormat: 'h:mm:ss' }), '3:05:09')
    equal(formatTod(date, { timezone, todFormat: 'h:mm' }), '3:05')
  })

  test('zero-padded hours', () => {
    const morning = new Date('2026-11-17T06:05:09Z')
    equal(formatTod(morning, { timezone, todFormat: 'HH:mm:ss' }), '07:05:09')
    equal(formatTod(morning, { timezone, todFormat: 'HH:mm' }), '07:05')
    equal(formatTod(morning, { timezone, todFormat: 'H:mm:ss' }), '7:05:09')
  })

  test('midnight', () => {
    const midnight = new Date('2026-11-17T23:00:00Z')
    equal(formatTod(midnight, { timezone, todFormat: 'H:mm:ss' }), '0:00:00')
    equal(formatTod(midnight, { timezone, todFormat: 'h:mm aa' }), '12:00 AM')
  })

  test('never empty: no format, no timezone, unknown timezone', () => {
    equal(formatTod(date, { todFormat: '', h12: false }), '14:05:09')
    equal(formatTod(date, { timezone: '', todFormat: undefined, h12: false }), '14:05:09')
    equal(formatTod(date, { timezone: 'Not/AZone', todFormat: 'H:mm', h12: false }), '14:05')
  })

  test('AUTO follows h12', () => {
    equal(formatTod(date, { timezone, todFormat: 'AUTO', h12: false }), '15:05:09')
    equal(formatTod(date, { timezone, todFormat: 'AUTO', h12: true }), '3:05:09 PM')
    equal(formatTod(date, { timezone, todFormat: 'AUTO_HHMM', h12: false }), '15:05')
    equal(formatTod(date, { timezone, todFormat: 'AUTO_HHMM', h12: true }), '3:05 PM')
  })
})

describe('formatTimeDisplay overtime', () => {
  test('continue counts into overtime with the prefix', () => {
    equal(formatTimeDisplay(timeset(-sec(75))).display, '+1:15')
    equal(formatTimeDisplay(timeset(-sec(75)), { overtimePrefix: '-' }).display, '-1:15')
    equal(formatTimeDisplay(timeset(sec(75)), { overtimePrefix: '-' }).display, '1:15')
  })

  test('stop holds the countdown at zero and the count-up at the total', () => {
    deepEqual(formatTimeDisplay(timeset(-sec(75)), { overtimeBehavior: 'stop' }),
      { display: '0:00', displayHours: '0', displayMinutes: '0', displaySeconds: '00' })
    equal(formatTimeDisplay(timeset(-sec(75)), { overtimeBehavior: 'stop', appearance: timerAppearances.COUNTUP }).display, '5:00')
  })

  test('hide leaves all four variables empty in overtime only', () => {
    const empty = { display: '', displayHours: '', displayMinutes: '', displaySeconds: '' }
    deepEqual(formatTimeDisplay(timeset(-sec(75)), { overtimeBehavior: 'hide' }), empty)
    deepEqual(formatTimeDisplay(timeset(-sec(75)), { overtimeBehavior: 'hide', appearance: timerAppearances.COUNTUP }), empty)
    equal(formatTimeDisplay(timeset(sec(75)), { overtimeBehavior: 'hide' }).display, '1:15')
  })

  test('the count-up runs on past the total without a prefix', () => {
    equal(formatTimeDisplay(timeset(-sec(75)), { appearance: timerAppearances.COUNTUP, overtimePrefix: '-' }).display, '6:15')
  })
})

describe('dhmsToFormatted overtime prefix', () => {
  test('uses the prefix for negative durations only', () => {
    equal(dhmsToFormatted(millisecondsToDhms(-sec(75))).human, '+0:01:15')
    equal(dhmsToFormatted(millisecondsToDhms(-sec(75)), '-').human, '-0:01:15')
    equal(dhmsToFormatted(millisecondsToDhms(sec(75)), '-').human, '0:01:15')
  })
})
