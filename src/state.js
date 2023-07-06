import { feedbackType } from './feedbacks.js'
import { formatDuration, createTimeset } from './utils.js'
import { variableType } from './variables.js'

/** @type {ModuleInstance} */
let instance = null

/**
 * Start state module
 *
 * @param {ModuleInstance} theInstance
 * @returns {void}
 */
export function startState (theInstance) {
  instance = theInstance
}

//
// Timekeeper service
//
let timerKeeperId = null

function startTimeKeeper () {
  if (timerKeeperId !== null) { return }
  timerKeeperId = setInterval(updatePlaybackState, 500)
}

function stopTimeKeeper () {
  clearInterval(timerKeeperId)
  timerKeeperId = null
}


/**
 * Enum of the phases a timer can be in
 *
 * @readonly
 * @enum {string}
 */
export const timerPhases = {
  default: 'default',
  yellow: 'yellow',
  red: 'red',
  zero: 'zero',
  negative: 'negative',
}

/**
 * Returns current time phase as enum {@link timerPhases}
 *
 * @param {number} timeRemaining
 * @param {number} [yellowTime]
 * @param {number} [redTime]
 * @returns {timerPhases}
 */
export function getTimerPhase (timeRemaining, yellowTime, redTime) {
  if (timeRemaining < 0) return timerPhases.negative
  if (timeRemaining <= 0) return timerPhases.zero
  if (timeRemaining <= redTime * 1000) return timerPhases.red
  if (timeRemaining <= yellowTime * 1000) return timerPhases.yellow
  return timerPhases.default
}


/** @type {State} */
export const initialState = {
  room: {
    roomId: null,
    roomName: null,
    roomBlackout: null,
    roomFocus: null,
  },
  viewer: {
    isFlashing: false,
  },
  playback_status: {
    currentTimerId: null,
    isRunning: null,
    kickoff: null,
    deadline: null,
    lastStop: null,
    phase: 'default',
  },
  timer: {
    name: null,
    speaker: null,
    notes: null,
    duration: null,
    wrap_up_yellow: null,
    wrap_up_red: null,
  },
  message: {
    showing: null,
    text: null,
    color: null,
    bold: null,
    uppercase: null,
  },
}

/**
 * @param { RoomState } newState
 * @returns {void}
 */
export function updateRoomState (newState) {

  const updatedState = {
    ...instance.state.room,
    ...newState,
  }

  instance.state.room = updatedState

  instance.setVariableValues({
    [variableType.roomId]: updatedState.roomId,
    [variableType.roomName]: updatedState.roomName,
  })

  instance.checkFeedbacks(
    feedbackType.blackoutEnabled,
    feedbackType.focusEnabled,
  )

}

/**
 * @param { PlaybackState } [newState]
 * @returns {void}
 */
export function updatePlaybackState (newState = instance.state.playback_status) {

  const updatedState = createTimeset(newState)

  updatedState.phase = getTimerPhase(
    updatedState.remaining,
    instance.state.timer.wrap_up_yellow,
    instance.state.timer.wrap_up_red,
  )

  instance.state.playback_status = updatedState

  // Only enable timekeeper polling if timer is active
  if (updatedState.isRunning) {
    startTimeKeeper()
  } else {
    stopTimeKeeper()
  }

  instance.setVariableValues({
    [variableType.currentTimerId]: updatedState.currentTimerId,

    [variableType.currentTimerDuration]: formatDuration(updatedState.total),
    [variableType.currentTimerDurationAsMs]: updatedState.total,

    [variableType.currentTimerRemaining]: formatDuration(updatedState.remaining),
    [variableType.currentTimerRemainingAsMs]: updatedState.remaining,
  })

  instance.checkFeedbacks(
    feedbackType.isRunning,
    feedbackType.isStopped,
    feedbackType.isOnTime,
    feedbackType.isOverTime,
    feedbackType.isWarningYellow,
    feedbackType.isWarningRed,
  )

}

/**
 * @param { TimerState } newState
 * @returns {void}
 */
export function updateTimerState (newState) {

  const updatedState = {
    ...instance.state.timer,
    ...newState,
  }

  instance.state.timer = updatedState

  // Update `phase` using `playback_status` and `timer` state
  instance.state.playback_status.phase = getTimerPhase(
    instance.state.playback_status.remaining,
    instance.state.timer.wrap_up_yellow,
    instance.state.timer.wrap_up_red,
  )

  instance.setVariableValues({
    [variableType.currentTimerName]: updatedState.name,
    [variableType.currentTimerNotes]: updatedState.notes,
    [variableType.currentTimerSpeaker]: updatedState.speaker,
    [variableType.currentTimerDuration]: updatedState.duration,
  })

  instance.checkFeedbacks(
    feedbackType.isWarningYellow,
    feedbackType.isWarningRed,
  )

}

/**
 * @param { MessageState } newState
 * @returns {void}
 */
export function updateMessageState (newState) {

  instance.state.message = {
    ...instance.state.message,
    ...newState,
  }

  instance.checkFeedbacks(
    feedbackType.messageIsShowing,
  )

}

/**
 * @param {number} count
 * @returns {void}
 */
export function updateFlashingState (count) {

  let shouldFlash = false

  if (count > 0) {

    shouldFlash = true

    setTimeout(() => {
      instance.state.viewer.isFlashing = false
      instance.checkFeedbacks(feedbackType.isFlashing)
    }, count * 1000)
  }

  instance.state.viewer.isFlashing = shouldFlash

  instance.checkFeedbacks(
    feedbackType.isFlashing,
  )

}
