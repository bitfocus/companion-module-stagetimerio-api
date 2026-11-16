import { describe, test } from 'node:test'
import { equal } from 'node:assert/strict'

import { isLiveFreshStart } from '../src/startSignal.js'

const now = 1_800_000_000_000

describe('startSignal.isLiveFreshStart', () => {
  test('is true for a fresh start that just happened', () => {
    equal(isLiveFreshStart({ running: true, start: now, pause: now, server_time: now + 50 }, 0), true)
  })

  test('is true for a sync-to-clock start a bit in the future', () => {
    equal(isLiveFreshStart({ running: true, start: now + 400, pause: now + 400, server_time: now }, 0), true)
  })

  test('is false for a resume', () => {
    equal(isLiveFreshStart({ running: true, start: now - 30_000, pause: now - 10_000, server_time: now }, 0), false)
  })

  test('is false while stopped', () => {
    equal(isLiveFreshStart({ running: false, start: now, pause: now, server_time: now }, 0), false)
  })

  test('is false for a start that was seen before', () => {
    equal(isLiveFreshStart({ running: true, start: now, pause: now, server_time: now + 50 }, now), false)
  })

  test('is false for an old start, as on connect or reconnect', () => {
    equal(isLiveFreshStart({ running: true, start: now, pause: now, server_time: now + 30_000 }, 0), false)
  })
})
