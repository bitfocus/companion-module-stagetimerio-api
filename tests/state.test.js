import { describe, test } from 'node:test'
import { equal } from 'node:assert/strict'

import { createEmptyTimerState, getTimerPhase, initialState, updateMessageState, updateNextTimerState } from '../src/state.js'
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

describe('next timer state', () => {

  /** Minimal stand-in for the module instance, capturing the variable values */
  function createInstance () {
    return {
      state: structuredClone(initialState),
      variables: /** @type {Record<string, any>} */ ({}),
      setVariableValues (values) { Object.assign(this.variables, values) },
      checkFeedbacks () {},
    }
  }

  const timer = {
    _id: '63a422789477ef3e82c3597b',
    name: 'Introduction',
    speaker: 'Tom',
    notes: 'Keep it short',
    duration: '0:05:00',
    appearance: 'COUNTDOWN',
    wrap_up_yellow: 60,
    wrap_up_red: 15,
    start_time: '',
    start_time_uses_date: false,
    labels: [{ name: 'VT', color: '#F44336' }],
  }

  test('exposes the next timer', () => {
    const instance = createInstance()

    updateNextTimerState.call(instance, timer)

    equal(instance.variables.nextTimerId, '63a422789477ef3e82c3597b')
    equal(instance.variables.nextTimerName, 'Introduction')
    equal(instance.variables.nextTimerDurationAsMs, min(5))
  })

  // The socket sends a null payload once the last timer is selected
  test('clears the variables when there is no next timer', () => {
    const instance = createInstance()

    updateNextTimerState.call(instance, timer)
    updateNextTimerState.call(instance, createEmptyTimerState())

    deepEqual(instance.variables, {
      nextTimerId: '',
      nextTimerName: '',
      nextTimerNotes: '',
      nextTimerSpeaker: '',
      nextTimerDuration: '',
      nextTimerDurationAsMs: '',
      nextTimerAppearance: '',
      nextTimerStartTime12h: '',
      nextTimerStartTime24h: '',
      nextTimerLabels: '',
      nextTimerLabel1: '',
      nextTimerLabel2: '',
      nextTimerLabel3: '',
    })
  })

  test('empty timer states do not share a labels array', () => {
    const a = createEmptyTimerState()
    const b = createEmptyTimerState()

    a.labels.push({ name: 'VT', color: '#F44336' })

    equal(b.labels.length, 0)
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
