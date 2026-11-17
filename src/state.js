import { feedbackType } from './feedbacks.js'
import { createTimeset, timerToStartDate, durationToMs, formatTimeDisplay } from './utils/index.js'
import { formatTod } from './utils/formatTod.js'
import { loadVariables, variableType } from './variables.js'
import { buildCurrentFieldValues, buildNextFieldValues, formatFieldsJson } from './fieldVariables.js'
import { isLiveFreshStart } from './startSignal.js'
import { timerAppearancesLabels } from './config.js'
import { formatTimezone, formatTimeOfDay } from './timeutils/index.js'

//
// Timekeeper service
//
/** @type {NodeJS.Timeout | null} */
let timerKeeperId = null
/** @type {NodeJS.Timeout | null} */
let clockId = null

/**
 * @this {ModuleInstance}
 * @returns {void}
 */
function updateClock () {
  const { roomTimezone, roomTodFormat } = this.state.room
  this.setVariableValues({
    [variableType.timeOfDay]: formatTod(new Date(), { timezone: roomTimezone, todFormat: roomTodFormat }),
  })
}

/**
 * @this {ModuleInstance}
 * @returns {void}
 */
export function startClock () {
  if (clockId !== null) return
  updateClock.call(this)
  // @ts-expect-error: NodeJS.Timeout/Timer don't play well with TS atm
  clockId = setInterval(updateClock.bind(this), 250)
}

/** @returns {void} */
export function stopClock () {
  if (clockId !== null) clearInterval(clockId)
  clockId = null
}

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
 * A blank timer, used as the initial state and to clear `current_timer` /
 * `next_timer` when the API reports there is none (null socket payload).
 *
 * Returns a fresh object every call so the two slices don't share a `labels` array.
 *
 * @returns {TimerState}
 */
export function createEmptyTimerState () {
  return {
    _id: '',
    name: '',
    speaker: '',
    notes: '',
    duration: '',
    appearance: '',
    wrap_up_yellow: 0,
    wrap_up_red: 0,
    start_time: '',
    start_time_uses_date: false,
    index: null,
    group: null,
    labels: [],
    fields: {},
  }
}

/**
 * @param {ModuleInstance} instance
 * @param {typeof buildCurrentFieldValues} buildValues
 * @param {Record<string, unknown>} [fields]
 * @returns {void}
 */
function syncFieldVariables (instance, buildValues, fields) {
  const { newSlugs, values } = buildValues(instance.fieldSlugs, fields)
  if (newSlugs.length) {
    newSlugs.forEach((slug) => instance.fieldSlugs.add(slug))
    loadVariables(instance)
  }
  if (Object.keys(values).length) instance.setVariableValues(values)
}

