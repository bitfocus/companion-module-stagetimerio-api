import { describe, test } from 'node:test'
import { equal } from 'node:assert/strict'

import { createEmptyTimerState, getTimerPhase, initialState, updateConnectionState, updateCurrentTimerState, updateMessageState, updateNextTimerState, updateStartSignal } from '../src/state.js'
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
      setVariableDefinitions (definitions) { this.definitions = definitions },
      fieldSlugs: new Set(),
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
      setVariableDefinitions (definitions) { this.definitions = definitions },
      fieldSlugs: new Set(),
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
      nextTimerIndex: '',
      nextTimerGroup: '',
      nextTimerGroupId: '',
      nextTimerGroupColor: '',
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
      nextTimerFields: '',
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

describe('state timer fields', () => {
  function createInstance () {
    return {
      state: structuredClone(initialState),
      variables: {},
      definitions: [],
      fieldSlugs: new Set(),
      setVariableValues (values) { Object.assign(this.variables, values) },
      setVariableDefinitions (definitions) { this.definitions = definitions },
      checkFeedbacks () {},
      log () {},
    }
  }

  test('defines a variable for a new key and sets its value', () => {
    const instance = createInstance()
    updateNextTimerState.call(instance, { ...createEmptyTimerState(), fields: { 'VT image': 'a.png' } })
    equal(instance.variables['nextTimerField.vt_image'], 'a.png')
    const ids = instance.definitions.map((definition) => definition.variableId)
    equal(ids.includes('nextTimerField.vt_image'), true)
    equal(ids.includes('currentTimerField.vt_image'), true)
    equal(ids.includes('nextTimerName'), true)
  })

  test('clears the value but keeps the definition on a timer without the key', () => {
    const instance = createInstance()
    updateNextTimerState.call(instance, { ...createEmptyTimerState(), fields: { vlc: 14 } })
    updateNextTimerState.call(instance, { ...createEmptyTimerState(), fields: { other: 1 } })
    equal(instance.variables['nextTimerField.vlc'], undefined)
    equal(instance.variables['nextTimerField.other'], 1)
    equal(instance.definitions.some((definition) => definition.variableId === 'nextTimerField.vlc'), true)
  })

  test('clears the value when the empty state replaces the timer', () => {
    const instance = createInstance()
    updateNextTimerState.call(instance, { ...createEmptyTimerState(), fields: { vlc: 14 } })
    updateNextTimerState.call(instance, createEmptyTimerState())
    equal(instance.variables['nextTimerField.vlc'], undefined)
  })
})

describe('connection state', () => {
  test('sets the connected variable', () => {
    const instance = {
      state: structuredClone(initialState),
      variables: {},
      setVariableValues (values) { Object.assign(this.variables, values) },
      checkFeedbacks () {},
    }
    updateConnectionState.call(instance, true)
    equal(instance.variables.connected, true)
    updateConnectionState.call(instance, false)
    equal(instance.variables.connected, false)
  })
})

describe('start signal', () => {
  const now = 1_800_000_000_000

  function createInstance () {
    return {
      state: structuredClone(initialState),
      variables: {},
      definitions: [],
      fieldSlugs: new Set(),
      setVariableValues (values) { Object.assign(this.variables, values) },
      setVariableDefinitions (definitions) { this.definitions = definitions },
      checkFeedbacks () {},
    }
  }

  const status = (timer_id) => ({ timer_id, running: true, start: now, pause: now, finish: now + 60_000, server_time: now + 50 })

  test('sets lastStartedAt at once when the started timer is the current timer', () => {
    const instance = createInstance()
    updateCurrentTimerState.call(instance, { ...createEmptyTimerState(), _id: 'a' })
    updateStartSignal.call(instance, status('a'))
    equal(instance.variables.lastStartedAt, now)
  })

  test('waits for the current timer event when the start changes the timer', () => {
    const instance = createInstance()
    updateCurrentTimerState.call(instance, { ...createEmptyTimerState(), _id: 'a' })
    updateStartSignal.call(instance, status('b'))
    equal(instance.variables.lastStartedAt, undefined)
    updateCurrentTimerState.call(instance, { ...createEmptyTimerState(), _id: 'b', fields: { vt: 'b.mp4' } })
    equal(instance.variables.lastStartedAt, now)
    equal(instance.variables['currentTimerField.vt'], 'b.mp4')
  })

  test('sets lastStartedAt only once for a repeated status', () => {
    const instance = createInstance()
    updateCurrentTimerState.call(instance, { ...createEmptyTimerState(), _id: 'a' })
    updateStartSignal.call(instance, status('a'))
    instance.variables.lastStartedAt = undefined
    updateStartSignal.call(instance, status('a'))
    equal(instance.variables.lastStartedAt, undefined)
  })
})

describe('timer fields as JSON', () => {
  test('sets the whole fields object as a JSON string', () => {
    const instance = {
      state: structuredClone(initialState),
      variables: {},
      fieldSlugs: new Set(),
      setVariableValues (values) { Object.assign(this.variables, values) },
      setVariableDefinitions () {},
      checkFeedbacks () {},
    }
    updateNextTimerState.call(instance, { ...createEmptyTimerState(), fields: { 'Größe': 'XL', vlc: 14 } })
    equal(instance.variables.nextTimerFields, '{"Größe":"XL","vlc":14}')
    updateNextTimerState.call(instance, createEmptyTimerState())
    equal(instance.variables.nextTimerFields, '')
  })
})

describe('timer index', () => {
  test('sets the number as the controller shows it', () => {
    const instance = {
      state: structuredClone(initialState),
      variables: {},
      fieldSlugs: new Set(),
      setVariableValues (values) { Object.assign(this.variables, values) },
      setVariableDefinitions () {},
      checkFeedbacks () {},
    }
    updateNextTimerState.call(instance, { ...createEmptyTimerState(), index: '2.1' })
    equal(instance.variables.nextTimerIndex, '2.1')
  })
})

describe('timer group', () => {
  test('sets the group title and ID, and clears them outside a group', () => {
    const instance = {
      state: structuredClone(initialState),
      variables: {},
      fieldSlugs: new Set(),
      setVariableValues (values) { Object.assign(this.variables, values) },
      setVariableDefinitions () {},
      checkFeedbacks () {},
    }
    updateNextTimerState.call(instance, { ...createEmptyTimerState(), group: { _id: 'g1', title: 'Keynotes', color: '#9f1239' } })
    equal(instance.variables.nextTimerGroup, 'Keynotes')
    equal(instance.variables.nextTimerGroupId, 'g1')
    equal(instance.variables.nextTimerGroupColor, '#9f1239')
    updateNextTimerState.call(instance, { ...createEmptyTimerState(), group: null })
    equal(instance.variables.nextTimerGroup, '')
    equal(instance.variables.nextTimerGroupId, '')
    equal(instance.variables.nextTimerGroupColor, '')
  })

  test('is empty when an older server sends no group key', () => {
    const instance = {
      state: structuredClone(initialState),
      variables: {},
      fieldSlugs: new Set(),
      setVariableValues (values) { Object.assign(this.variables, values) },
      setVariableDefinitions () {},
      checkFeedbacks () {},
    }
    const { group: _group, ...olderPayload } = createEmptyTimerState()
    updateCurrentTimerState.call(instance, { ...olderPayload, _id: 'a', name: 'Intro', group: undefined })
    equal(instance.variables.currentTimerGroup, '')
    equal(instance.variables.currentTimerGroupId, '')
    equal(instance.variables.currentTimerGroupColor, '')
    equal(instance.variables.currentTimerName, 'Intro')
  })
})
