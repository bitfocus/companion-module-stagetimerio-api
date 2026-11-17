import { fieldVariableDefinitions } from './fieldVariables.js'

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
  timeOfDay: 'timeOfDay',
  connected: 'connected',

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
  running: 'running',
  lastStartedAt: 'lastStartedAt',

  // Current Timer
  currentTimerId: 'currentTimerId',
  currentTimerName: 'currentTimerName',
  currentTimerIndex: 'currentTimerIndex',
  currentTimerGroup: 'currentTimerGroup',
  currentTimerGroupId: 'currentTimerGroupId',
  currentTimerGroupColor: 'currentTimerGroupColor',
  currentTimerSpeaker: 'currentTimerSpeaker',
  currentTimerNotes: 'currentTimerNotes',
  currentTimerAppearance: 'currentTimerAppearance',
  currentTimerStartTime: 'currentTimerStartTime',
  currentTimerStartTime12h: 'currentTimerStartTime12h',
  currentTimerStartTime24h: 'currentTimerStartTime24h',

  currentTimerDuration: 'currentTimerDuration',
  currentTimerDurationAsMs: 'currentTimerDurationAsMs',
  currentTimerLabels: 'currentTimerLabels',
  currentTimerLabel1: 'currentTimerLabel1',
  currentTimerLabel2: 'currentTimerLabel2',
  currentTimerLabel3: 'currentTimerLabel3',
  currentTimerFields: 'currentTimerFields',

  // Next Timer
  nextTimerId: 'nextTimerId',
  nextTimerName: 'nextTimerName',
  nextTimerIndex: 'nextTimerIndex',
  nextTimerGroup: 'nextTimerGroup',
  nextTimerGroupId: 'nextTimerGroupId',
  nextTimerGroupColor: 'nextTimerGroupColor',
  nextTimerSpeaker: 'nextTimerSpeaker',
  nextTimerNotes: 'nextTimerNotes',
  nextTimerAppearance: 'nextTimerAppearance',
  nextTimerStartTime: 'nextTimerStartTime',
  nextTimerStartTime12h: 'nextTimerStartTime12h',
  nextTimerStartTime24h: 'nextTimerStartTime24h',

  nextTimerDuration: 'nextTimerDuration',
  nextTimerDurationAsMs: 'nextTimerDurationAsMs',
  nextTimerLabels: 'nextTimerLabels',
  nextTimerLabel1: 'nextTimerLabel1',
  nextTimerLabel2: 'nextTimerLabel2',
  nextTimerLabel3: 'nextTimerLabel3',
  nextTimerFields: 'nextTimerFields',

  // Current Message
  currentMessageId: 'currentMessageId',
  currentMessageText: 'currentMessageText',
  currentMessageColor: 'currentMessageColor',
}

/** @type {CompanionVariableDefinition[]} */
const variables = [
  // Room
  { variableId: variableType.roomId, name: 'Room ID' },
  { variableId: variableType.roomName, name: 'Room name' },
  { variableId: variableType.roomTimezone, name: 'Room timezone' },
  { variableId: variableType.timeOfDay, name: 'Time of day (room timezone and format)' },
  { variableId: variableType.connected, name: 'Connected to Stagetimer (true/false)' },

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
  { variableId: variableType.running, name: 'Timer running (true/false)' },
  { variableId: variableType.lastStartedAt, name: 'Last fresh timer start (Unix time in ms)' },

  // Current Timer
  { variableId: variableType.currentTimerId, name: 'Current timer ID' },
  { variableId: variableType.currentTimerName, name: 'Current timer name' },
  { variableId: variableType.currentTimerIndex, name: 'Current timer number, for example 2.1' },
  { variableId: variableType.currentTimerGroup, name: 'Current timer group title' },
  { variableId: variableType.currentTimerGroupId, name: 'Current timer group ID' },
  { variableId: variableType.currentTimerGroupColor, name: 'Current timer group color, for example #7c3aed' },
  { variableId: variableType.currentTimerSpeaker, name: 'Current timer speaker' },
  { variableId: variableType.currentTimerNotes, name: 'Current timer notes' },
  { variableId: variableType.currentTimerAppearance, name: 'Current timer appearance' },
  { variableId: variableType.currentTimerStartTime, name: 'Current timer start (time of day format, event time zone)' },
  { variableId: variableType.currentTimerStartTime12h, name: 'Current timer start (12h format, event time zone)' },
  { variableId: variableType.currentTimerStartTime24h, name: 'Current timer start (24h format, event time zone)' },

  { variableId: variableType.currentTimerDuration, name: 'Current timer duration' },
  { variableId: variableType.currentTimerDurationAsMs, name: 'Current timer duration (ms)' },
  { variableId: variableType.currentTimerLabels, name: 'Current timer labels (comma-separated)' },
  { variableId: variableType.currentTimerLabel1, name: 'Current timer label 1' },
  { variableId: variableType.currentTimerLabel2, name: 'Current timer label 2' },
  { variableId: variableType.currentTimerLabel3, name: 'Current timer label 3' },
  { variableId: variableType.currentTimerFields, name: 'Current timer fields (JSON)' },

  // Next Timer
  { variableId: variableType.nextTimerId, name: 'Next timer ID' },
  { variableId: variableType.nextTimerName, name: 'Next timer name' },
  { variableId: variableType.nextTimerIndex, name: 'Next timer number, for example 2.1' },
  { variableId: variableType.nextTimerGroup, name: 'Next timer group title' },
  { variableId: variableType.nextTimerGroupId, name: 'Next timer group ID' },
  { variableId: variableType.nextTimerGroupColor, name: 'Next timer group color, for example #7c3aed' },
  { variableId: variableType.nextTimerSpeaker, name: 'Next timer speaker' },
  { variableId: variableType.nextTimerNotes, name: 'Next timer notes' },
  { variableId: variableType.nextTimerAppearance, name: 'Next timer appearance' },
  { variableId: variableType.nextTimerStartTime, name: 'Next timer start (time of day format, event time zone)' },
  { variableId: variableType.nextTimerStartTime12h, name: 'Next timer start (12h format, event time zone)' },
  { variableId: variableType.nextTimerStartTime24h, name: 'Next timer start (24h format, event time zone)' },

  { variableId: variableType.nextTimerDuration, name: 'Next timer duration' },
  { variableId: variableType.nextTimerDurationAsMs, name: 'Next timer duration (ms)' },
  { variableId: variableType.nextTimerLabels, name: 'Next timer labels (comma-separated)' },
  { variableId: variableType.nextTimerLabel1, name: 'Next timer label 1' },
  { variableId: variableType.nextTimerLabel2, name: 'Next timer label 2' },
  { variableId: variableType.nextTimerLabel3, name: 'Next timer label 3' },
  { variableId: variableType.nextTimerFields, name: 'Next timer fields (JSON)' },

  // Current Message
  { variableId: variableType.currentMessageId, name: 'Current message ID' },
  { variableId: variableType.currentMessageText, name: 'Current message text' },
  { variableId: variableType.currentMessageColor, name: 'Current message color' },
]

/**
 * @param { ModuleInstance } instance
 * @returns {void}
 */
export function loadVariables (instance) {
  instance.setVariableDefinitions([...variables, ...fieldVariableDefinitions(instance.fieldSlugs)])
}