/** @type {State} */
export const initialState = {
  connection: {
    isConnected: false,
  },
  room: {
    roomId: undefined,
    roomName: undefined,
    roomBlackout: false,
    roomFocus: false,
    roomOnAir: false,
    roomTimezone: 'UTC',
    roomOvertimePrefix: '+',
    roomOvertimeBehavior: 'continue',
    roomTodFormat: 'AUTO',
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
  current_timer: createEmptyTimerState(),
  next_timer: createEmptyTimerState(),
  start_signal: {
    lastSeenStart: 0,
    pending: null,
  },
  message: {
    _id: '',
    showing: false,
    text: '',
    color: '',
    bold: false,
    uppercase: false,
  },
}

/**
 * @param {boolean} isConnected
 * @this {ModuleInstance}
 * @returns {void}
 */
export function updateConnectionState (isConnected) {
  const instance = this
  instance.state.connection.isConnected = isConnected
  instance.setVariableValues({ [variableType.connected]: isConnected })
  instance.checkFeedbacks(feedbackType.isConnected)
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

  const previous = instance.state.room
  const isTimeOfDayChange = updatedState.roomTimezone !== previous.roomTimezone
    || updatedState.roomTodFormat !== previous.roomTodFormat
  const isOvertimeChange = updatedState.roomOvertimePrefix !== previous.roomOvertimePrefix
    || updatedState.roomOvertimeBehavior !== previous.roomOvertimeBehavior

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

  if (isTimeOfDayChange) {
    updateCurrentTimerState.call(instance)
    updateNextTimerState.call(instance)
  }

  if (isTimeOfDayChange || isOvertimeChange) {
    updateClock.call(instance)
    updatePlaybackState.call(instance)
  }
}

/**
 * @param { PlaybackState } [newState]
 * @this {ModuleInstance}
 * @returns {void}
 */
export function updatePlaybackState (newState) {

  const instance = this

  const { roomTimezone, roomTodFormat, roomOvertimePrefix, roomOvertimeBehavior } = instance.state.room
  const updatedState = createTimeset(newState || instance.state.playback_status, roomOvertimePrefix)

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

  const timeDisplay = formatTimeDisplay(updatedState, {
    appearance: instance.state.current_timer.appearance,
    timezone: roomTimezone || 'UTC',
    todFormat: roomTodFormat,
    overtimePrefix: roomOvertimePrefix,
    overtimeBehavior: roomOvertimeBehavior,
  })

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
    [variableType.running]: updatedState.isRunning,
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
  const todFormat = instance.state.room?.roomTodFormat
  const start = timerToStartDate(updatedState, timezone)

  const labels = updatedState.labels || []

  instance.setVariableValues({
    [variableType.currentTimerId]: updatedState._id,
    [variableType.currentTimerName]: updatedState.name,
    [variableType.currentTimerIndex]: updatedState.index ?? '',
    [variableType.currentTimerGroup]: updatedState.group?.title ?? '',
    [variableType.currentTimerGroupId]: updatedState.group?._id ?? '',
    [variableType.currentTimerGroupColor]: updatedState.group?.color ?? '',
    [variableType.currentTimerNotes]: updatedState.notes,
    [variableType.currentTimerSpeaker]: updatedState.speaker,
    [variableType.currentTimerDuration]: updatedState.duration,
    [variableType.currentTimerDurationAsMs]: durationToMs(updatedState.duration) ?? '',
    [variableType.currentTimerAppearance]: timerAppearancesLabels[updatedState.appearance] ?? '',
    [variableType.currentTimerStartTime]: start ? formatTod(start, { timezone, todFormat }) : '',
    [variableType.currentTimerStartTime12h]: start ? formatTimeOfDay(start, { timezone, format: '12h' }) : '',
    [variableType.currentTimerStartTime24h]: start ? formatTimeOfDay(start, { timezone, format: '24h' }) : '',
    [variableType.currentTimerLabels]: labels.map(l => l.name).join(', '),
    [variableType.currentTimerLabel1]: labels[0]?.name || '',
    [variableType.currentTimerLabel2]: labels[1]?.name || '',
    [variableType.currentTimerLabel3]: labels[2]?.name || '',
    [variableType.currentTimerFields]: formatFieldsJson(updatedState.fields),
  })

  syncFieldVariables(instance, buildCurrentFieldValues, updatedState.fields)
  releasePendingStart.call(instance)

  instance.checkFeedbacks(
    feedbackType.isWarningYellow,
    feedbackType.isWarningRed,
    feedbackType.groupColor,
  )

  // Handle appearance change
  if (isAppearanceChange && !instance.state.playback_status.isRunning) {
    updatePlaybackState.call(instance)
  }
}

/**
 * The start waits for the timer it started, so a trigger on `lastStartedAt` reads that timer's variables.
 *
 * @param {StatusData} status - `playback_status` payload
 * @this {ModuleInstance}
 * @returns {void}
 */
export function updateStartSignal (status) {
  const instance = this
  if (isLiveFreshStart(status, instance.state.start_signal.lastSeenStart)) {
    instance.state.start_signal = {
      lastSeenStart: status.start,
      pending: { timerId: status.timer_id, startedAt: status.start },
    }
  }
  releasePendingStart.call(instance)
}

/**
 * @this {ModuleInstance}
 * @returns {void}
 */
function releasePendingStart () {
  const instance = this
  const { pending } = instance.state.start_signal
  if (!pending || pending.timerId !== instance.state.current_timer._id) return
  instance.state.start_signal.pending = null
  instance.setVariableValues({ [variableType.lastStartedAt]: pending.startedAt })
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
  const todFormat = instance.state.room?.roomTodFormat
  const start = timerToStartDate(updatedState, timezone)

  const labels = updatedState.labels || []

  instance.setVariableValues({
    [variableType.nextTimerId]: updatedState._id,
    [variableType.nextTimerName]: updatedState.name,
    [variableType.nextTimerIndex]: updatedState.index ?? '',
    [variableType.nextTimerGroup]: updatedState.group?.title ?? '',
    [variableType.nextTimerGroupId]: updatedState.group?._id ?? '',
    [variableType.nextTimerGroupColor]: updatedState.group?.color ?? '',
    [variableType.nextTimerNotes]: updatedState.notes,
    [variableType.nextTimerSpeaker]: updatedState.speaker,
    [variableType.nextTimerDuration]: updatedState.duration,
    [variableType.nextTimerDurationAsMs]: durationToMs(updatedState.duration) ?? '',
    [variableType.nextTimerAppearance]: timerAppearancesLabels[updatedState.appearance] ?? '',
    [variableType.nextTimerStartTime]: start ? formatTod(start, { timezone, todFormat }) : '',
    [variableType.nextTimerStartTime12h]: start ? formatTimeOfDay(start, { timezone, format: '12h' }) : '',
    [variableType.nextTimerStartTime24h]: start ? formatTimeOfDay(start, { timezone, format: '24h' }) : '',
    [variableType.nextTimerLabels]: labels.map(l => l.name).join(', '),
    [variableType.nextTimerLabel1]: labels[0]?.name || '',
    [variableType.nextTimerLabel2]: labels[1]?.name || '',
    [variableType.nextTimerLabel3]: labels[2]?.name || '',
    [variableType.nextTimerFields]: formatFieldsJson(updatedState.fields),
  })

  syncFieldVariables(instance, buildNextFieldValues, updatedState.fields)
  instance.checkFeedbacks(feedbackType.groupColor)
}

/**
 * @param { MessageState } [newState]
 * @this {ModuleInstance}
 * @returns {void}
 */
export function updateMessageState (newState) {

  const instance = this

  const updatedState = {
    ...instance.state.message,
    ...newState,
  }

  instance.state.message = updatedState

  // The API keeps sending the message after it was hidden, but a message that
  // isn't on the viewer is not the "current" message.
  const showing = updatedState.showing

  instance.setVariableValues({
    [variableType.currentMessageId]: showing ? updatedState._id || '' : '',
    [variableType.currentMessageText]: showing ? updatedState.text : '',
    [variableType.currentMessageColor]: showing ? updatedState.color : '',
  })

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
