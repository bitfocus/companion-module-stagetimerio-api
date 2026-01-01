import { describe, test } from 'node:test'
import { equal } from 'node:assert/strict'

import { getTimerPhase } from '../src/state.js'
import { deepEqual } from 'node:assert'
import { createDropdownOptions } from '../src/utils/index.js'
import { timerTriggers } from '../src/config.js'

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

describe('enums', () => {

  test('create action dropdown options from triggers enum', () => {

    deepEqual(
      createDropdownOptions(timerTriggers),
      [
        { id: 0, label: '(Default)' },
        { id: 'MANUAL', label: 'MANUAL' },
        { id: 'LINKED', label: 'LINKED' },
        { id: 'SCHEDULED', label: 'SCHEDULED' },
      ],
    )
  })

})
