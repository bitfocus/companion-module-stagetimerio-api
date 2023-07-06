import { feedbackType, feedbacks } from './feedbacks.js'
import { colors, icons } from './assets.js'
import { variableType } from './variables.js'
import { actionIdType } from './actions.js'

/** @type {CompanionPresetDefinitions} */
let presets = {}

/**
 * Generates valid Companion Presets ({@link CompanionPresetDefinitions})
 *  from a custom declarative template ({@link PresetDefinitions}).
 *
 * @returns {CompanionPresetDefinitions}
 */
function generatePresets() {

  /** @type {PresetDefinitions} */
  const presets_template = {
    'Transport': [
      // Standard transport buttons
      {
        name: 'Start/stop toggle',
        actionId: actionIdType.start_or_stop,
        style: {
          size: '14',
          text: 'Start/stop',
          alignment: 'center:bottom',
          png64: icons.play,
          pngalignment: 'center:top',
          color: colors.white,
          bgcolor: colors.black,
        },
        feedbacks: [
          getFeedbackDefaults(feedbackType.isRunning, {
            png64: icons.pause,
          }),
        ],
      },
      {
        name: 'Start',
        actionId: actionIdType.start,
        style: {
          size: '14',
          text: 'Start',
          alignment: 'center:bottom',
          png64: icons.play,
          pngalignment: 'center:top',
          color: colors.white,
          bgcolor: colors.black,
        },
        feedbacks: [
          getFeedbackDefaults(feedbackType.isRunning)
        ]
      },
      {
        name: 'Stop',
        actionId: actionIdType.stop,
        style: {
          size: '14',
          text: 'Stop',
          alignment: 'center:bottom',
          png64: icons.pause,
          pngalignment: 'center:top',
          color: colors.white,
          bgcolor: colors.black,
        },
        feedbacks: [
          getFeedbackDefaults(feedbackType.isStopped)
        ]
      },
      {
        name: 'Previous',
        actionId: actionIdType.previous,
        style: {
          size: '14',
          text: 'Previous',
          alignment: 'center:bottom',
          png64: icons.previous,
          pngalignment: 'center:top',
          color: colors.white,
          bgcolor: colors.black,
        },
      },
      {
        name: 'Next',
        actionId: actionIdType.next,
        style: {
          size: '14',
          text: 'Next',
          alignment: 'center:bottom',
          png64: icons.next,
          pngalignment: 'center:top',
          color: colors.white,
          bgcolor: colors.black,
        },
      },

      // Variations of add/subtract time
      {
        name: '+1min',
        actionId: actionIdType.add_time,
        actionOptions: {
          amount: '1m',
        },
        style: {
          size: '24',
          text: '+1min',
          alignment: 'center:center',
          color: colors.lightGreen,
          bgcolor: colors.black,
        },
      },
      {
        name: '-1m',
        actionId: actionIdType.subtract_time,
        actionOptions: {
          amount: '1m',
        },
        style: {
          size: '24',
          text: '-1m',
          alignment: 'center:center',
          color: colors.lightRed,
          bgcolor: colors.black,
        },
      },
      {
        name: '+30s',
        actionId: actionIdType.add_time,
        actionOptions: {
          amount: '30s',
        },
        style: {
          size: '24',
          text: '+30s',
          alignment: 'center:center',
          color: colors.lightGreen,
          bgcolor: colors.black,
        },
      },
      {
        name: '-30s',
        actionId: actionIdType.subtract_time,
        actionOptions: {
          amount: '30s',
        },
        style: {
          size: '24',
          text: '-30s',
          alignment: 'center:center',
          color: colors.lightRed,
          bgcolor: colors.black,
        },
      },
      {
        name: '+5min',
        actionId: actionIdType.add_time,
        actionOptions: {
          amount: '5m',
        },
        style: {
          size: '24',
          text: '+5min',
          alignment: 'center:center',
          color: colors.lightGreen,
          bgcolor: colors.black,
        },
      },
      {
        name: '-5m',
        actionId: actionIdType.subtract_time,
        actionOptions: {
          amount: '5m',
        },
        style: {
          size: '24',
          text: '-5m',
          alignment: 'center:center',
          color: colors.lightRed,
          bgcolor: colors.black,
        },
      },
    ],

    Viewer: [
      {
        name: 'Time remaining',
        actionId: '',
        style: {
          size: '18',
          text: `$(stagetimer:${variableType.currentTimerRemaining})`,
          color: colors.white,
          bgcolor: colors.black,
        },
        feedbacks: [
          getFeedbackDefaults(feedbackType.isOnTime),
          getFeedbackDefaults(feedbackType.isOverTime),
          getFeedbackDefaults(feedbackType.isWarningYellow),
          getFeedbackDefaults(feedbackType.isWarningRed),
        ],
      },
      {
        name: 'Timer status',
        actionId: '',
        style: {
          size: '18',
          text: `Ready`,
          color: colors.white,
          bgcolor: colors.black,
        },
        feedbacks: [
          getFeedbackDefaults(feedbackType.isOnTime, { text: 'On time' }),
          getFeedbackDefaults(feedbackType.isOverTime, { text: 'Over time!' }),
          getFeedbackDefaults(feedbackType.isWarningYellow, { text: 'Wrap up..' }),
          getFeedbackDefaults(feedbackType.isWarningRed, { text: 'Wrap up!' }),
        ],
      },
      {
        name: 'Timer name',
        actionId: '',
        style: {
          size: 'auto',
          text: `$(stagetimer:${variableType.currentTimerName})`,
          color: colors.lightBlue,
          bgcolor: colors.black,
        },
      },
      {
        name: 'Speaker',
        actionId: '',
        style: {
          size: 'auto',
          text: `Speaker: $(stagetimer:${variableType.currentTimerSpeaker})`,
          color: colors.lightBlue,
          bgcolor: colors.black,
        },
      },
      {
        name: 'Start flashing',
        actionId: actionIdType.start_flashing,
        actionOptions: {
          count: 3,
        },
        style: {
          size: '14',
          text: 'Flash x3',
          alignment: 'center:bottom',
          png64: icons.flash,
          pngalignment: 'center:top',
          color: colors.white,
          bgcolor: colors.black,
        },
        feedbacks: [getFeedbackDefaults(feedbackType.isFlashing)],
      },
      {
        name: 'Stop flashing',
        actionId: actionIdType.stop_flashing,
        style: {
          size: '14',
          text: 'Flash off',
          alignment: 'center:bottom',
          png64: icons.flashOff,
          pngalignment: 'center:top',
          color: colors.white,
          bgcolor: colors.black,
        },
        feedbacks: [getFeedbackDefaults(feedbackType.isFlashing)],
      },
      {
        name: 'Toggle blackout mode',
        actionId: actionIdType.toggle_blackout,
        style: {
          size: '14',
          text: 'Blackout',
          alignment: 'center:bottom',
          png64: icons.blackout,
          pngalignment: 'center:top',
          color: colors.white,
          bgcolor: colors.black,
        },
        feedbacks: [
          getFeedbackDefaults(feedbackType.blackoutEnabled, {
            png64: icons.blackoutOff,
          }),
        ],
      },
      {
        name: 'Toggle focus mode',
        actionId: actionIdType.toggle_focus,
        style: {
          size: '14',
          text: 'Focus',
          alignment: 'center:bottom',
          png64: icons.focus,
          pngalignment: 'center:top',
          color: colors.white,
          bgcolor: colors.black,
        },
        feedbacks: [
          getFeedbackDefaults(feedbackType.focusEnabled, {
            png64: icons.focusOff,
          }),
        ],
      },
    ],

    Timer: [
      {
        name: 'Reset a timer',
        actionId: actionIdType.reset_timer,
        actionOptions: {
          index: 1,
        },
        style: {
          size: '14',
          text: 'Reset',
          alignment: 'center:bottom',
          png64: icons.timerReset,
          pngalignment: 'center:top',
          color: colors.white,
          bgcolor: colors.black,
        },
        feedbacks: [],
      },
      {
        name: 'Start a timer',
        actionId: actionIdType.start_timer,
        actionOptions: {
          index: 2,
        },
        style: {
          size: '14',
          text: 'Start #2',
          alignment: 'center:bottom',
          png64: icons.timer,
          pngalignment: 'center:top',
          color: colors.white,
          bgcolor: colors.black,
        },
        feedbacks: [],
      },
      {
        name: 'Stop a timer',
        actionId: actionIdType.stop_timer,
        actionOptions: {
          index: 2,
        },
        style: {
          size: '14',
          text: 'Stop #2',
          alignment: 'center:bottom',
          png64: icons.timer,
          pngalignment: 'center:top',
          color: colors.white,
          bgcolor: colors.black,
        },
        feedbacks: [],
      },
    ],

    'Message': [
      {
        name: 'Show/hide message',
        actionId: actionIdType.show_or_hide_message,
        actionOptions: {
          index: 1,
        },
        style: {
          size: '14',
          text: 'Toggle #1',
          alignment: 'center:bottom',
          png64: icons.message,
          pngalignment: 'center:top',
          color: colors.white,
          bgcolor: colors.black,
        },
        feedbacks: [
          getFeedbackDefaults(feedbackType.messageIsShowing, {
            png64: icons.messageOff,
          }),
        ],
      },
      {
        name: 'Show message',
        actionId: actionIdType.show_message,
        actionOptions: {
          index: 2,
        },
        style: {
          size: '14',
          text: 'Show #2',
          alignment: 'center:bottom',
          png64: icons.message,
          pngalignment: 'center:top',
          color: colors.white,
          bgcolor: colors.black,
        },
        feedbacks: [],
      },
      {
        name: 'Hide message',
        actionId: actionIdType.hide_message,
        actionOptions: {
          index: 2,
        },
        style: {
          size: '14',
          text: 'Hide #2',
          alignment: 'center:bottom',
          png64: icons.messageOff,
          pngalignment: 'center:top',
          color: colors.white,
          bgcolor: colors.black,
        },
        feedbacks: [],
      },
    ],
  }

  for (const [buttonCategory, buttons] of Object.entries(presets_template)) {

    for (const button of buttons) {

      presets[button.name] = {
        type: 'button',
        category: buttonCategory,
        name: button.name,
        steps: button.steps || [
          {
            down: button.actionId
              ? [
                {
                  actionId: button.actionId,
                  options: button.actionOptions || {},
                },
              ]
              : [],
            up: [],
          },
        ],
        style: button.style || {
          size: 'auto',
          text: button.name,
          color: colors.white,
          bgcolor: colors.black,
        },
        feedbacks: button.feedbacks || [],
      }
    }
  }

  return presets
}

/**
 * @param {feedbackType} feedbackId
 * @param {CompanionPresetFeedback['style']} [styleOverrides]
 * @returns {CompanionPresetFeedback}
 */
export function getFeedbackDefaults(feedbackId, styleOverrides) {

  if (feedbacks[feedbackId]) {
    return {
      feedbackId: feedbackId,
      options: {},
      style: {
        ...feedbacks[feedbackId]['defaultStyle'],
        ...styleOverrides,
      },
    }
  }

}


/**
 * @param { ModuleInstance } instance
 * @returns {void}
 */
export function loadPresets(instance) {

  instance.setPresetDefinitions(
    generatePresets()
  )

}
