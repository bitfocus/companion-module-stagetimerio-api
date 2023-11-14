import { feedbackType } from './feedbacks.js'
import { createTimeset } from './utils.js'
import { variableType } from './variables.js'

//
// Timekeeper service
//
/** @type {NodeJS.Timeout | null} */
let timerKeeperId = null

/**
 * Start time keeping service
 *
 * @this {ModuleInstance}
 * @returns {void}
 */
function startTimeKeeper () {
  if (timerKeeperId !== null) { return }
  // @ts-expect-error: NodeJS.Timeout/Timer don't play well with TS atm
  timerKeeperId = setInterval(updatePlaybackState.bind(this), 250)
}

/**
 * Stop time keeping serviec
 *
 * @returns {void}
 */
function stopTimeKeeper () {
  if(timerKeeperId !== null ) {
    clearInterval(timerKeeperId)
  }
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
export function getTimerPhase (timeRemaining, yellowTime = 0, redTime = 0) {
  if (timeRemaining < 0) return timerPhases.negative
  if (timeRemaining <= 0) return timerPhases.zero
  if (timeRemaining <= redTime * 1000) return timerPhases.red
  if (timeRemaining <= yellowTime * 1000) return timerPhases.yellow
  return timerPhases.default
}

/**
 * Enum of the appearances a timer can have
 *
 * @readonly
 * @enum {string}
 */
const timerAppearances = {
  COUNTDOWN    : 'COUNTDOWN',
  COUNTUP      : 'COUNTUP',
  TOD          : 'TOD',
  COUNTDOWN_TOD: 'COUNTDOWN_TOD',
  COUNTUP_TOD  : 'COUNTUP_TOD',
  HIDDEN       : 'HIDDEN',
}

// Map timer appearances to a human-friendly label
const timerAppearanceLabels = {
  [timerAppearances.COUNTDOWN]    : 'Countdown',
  [timerAppearances.COUNTUP]      : 'Count Up',
  [timerAppearances.TOD]          : 'Time of Day',
  [timerAppearances.COUNTDOWN_TOD]: 'C/D + ToD',
  [timerAppearances.COUNTUP_TOD]  : 'C/U + ToD',
  [timerAppearances.HIDDEN]       : 'Hidden',
}

/** @type {State} */
export const initialState = {
  room: {
    roomId: undefined,
    roomName: undefined,
    roomBlackout: false,
    roomFocus: false,
    roomTimezone: '',
  },
  viewer: {
    isFlashing: false,
  },
  playback_status: {
    currentTimerId: '',
    isRunning: false,
    kickoff: 0,
    deadline: 0,
    lastStop: 0,
    phase: undefined,
  },
  timer: {
    name: '',
    speaker: '',
    notes: '',
    duration: '',
    appearance: '',
    wrap_up_yellow: 0,
    wrap_up_red: 0,
  },
  message: {
    showing: false,
    text: '',
    color: '',
    bold: false,
    uppercase: false,
  },
}

/**
 * @param { RoomState } newState
 * @this {ModuleInstance}
 * @returns {void}
 */
export function updateRoomState (newState) {

  const instance = this

  const updatedState = {
    ...instance.state.room,
    ...newState,
  }

  instance.state.room = updatedState

  instance.setVariableValues({
    [variableType.roomId]: updatedState.roomId,
    [variableType.roomName]: updatedState.roomName,
    [variableType.roomTimezone]: updatedState.roomTimezone ?? 'Auto',
  })

  instance.checkFeedbacks(
    feedbackType.blackoutEnabled,
    feedbackType.focusEnabled,
  )

}

/**
 * @param { PlaybackState } [newState]
 * @this {ModuleInstance}
 * @returns {void}
 */
export function updatePlaybackState (newState) {

  const instance = this

  const updatedState = createTimeset(newState || instance.state.playback_status)

  updatedState.phase = getTimerPhase(
    updatedState.remainingAsMs ?? 0,
    instance.state.timer.wrap_up_yellow,
    instance.state.timer.wrap_up_red,
  )

  instance.state.playback_status = updatedState

  // Only enable timekeeper polling if timer is active
  if (updatedState.isRunning) {
    startTimeKeeper.call(this)
  } else {
    stopTimeKeeper.call(this)
  }

  instance.setVariableValues({
    [variableType.currentTimerId]: updatedState.currentTimerId ?? undefined,

    [variableType.currentTimerDuration]: updatedState.totalAsHuman,
    [variableType.currentTimerDurationAsMs]: updatedState.totalAsMs,

    [variableType.currentTimerRemaining]: updatedState.remainingAsHuman,
    [variableType.currentTimerRemainingAsMs]: updatedState.remainingAsMs,
    [variableType.currentTimerRemainingHours]: updatedState.remainingHours,
    [variableType.currentTimerRemainingMinutes]: updatedState.remainingMinutes,
    [variableType.currentTimerRemainingSeconds]: updatedState.remainingSeconds,
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
 * @this {ModuleInstance}
 * @returns {void}
 */
export function updateTimerState (newState) {

  const instance = this

  const updatedState = {
    ...instance.state.timer,
    ...newState,
  }

  instance.state.timer = updatedState

  // Update `phase` using `playback_status` and `timer` state
  instance.state.playback_status.phase = getTimerPhase(
    instance.state.playback_status.remainingAsMs ?? 0,
    instance.state.timer.wrap_up_yellow,
    instance.state.timer.wrap_up_red,
  )

  instance.setVariableValues({
    [variableType.currentTimerName]: updatedState.name,
    [variableType.currentTimerNotes]: updatedState.notes,
    [variableType.currentTimerSpeaker]: updatedState.speaker,
    [variableType.currentTimerDuration]: updatedState.duration,
    [variableType.currentTimerAppearance]: timerAppearanceLabels[updatedState.appearance],
  })

  instance.checkFeedbacks(
    feedbackType.isWarningYellow,
    feedbackType.isWarningRed,
  )

}

/**
 * @param { MessageState } newState
 * @this {ModuleInstance}
 * @returns {void}
 */
export function updateMessageState (newState) {

  const instance = this

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
 * @this {ModuleInstance}
 * @returns {void}
 */
export function updateFlashingState (count) {

  const instance = this

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
