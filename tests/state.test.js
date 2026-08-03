import { describe, test } from 'node:test'
import { equal } from 'node:assert/strict'

import { getTimerPhase, initialState, updateMessageState } from '../src/state.js'
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

describe('message state', () => {

  /** Minimal stand-in for the module instance, capturing the variable values */
  function createInstance () {
    return {
      state: structuredClone(initialState),
      variables: /** @type {Record<string, any>} */ ({}),
      setVariableValues (values) { Object.assign(this.variables, values) },
      checkFeedbacks () {},
    }
  }

  const message = {
    _id: '63f59467d68bfdeef6b3bfc3',
    showing: true,
    text: 'Please wrap up',
    color: 'red',
    bold: true,
    uppercase: false,
  }

  test('exposes the message while it is showing', () => {
    const instance = createInstance()

    updateMessageState.call(instance, message)

    deepEqual(instance.variables, {
      currentMessageId: '63f59467d68bfdeef6b3bfc3',
      currentMessageText: 'Please wrap up',
      currentMessageColor: 'red',
    })
  })

  test('clears the variables once the message is hidden', () => {
    const instance = createInstance()

    updateMessageState.call(instance, message)
    updateMessageState.call(instance, { ...message, showing: false })

    deepEqual(instance.variables, {
      currentMessageId: '',
      currentMessageText: '',
      currentMessageColor: '',
    })

    // The state itself keeps the message, feedbacks and actions still need it
    equal(instance.state.message.text, 'Please wrap up')
  })

  test('seeds empty values when called without a message', () => {
    const instance = createInstance()

    updateMessageState.call(instance)

    deepEqual(instance.variables, {
      currentMessageId: '',
      currentMessageText: '',
      currentMessageColor: '',
    })
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
