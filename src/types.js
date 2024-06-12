//
// Companion type aliases
//

/** @typedef {import('@companion-module/base').SomeCompanionConfigField} SomeCompanionConfigField */
/** @typedef {import('@companion-module/base').CompanionOptionValues} CompanionOptionValues */

/** @typedef {import('@companion-module/base').CompanionActionDefinitions} CompanionActionDefinitions */
/** @typedef {import('@companion-module/base').CompanionActionEvent} CompanionActionEvent */
/** @typedef {import('@companion-module/base').DropdownChoice[]} CompanionDropdownOptions */

/** @typedef {import('@companion-module/base').CompanionButtonStepActions} CompanionButtonStepActions */
/** @typedef {import('@companion-module/base').SomeCompanionActionInputField} SomeCompanionActionInputField */
/** @typedef {import('@companion-module/base').CompanionButtonStyleProps} CompanionButtonStyleProps */

/** @typedef {import('@companion-module/base').CompanionPresetDefinitions} CompanionPresetDefinitions */
/** @typedef {import('@companion-module/base').CompanionPresetFeedback} CompanionPresetFeedback */

/** @typedef {import('@companion-module/base').CompanionVariableDefinition} CompanionVariableDefinition */

/** @typedef {import('@companion-module/base').CompanionFeedbackDefinitions} CompanionFeedbackDefinitions */
/** @typedef {import('@companion-module/base').CompanionBooleanFeedbackDefinition} CompanionBooleanFeedbackDefinition */

/** @typedef {Object<string, import('@companion-module/base').CompanionBooleanFeedbackDefinition>} Feedbacks */
/** @typedef {Object<string, import('@companion-module/base').CompanionPresetFeedback>} PresetFeedbacks */

//
// External type aliases
//
/** @typedef {import('socket.io-client').Socket} Socket */

//
// Module types
//

/** @typedef {import('./index.js').ModuleInstance} ModuleInstance */

/**
 * Module configuration
 *
 * @typedef { object } StagetimerConfig
 * @property { string } roomId
 * @property { string } apiKey
 * @property { string } apiUrl
 */

/**
 * Stagetimer.io API response type
 *
 * @typedef {object} ApiResponse
 * @property {boolean} ok
 * @property {string} message
 * @property { RoomData | StatusData | TimerData | Array<Object> } [data]
 */

/**
 * API response for a Status
 *
 * @typedef {object} StatusData
 * @property {'playback_status'} _model
 * @property {Date} _updated_at
 * @property {string} timer_id
 * @property {boolean} running
 * @property {number} start
 * @property {number} finish
 * @property {number} pause
 * @property {number} server_time
 */

/**
 * API response for a Room
 *
 * @typedef {object} RoomData
 * @property {string} _id
 * @property {'room'} _model
 * @property {Date} _updated_at
 * @property {string} name
 * @property {boolean} blackout
 * @property {boolean} focus_message
 * @property {string} logo
 * @property {string} timezone
 */

/**
 * API response for a Timer
 *
 * @typedef {object} TimerData
 * @property {string} _id
 * @property {'timer'} _model
 * @property {Date} _updated_at
 * @property {string} name
 * @property {string} speaker
 * @property {string} notes
 * @property {string} duration
 * @property {string} appearance
 * @property {number} wrap_up_yellow
 * @property {number} wrap_up_red
 */

/**
 * Module state object
 *
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
 * @property {string} roomTimezone
 */

/**
 * @typedef {object} PlaybackState
 * @property {string} currentTimerId
 * @property {boolean} isRunning
 * @property {number} kickoff
 * @property {number} deadline
 * @property {number} lastStop
 * @property {number} serverTimeDiff
 * @property {number} [totalAsMs]
 * @property {string} [totalAsHuman]
 * @property {number} [remainingAsMs]
 * @property {string} [remainingAsHuman]
 * @property {string} [remainingHours]
 * @property {string} [remainingMinutes]
 * @property {string} [remainingSeconds]
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
 * @property {string} appearance
 * @property {number} wrap_up_yellow
 * @property {number} wrap_up_red
 */

/**
 * A DHMS object containing the components for calculating and formatting durations.
 *
 * @typedef {object} DhmsObj
 * @property { 0 | 1 } negative
 * @property {number} days
 * @property {number} hours
 * @property {number} minutes
 * @property {number} seconds
 * @property {number} hoursSum
 */

/**
 * An object containing formatted duration components
 *
 * @typedef {object} FormattedDhmsObj
 * @property {string} hhh   formatted hoursSum
 * @property {string} mm    formatted minutes
 * @property {string} ss    formatted seconds
 * @property {string} human hhh:mm:ss
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
