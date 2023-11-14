import { describe, test } from 'node:test'
import { equal } from 'node:assert/strict'

import { getTimerPhase } from '../src/state.js'

const sec = /** @param {number} s */ s => s * 1000
const min = /** @param {number} m */ m => sec(m) * 60

describe('timer phases', () => {
  test('getTimerPhase - timer 1:00', () => {
    const yellowSec = 15, redSec = 3
    equal( getTimerPhase(min(1),  yellowSec, redSec), 'default'  )
    equal( getTimerPhase(sec(15), yellowSec, redSec), 'yellow'   )
    equal( getTimerPhase(sec(3),  yellowSec, redSec), 'red'      )
    equal( getTimerPhase(0,       yellowSec, redSec), 'zero'     )
    equal( getTimerPhase(min(-1), yellowSec, redSec), 'negative' )
  })

  test('getTimerPhase - timer 3:00', () => {
    const yellowSec = 60, redSec = 15
    equal( getTimerPhase(min(3),  yellowSec, redSec), 'default'  )
    equal( getTimerPhase(sec(60), yellowSec, redSec), 'yellow'   )
    equal( getTimerPhase(sec(15), yellowSec, redSec), 'red'      )
    equal( getTimerPhase(0,       yellowSec, redSec), 'zero'     )
    equal( getTimerPhase(min(-1), yellowSec, redSec), 'negative' )
  })
})
