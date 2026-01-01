import { feedbackType } from './feedbacks.js'
import { createTimeset, timerToStartDate, durationToMs, formatTimeDisplay } from './utils/index.js'
import { variableType } from './variables.js'
import { timerAppearancesLabels } from './config.js'
import { formatTimezone, formatTimeOfDay } from './timeutils/index.js'

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

/** @type {State} */
export const initialState = {
  room: {
    roomId: undefined,
    roomName: undefined,
    roomBlackout: false,
    roomFocus: false,
    roomOnAir: false,
    roomTimezone: 'UTC',
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
  current_timer: {
    name: '',
    speaker: '',
    notes: '',
    duration: '',
    appearance: '',
    wrap_up_yellow: 0,
    wrap_up_red: 0,
    start_time: '',
    start_time_uses_date: '',
    labels: [],
  },
  next_timer: {
    name: '',
    speaker: '',
    notes: '',
    duration: '',
    appearance: '',
    wrap_up_yellow: 0,
    wrap_up_red: 0,
    start_time: '',
    start_time_uses_date: '',
    labels: [],
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

  const isTimezoneChange = updatedState.roomTimezone !== instance.state.room.roomTimezone

  instance.state.room = updatedState

  instance.setVariableValues({
    [variableType.roomId]: updatedState.roomId,
    [variableType.roomName]: updatedState.roomName,
    [variableType.roomTimezone]: formatTimezone(updatedState.roomTimezone, 'abbr') || 'Auto',
  })

  instance.checkFeedbacks(
    feedbackType.blackoutEnabled,
    feedbackType.focusEnabled,
    feedbackType.onAirEnabled,
  )

  // Handle timezone change
  if (isTimezoneChange) {
    updateCurrentTimerState.call(instance)
    updateNextTimerState.call(instance)
  }
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
    instance.state.current_timer.wrap_up_yellow,
    instance.state.current_timer.wrap_up_red,
  )

  instance.state.playback_status = updatedState

  // Only enable timekeeper polling if timer is active
  if (updatedState.isRunning) {
    startTimeKeeper.call(this)
  } else {
    stopTimeKeeper.call(this)
  }

  const timezone = instance.state.room?.roomTimezone || 'UTC'
  const appearance = instance.state.current_timer.appearance
  const timeDisplay = formatTimeDisplay(updatedState, { appearance, timezone })

  instance.setVariableValues({
    [variableType.timeDisplay]: timeDisplay.display,
    [variableType.timeDisplayHours]: timeDisplay.displayHours,
    [variableType.timeDisplayMinutes]: timeDisplay.displayMinutes,
    [variableType.timeDisplaySeconds]: timeDisplay.displaySeconds,
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
 * @param {TimerState} newState
 * @this {ModuleInstance}
 * @returns {void}
 */
export function updateCurrentTimerState (newState) {

  const instance = this

  const updatedState = {
    ...instance.state.current_timer,
    ...newState,
  }

  const isAppearanceChange = updatedState.appearance !== instance.state.current_timer.appearance

  instance.state.current_timer = updatedState

  // Update `phase` using `playback_status` and `timer` state
  instance.state.playback_status.phase = getTimerPhase(
    instance.state.playback_status.remainingAsMs ?? 0,
    instance.state.current_timer.wrap_up_yellow,
    instance.state.current_timer.wrap_up_red,
  )

  const timezone = instance.state.room?.roomTimezone || 'UTC'
  const start = timerToStartDate(updatedState, timezone)

  const labels = updatedState.labels || []

  instance.setVariableValues({
    [variableType.currentTimerId]: updatedState._id,
    [variableType.currentTimerName]: updatedState.name,
    [variableType.currentTimerNotes]: updatedState.notes,
    [variableType.currentTimerSpeaker]: updatedState.speaker,
    [variableType.currentTimerDuration]: updatedState.duration,
    [variableType.currentTimerDurationAsMs]: durationToMs(updatedState.duration),
    [variableType.currentTimerAppearance]: timerAppearancesLabels[updatedState.appearance],
    [variableType.currentTimerStartTime12h]: start ? formatTimeOfDay(start, { timezone, format: '12h' }) : '',
    [variableType.currentTimerStartTime24h]: start ? formatTimeOfDay(start, { timezone, format: '24h' }) : '',
    [variableType.currentTimerLabels]: labels.map(l => l.name).join(', '),
    [variableType.currentTimerLabel1]: labels[0]?.name || '',
    [variableType.currentTimerLabel2]: labels[1]?.name || '',
    [variableType.currentTimerLabel3]: labels[2]?.name || '',
  })

  instance.checkFeedbacks(
    feedbackType.isWarningYellow,
    feedbackType.isWarningRed,
  )

  // Handle appearance change
  if (isAppearanceChange && !instance.state.playback_status.isRunning) {
    updatePlaybackState.call(instance)
  }
}

/**
 * @param {TimerState} newState
 * @this {ModuleInstance}
 * @returns {void}
 */
export function updateNextTimerState (newState) {

  const instance = this

  const updatedState = {
    ...instance.state.next_timer,
    ...newState,
  }

  instance.state.next_timer = updatedState

  const timezone = instance.state.room?.roomTimezone || 'UTC'
  const start = timerToStartDate(updatedState, timezone)

  const labels = updatedState.labels || []

  instance.setVariableValues({
    [variableType.nextTimerId]: updatedState._id,
    [variableType.nextTimerName]: updatedState.name,
    [variableType.nextTimerNotes]: updatedState.notes,
    [variableType.nextTimerSpeaker]: updatedState.speaker,
    [variableType.nextTimerDuration]: updatedState.duration,
    [variableType.nextTimerDurationAsMs]: durationToMs(updatedState.duration),
    [variableType.nextTimerAppearance]: timerAppearancesLabels[updatedState.appearance],
    [variableType.nextTimerStartTime12h]: start ? formatTimeOfDay(start, { timezone, format: '12h' }) : '',
    [variableType.nextTimerStartTime24h]: start ? formatTimeOfDay(start, { timezone, format: '24h' }) : '',
    [variableType.nextTimerLabels]: labels.map(l => l.name).join(', '),
    [variableType.nextTimerLabel1]: labels[0]?.name || '',
    [variableType.nextTimerLabel2]: labels[1]?.name || '',
    [variableType.nextTimerLabel3]: labels[2]?.name || '',
  })
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
