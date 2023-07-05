//
// Companion type aliases
//

/** @typedef {import('@companion-module/base').SomeCompanionConfigField} SomeCompanionConfigField */
/** @typedef {import('@companion-module/base').CompanionOptionValues} CompanionOptionValues */

/** @typedef {import('@companion-module/base').CompanionActionDefinitions} CompanionActionDefinitions */
/** @typedef {import('@companion-module/base').CompanionActionEvent} CompanionActionEvent */

/** @typedef {import('@companion-module/base').CompanionButtonStepActions} CompanionButtonStepActions */
/** @typedef {import('@companion-module/base').SomeCompanionActionInputField} SomeCompanionActionInputField */
/** @typedef {import('@companion-module/base').CompanionButtonStyleProps} CompanionButtonStyleProps */

/** @typedef {import('@companion-module/base').CompanionPresetDefinitions} CompanionPresetDefinitions */
/** @typedef {import('@companion-module/base').CompanionPresetFeedback} CompanionPresetFeedback */

/** @typedef {import('@companion-module/base').CompanionVariableDefinition} CompanionVariableDefinition */

/** @typedef {import('@companion-module/base').CompanionFeedbackDefinitions} CompanionFeedbackDefinitions */
/** @typedef {import('@companion-module/base').CompanionBooleanFeedbackDefinition} CompanionBooleanFeedbackDefinition */

//
// Module types
//

/**
 * @typedef { object } StagetimerConfig
 * @property { string } roomId
 * @property { string } apiKey
 * @property { string } apiUrl
 */

/** @typedef {import('./index.js').ModuleInstance} ModuleInstance */

/** @typedef {Object<string, import('@companion-module/base').CompanionBooleanFeedbackDefinition>} Feedbacks */
/** @typedef {Object<string, import('@companion-module/base').CompanionPresetFeedback>} PresetFeedbacks */

/**
 * Stagetimer.io API response type
 *
 * @typedef {object} ApiResponse
 * @property {boolean} ok
 * @property {string} message
 * @property { Object | Array<Object> } [data]
 */

/**
 * @typedef {object} State
 * @property {RoomState} room
 * @property {ViewerState} viewer
 * @property {PlaybackState} playback_status
 * @property {TimerState} timer
 * @property {MessageState} message
 */

/**
 * @typedef {object} RoomState
 * @property {string} [roomId]
 * @property {string} [roomName]
 * @property {boolean} roomBlackout
 * @property {boolean} roomFocus
 */

/**
 * @typedef {object} PlaybackState
 * @property {string} currentTimerId
 * @property {boolean} isRunning
 * @property {number} kickoff
 * @property {number} deadline
 * @property {number} lastStop
 * @property {number} [total]
 * @property {number} [remaining]
 * @property {import('./state.js').timerPhases} [phase]
 */

/**
 * @typedef {object} ViewerState
 * @property {boolean} isFlashing
 */

/**
 * @typedef {object} MessageState
 * @property {boolean} showing
 * @property {string} text
 * @property {string} color
 * @property {boolean} bold
 * @property {boolean} uppercase
 */

/**
 * @typedef {object} TimerState
 * @property {string} name
 * @property {string} notes
 * @property {string} speaker
 * @property {string} duration
 * @property {number} wrap_up_yellow
 * @property {number} wrap_up_red
 */

/**
 * Custom type for defining buttons for Presets,
 * that will be turned into {@link CompanionPresetDefinitions}
 *
 * @typedef {object} PresetDefinition
 * @property {string} name Name of the button
 * @property {string} actionId ID of the Action
 * @property {CompanionOptionValues} [actionOptions] Override Action options
 * @property {CompanionButtonStepActions[]} [steps] Button action steps
 * @property {CompanionButtonStyleProps} [style] Button style
 * @property {CompanionPresetFeedback[]} [feedbacks] Button action feedbacks
 */

/**
 * Dictionary of custom button definitions ({@link PresetDefinition})
 *
 * @typedef {Object.<string, Array<PresetDefinition>>} PresetDefinitions
 */
