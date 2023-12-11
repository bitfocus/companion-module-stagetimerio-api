/**
 * Enum of allowed variables
 *
 * @readonly
 * @enum {string}
 */
export const variableType = {
  roomId: 'roomId',
  roomName: 'roomName',
  roomTimezone: 'roomTimezone',

  currentTimerId: 'currentTimerId',
  currentTimerName: 'currentTimerName',
  currentTimerSpeaker: 'currentTimerSpeaker',
  currentTimerNotes: 'currentTimerNotes',

  currentTimerDuration: 'currentTimerDuration',
  currentTimerDurationAsMs: 'currentTimerDurationAsMs',

  currentTimerAppearance: 'currentTimerAppearance',

  currentTimerRemaining: 'currentTimerRemaining',
  currentTimerRemainingAsMs: 'currentTimerRemainingAsMs',
  currentTimerRemainingHours: 'currentTimerRemainingHours',
  currentTimerRemainingMinutes: 'currentTimerRemainingMinutes',
  currentTimerRemainingSeconds: 'currentTimerRemainingSeconds',
}

/** @type {CompanionVariableDefinition[]} */
const variables = [
  { variableId: variableType.roomId, name: 'Room ID' },
  { variableId: variableType.roomName, name: 'Room name' },
  { variableId: variableType.roomTimezone, name: 'Room timezone' },

  { variableId: variableType.currentTimerId, name: 'Timer ID' },
  { variableId: variableType.currentTimerName, name: 'Timer name' },
  { variableId: variableType.currentTimerSpeaker, name: 'Timer speaker' },
  { variableId: variableType.currentTimerNotes, name: 'Timer notes' },

  { variableId: variableType.currentTimerDuration, name: 'Timer duration' },
  { variableId: variableType.currentTimerDurationAsMs, name: 'Timer duration (ms)' },

  { variableId: variableType.currentTimerAppearance, name: 'Timer appearance' },

  { variableId: variableType.currentTimerRemaining, name: 'Timer remaining time' },
  { variableId: variableType.currentTimerRemainingAsMs, name: 'Timer remaining time (ms)' },
  { variableId: variableType.currentTimerRemainingHours, name: 'Timer remaining time (hours)' },
  { variableId: variableType.currentTimerRemainingMinutes, name: 'Timer remaining time (minutes)' },
  { variableId: variableType.currentTimerRemainingSeconds, name: 'Timer remaining time (seconds)' },
]

/**
 * @param { ModuleInstance } instance
 * @returns {void}
 */
export function loadVariables (instance) {
  instance.setVariableDefinitions(variables)
}
