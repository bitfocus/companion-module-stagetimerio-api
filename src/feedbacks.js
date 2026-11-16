import { colors } from './assets.js'
import { hexToCompanionColor } from './groupColor.js'
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
  onAirEnabled: 'onAirEnabled',
  messageIsShowing: 'messageIsShowing',
  isConnected: 'isConnected',
  groupColor: 'groupColor',
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
        return (phase == timerPhases.negative || phase == timerPhases.zero)
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
      name: 'Message is fullscreen',
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

    [feedbackType.onAirEnabled]: {
      name: 'ON AIR mode',
      type: 'boolean',
      defaultStyle: {
        bgcolor: colors.red,
        color: colors.white,
      },
      options: [],
      callback: (_feedback) => {
        return instance.state.room.roomOnAir
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

    [feedbackType.isConnected]: {
      name: 'Connected',
      type: 'boolean',
      defaultStyle: {
        bgcolor: colors.green,
        color: colors.white,
      },
      options: [],
      callback: (_feedback) => {
        return instance.state.connection.isConnected
      },
    },

    [feedbackType.groupColor]: {
      name: 'Group color',
      description: 'Background in the color of the timer\'s group. No change outside a group',
      type: 'advanced',
      options: [{
        type: 'dropdown',
        id: 'timer',
        label: 'Timer',
        default: 'current',
        choices: [{ id: 'current', label: 'Current timer' }, { id: 'next', label: 'Next timer' }],
      }],
      callback: (feedback) => {
        const timer = feedback.options.timer === 'next' ? instance.state.next_timer : instance.state.current_timer
        const bgcolor = hexToCompanionColor(timer.group?.color)
        return bgcolor === null ? {} : { bgcolor, color: colors.white }
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
