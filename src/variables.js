/**
 * Enum of allowed variables
 *
 * @readonly
 * @enum {string}
 */
export const variableType = {
	roomId: 'roomId',
	roomName: 'roomName',

	currentTimerId: 'currentTimerId',
	currentTimerName: 'currentTimerName',
	currentTimerSpeaker: 'currentTimerSpeaker',
	currentTimerNotes: 'currentTimerNotes',

	currentTimerDuration: 'currentTimerDuration',
	currentTimerDurationAsMs: 'currentTimerDurationAsMs',

	currentTimerRemaining: 'currentTimerRemaining',
	currentTimerRemainingAsMs: 'currentTimerRemainingAsMs',
}

/** @type {CompanionVariableDefinition[]} */
const variables = [
	{ variableId: variableType.roomId, name: 'Room ID' },
	{ variableId: variableType.roomName, name: 'Room name' },

	{ variableId: variableType.currentTimerId, name: 'Timer ID' },
	{ variableId: variableType.currentTimerName, name: 'Timer name' },
	{ variableId: variableType.currentTimerSpeaker, name: 'Timer speaker' },
	{ variableId: variableType.currentTimerNotes, name: 'Timer notes' },

	{ variableId: variableType.currentTimerDuration, name: 'Timer duration' },
	{ variableId: variableType.currentTimerDurationAsMs, name: 'Timer duration (ms)' },

	{ variableId: variableType.currentTimerRemaining, name: 'Timer remaining time' },
	{ variableId: variableType.currentTimerRemainingAsMs, name: 'Timer remaining time (ms)' },
]

/**
 * @param { ModuleInstance } instance
 * @returns {void}
 */
export function loadVariables(instance) {
	instance.setVariableDefinitions(variables)
}
