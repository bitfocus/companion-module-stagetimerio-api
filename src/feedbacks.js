import { colors } from './assets.js'
import { timerPhases } from './state.js'

/**
 * @type {Feedbacks}
 */
export let feedbacks = {}

/**
 * Enum of allowed feedbacks
 *
 * @readonly
 * @enum {string}
 */
export const feedbackType = {
  isRunning: 'isRunning',
  isStopped: 'isStopped',
  isOnTime: 'isOnTime',
  isOverTime: 'isOverTime',
  isWarningYellow: 'isYellowPhase',
  isWarningRed: 'isRedPhase',
  isFlashing: 'isFlashing',
  blackoutEnabled: 'blackoutEnabled',
  focusEnabled: 'focusEnabled',
  messageIsShowing: 'messageIsShowing',
}

/**
 * @param { ModuleInstance } instance
 * @returns {Feedbacks}
 */
function generateFeedbacks (instance) {

  feedbacks = {

    [feedbackType.isRunning]: {
      name: 'Playback running',
      type: 'boolean',
      defaultStyle: {
        bgcolor: colors.red,
        color: colors.white,
      },
      options: [],
      callback: (_feedback) => {
        return instance.state.playback_status.isRunning
      },
    },

    [feedbackType.isStopped]: {
      name: 'Playback stopped',
      type: 'boolean',
      defaultStyle: {
        bgcolor: colors.red,
        color: colors.white,
      },
      options: [],
      callback: (_feedback) => {
        return !instance.state.playback_status.isRunning
      },
    },

    [feedbackType.isOnTime]: {
      name: 'Timer is running and on time',
      type: 'boolean',
      defaultStyle: {
        color: colors.green,
      },
      options: [],
      callback: (_feedback) => {
        let { phase, isRunning } = instance.state.playback_status
        return phase == timerPhases.default && isRunning
      },
    },

    [feedbackType.isOverTime]: {
      name: 'Timer is over time',
      type: 'boolean',
      defaultStyle: {
        color: colors.red,
      },
      options: [],
      callback: (_feedback) => {
        let { phase } = instance.state.playback_status
        return phase == timerPhases.negative
      },
    },

    [feedbackType.isWarningYellow]: {
      name: 'Timer is showing yellow wrap-up warning',
      type: 'boolean',
      defaultStyle: {
        color: colors.yellow,
      },
      options: [],
      callback: (_feedback) => {
        let { phase } = instance.state.playback_status
        return phase == timerPhases.yellow
      },
    },

    [feedbackType.isWarningRed]: {
      name: 'Timer is showing red wrap-up warning',
      type: 'boolean',
      defaultStyle: {
        color: colors.red,
      },
      options: [],
      callback: (_feedback) => {
        let { phase } = instance.state.playback_status
        return phase == timerPhases.red
      },
    },

    [feedbackType.isFlashing]: {
      name: 'Flashing',
      type: 'boolean',
      defaultStyle: {
        bgcolor: colors.red,
        color: colors.white,
      },
      options: [],
      callback: (_feedback) => {
        return instance.state.viewer.isFlashing
      },
    },

    [feedbackType.blackoutEnabled]: {
      name: 'Blackout mode',
      type: 'boolean',
      defaultStyle: {
        bgcolor: colors.red,
        color: colors.white,
      },
      options: [],
      callback: (_feedback) => {
        return instance.state.room.roomBlackout
      },
    },

    [feedbackType.focusEnabled]: {
      name: 'Focus mode',
      type: 'boolean',
      defaultStyle: {
        bgcolor: colors.red,
        color: colors.white,
      },
      options: [],
      callback: (_feedback) => {
        return instance.state.room.roomFocus
      },
    },

    [feedbackType.messageIsShowing]: {
      name: 'Message showing',
      type: 'boolean',
      defaultStyle: {
        bgcolor: colors.red,
        color: colors.white,
      },
      options: [],
      callback: (_feedback) => {
        return instance.state.message.showing
      },
    },
  }

  return feedbacks
}

/**
 * @param { ModuleInstance } instance
 * @returns {void}
 */
export function loadFeedbacks (instance) {

  instance.setFeedbackDefinitions(
    generateFeedbacks(instance),
  )

}
