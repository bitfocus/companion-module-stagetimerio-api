/**
 * Enum of allowed variables
 *
 * @readonly
 * @enum {string}
 */
export const variableType = {
  // Room
  roomId: 'roomId',
  roomName: 'roomName',
  roomTimezone: 'roomTimezone',

  // Playback Snapshot
  timeDisplay: 'timeDisplay',
  timeDisplayHours: 'timeDisplayHours',
  timeDisplayMinutes: 'timeDisplayMinutes',
  timeDisplaySeconds: 'timeDisplaySeconds',
  currentTimerRemaining: 'currentTimerRemaining',
  currentTimerRemainingAsMs: 'currentTimerRemainingAsMs',
  currentTimerRemainingHours: 'currentTimerRemainingHours',
  currentTimerRemainingMinutes: 'currentTimerRemainingMinutes',
  currentTimerRemainingSeconds: 'currentTimerRemainingSeconds',

  // Current Timer
  currentTimerId: 'currentTimerId',
  currentTimerName: 'currentTimerName',
  currentTimerSpeaker: 'currentTimerSpeaker',
  currentTimerNotes: 'currentTimerNotes',
  currentTimerAppearance: 'currentTimerAppearance',
  currentTimerStartTime12h: 'currentTimerStartTime12h',
  currentTimerStartTime24h: 'currentTimerStartTime24h',

  currentTimerDuration: 'currentTimerDuration',
  currentTimerDurationAsMs: 'currentTimerDurationAsMs',
  currentTimerLabels: 'currentTimerLabels',
  currentTimerLabel1: 'currentTimerLabel1',
  currentTimerLabel2: 'currentTimerLabel2',
  currentTimerLabel3: 'currentTimerLabel3',

  // Next Timer
  nextTimerId: 'nextTimerId',
  nextTimerName: 'nextTimerName',
  nextTimerSpeaker: 'nextTimerSpeaker',
  nextTimerNotes: 'nextTimerNotes',
  nextTimerAppearance: 'nextTimerAppearance',
  nextTimerStartTime12h: 'nextTimerStartTime12h',
  nextTimerStartTime24h: 'nextTimerStartTime24h',

  nextTimerDuration: 'nextTimerDuration',
  nextTimerDurationAsMs: 'nextTimerDurationAsMs',
  nextTimerLabels: 'nextTimerLabels',
  nextTimerLabel1: 'nextTimerLabel1',
  nextTimerLabel2: 'nextTimerLabel2',
  nextTimerLabel3: 'nextTimerLabel3',
}

/** @type {CompanionVariableDefinition[]} */
const variables = [
  // Room
  { variableId: variableType.roomId, name: 'Room ID' },
  { variableId: variableType.roomName, name: 'Room name' },
  { variableId: variableType.roomTimezone, name: 'Room timezone' },

  // Playback Snapshot
  { variableId: variableType.timeDisplay, name: 'Formatted timer display' },
  { variableId: variableType.timeDisplayHours, name: 'Formatted timer display (hours)' },
  { variableId: variableType.timeDisplayMinutes, name: 'Formatted timer display (minutes)' },
  { variableId: variableType.timeDisplaySeconds, name: 'Formatted timer display (seconds)' },
  { variableId: variableType.currentTimerRemaining, name: 'Remaining time' },
  { variableId: variableType.currentTimerRemainingAsMs, name: 'Remaining time (ms)' },
  { variableId: variableType.currentTimerRemainingHours, name: 'Remaining time (hours)' },
  { variableId: variableType.currentTimerRemainingMinutes, name: 'Remaining time (minutes)' },
  { variableId: variableType.currentTimerRemainingSeconds, name: 'Remaining time (seconds)' },

  // Current Timer
  { variableId: variableType.currentTimerId, name: 'Current timer ID' },
  { variableId: variableType.currentTimerName, name: 'Current timer name' },
  { variableId: variableType.currentTimerSpeaker, name: 'Current timer speaker' },
  { variableId: variableType.currentTimerNotes, name: 'Current timer notes' },
  { variableId: variableType.currentTimerAppearance, name: 'Current timer appearance' },
  { variableId: variableType.currentTimerStartTime12h, name: 'Current timer start (12h format, event time zone)' },
  { variableId: variableType.currentTimerStartTime24h, name: 'Current timer start (24h format, event time zone)' },

  { variableId: variableType.currentTimerDuration, name: 'Current timer duration' },
  { variableId: variableType.currentTimerDurationAsMs, name: 'Current timer duration (ms)' },
  { variableId: variableType.currentTimerLabels, name: 'Current timer labels (comma-separated)' },
  { variableId: variableType.currentTimerLabel1, name: 'Current timer label 1' },
  { variableId: variableType.currentTimerLabel2, name: 'Current timer label 2' },
  { variableId: variableType.currentTimerLabel3, name: 'Current timer label 3' },

  // Next Timer
  { variableId: variableType.nextTimerId, name: 'Next timer ID' },
  { variableId: variableType.nextTimerName, name: 'Next timer name' },
  { variableId: variableType.nextTimerSpeaker, name: 'Next timer speaker' },
  { variableId: variableType.nextTimerNotes, name: 'Next timer notes' },
  { variableId: variableType.nextTimerAppearance, name: 'Next timer appearance' },
  { variableId: variableType.nextTimerStartTime12h, name: 'Next timer start (12h format, event time zone)' },
  { variableId: variableType.nextTimerStartTime24h, name: 'Next timer start (24h format, event time zone)' },

  { variableId: variableType.nextTimerDuration, name: 'Next timer duration' },
  { variableId: variableType.nextTimerDurationAsMs, name: 'Next timer duration (ms)' },
  { variableId: variableType.nextTimerLabels, name: 'Next timer labels (comma-separated)' },
  { variableId: variableType.nextTimerLabel1, name: 'Next timer label 1' },
  { variableId: variableType.nextTimerLabel2, name: 'Next timer label 2' },
  { variableId: variableType.nextTimerLabel3, name: 'Next timer label 3' },
]

/**
 * @param { ModuleInstance } instance
 * @returns {void}
 */
export function loadVariables (instance) {
  instance.setVariableDefinitions(variables)
}
