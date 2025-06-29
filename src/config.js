import { createDropdownOptions } from './utils.js'

// Regular Expressions for validation
const roomIdRegExp = /^[A-Z0-9]{8}$/
const apiKeyRegExp = /^[a-f0-9-]{32}$/
const apiUrlRegExp = /^https?:\/\/.*(\/v1\/)$/

/** @type {StagetimerConfig} */
export const initialConfig = {
  roomId: '',
  apiKey: '',
  apiUrl: '',
}

/**
 * @param { StagetimerConfig } config
 * @returns {boolean}
 * @throws
 */
export function validateConfig (config) {

  if (
    roomIdRegExp.test(config.roomId)
    && apiKeyRegExp.test(config.apiKey)
    && apiUrlRegExp.test(config.apiUrl)
  ) {
    return true
  }

  throw new Error('Bad configuration! Please review module settings and try again.')
}

/**
 * @type { SomeCompanionConfigField[] }
 */
export const configFields = [
  {
    type: 'static-text',
    width: 12,
    id: 'info',
    label: 'Information',
    value: `<br />Remotely control <a href="https://stagetimer.io/" target="_blank">Stagetimer.io</a> using Companion.<br><br>
    Requires a Stagetimer.io account on a <b>paid plan</b> (<i>Pro</i> or <i>Premium</i>).<br><br>
    Enter your <b>Room ID</b> and <b>API key</b> below to get started.<br>
    You can generate an API key on the controller page.
    `,
  },
  {
    type: 'textinput',
    width: 4,
    id: 'roomId',
    label: 'Room ID',
    regex: roomIdRegExp.toString(),
    required: true,
    default: 'YOUR-ID',
  },
  {
    type: 'textinput',
    width: 8,
    id: 'apiKey',
    label: 'API Key',
    regex: apiKeyRegExp.toString(),
    required: true,
    default: 'YOUR-KEY',
  },
  {
    type: 'textinput',
    width: 12,
    id: 'apiUrl',
    label: 'API URL',
    regex: apiUrlRegExp.toString(),
    required: true,
    default: 'https://api.stagetimer.io/v1/',
  },
]


/**
 * Enum of valid message colors
 *
 * @readonly
 * @enum {string}
 */
export const messageColors = {
  white: 'white',
  green: 'green',
  red: 'red',
}

export const messageColorDropdownOptions = createDropdownOptions(messageColors)

/**
 * Enum of valid timer appearances
 *
 * @readonly
 * @enum {string}
 */
export const timerAppearances = {
  COUNTDOWN    : 'COUNTDOWN',
  COUNTUP      : 'COUNTUP',
  TOD          : 'TOD',
  COUNTDOWN_TOD: 'COUNTDOWN_TOD',
  COUNTUP_TOD  : 'COUNTUP_TOD',
  HIDDEN       : 'HIDDEN',
}

/**
 * Map timer appearances to a human-friendly label
 */
export const timerAppearancesLabels = {
  [timerAppearances.COUNTDOWN]    : 'Countdown',
  [timerAppearances.COUNTUP]      : 'Count Up',
  [timerAppearances.TOD]          : 'Time of Day',
  [timerAppearances.COUNTDOWN_TOD]: 'C/D + ToD',
  [timerAppearances.COUNTUP_TOD]  : 'C/U + ToD',
  [timerAppearances.HIDDEN]       : 'Hidden',
}


export const timerAppearanceDropdownOptions = createDropdownOptions(timerAppearancesLabels)

/**
 * Enum of valid timer types
 *
 * @readonly
 * @enum {string}
 */
export const timerTypes = {
  DURATION: 'DURATION',
  FINISH_TIME: 'FINISH_TIME',
}

export const timerTypesDropdownOptions = createDropdownOptions(timerTypes)

/**
 * Enum of valid timer trigger
 *
 * @readonly
 * @enum {string}
 */
export const timerTriggers = {
  MANUAL: 'MANUAL',
  LINKED: 'LINKED',
  SCHEDULED: 'SCHEDULED',
}

export const timerTriggersDropdownOptions = createDropdownOptions(timerTriggers)
