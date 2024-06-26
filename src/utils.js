import { parseDateAsToday, parseDate, hmsToMilliseconds, millisecondsToDhms, dhmsToDigits, formatTimeOfDay } from '@stagetimerio/timeutils'
import { timerAppearances } from '@stagetimerio/shared'

/**
 * Converts an enum object to an array of objects for creating Companion action dropdowns.
 *
 * @param {Object.<string, string>} enumObj
 * @returns {CompanionDropdownOptions}
 */
export function createDropdownOptions (enumObj) {
  const optionsList = Object.entries(enumObj).map(([key, val]) => ({ id: key, label: val }))

  return [
    { id: 0, label: '(Default)' },
    ...optionsList,
  ]
}

/**
 * Pad with zeroes
 *
 * @param {number} number
 * @returns {string}
 */
function zeroPad (number) {
  return String(number).padStart(2, '0')
}

/**
 * Formats a Dhms object into formatted segments.
 *
 * @param {DhmsObj} dhms
 * @returns {FormattedDhmsObj}
 */
export function dhmsToFormatted (dhms) {
  const prefix = dhms.negative ? '+' : ''

  const hhh = `${prefix}${dhms.hours + (dhms.days * 24)}`
  const mm  = zeroPad(dhms.minutes)
  const ss  = zeroPad(dhms.seconds)

  return {
    human: `${hhh}:${mm}:${ss}`,
    hhh,
    mm,
    ss,
  }
}

/**
 * Adapted from `createMoment()` in Stagetimer codebase.
 *
 * @param {PlaybackState} timeset
 * @param {number} now Date in ms
 * @returns {PlaybackState}
 */
export function createTimeset (timeset) {
  const tenMin = 60000
  const now = Date.now() - timeset.serverTimeDiff

  // Calculate 'total' (round 10 ms due to inaccuracies)
  const total = timeset.deadline ? timeset.deadline - timeset.kickoff : tenMin

  // Calculate time remaining
  let remaining
  if (!timeset.deadline) remaining = tenMin
  else if (timeset.isRunning) remaining = timeset.deadline - now
  else remaining = timeset.deadline - timeset.lastStop

  // Correct edge-case where left > total
  if (remaining > total) remaining = total

  // Prepare total
  const totalAsMsRounded = Math.ceil(total/1000) * 1000
  const totalAsDhms = millisecondsToDhms(totalAsMsRounded)
  const totalFormatted = dhmsToFormatted(totalAsDhms)

  // Prepare remaining
  const remainingAsMsRounded = Math.ceil(remaining/1000) * 1000
  const remainingAsDhms = millisecondsToDhms(remainingAsMsRounded)
  const remainingFormatted = dhmsToFormatted(remainingAsDhms)

  return {
    ...timeset,
    // Total
    totalAsMs       : totalAsMsRounded,
    totalAsHuman    : totalFormatted.human,
    // Remaining
    remainingAsMs   : remainingAsMsRounded,
    remainingAsHuman: remainingFormatted.human,
    remainingHours  : remainingFormatted.hhh,
    remainingMinutes: remainingFormatted.mm,
    remainingSeconds: remainingFormatted.ss,
  }
}

/**
 * @param  {PlaybackState} timeset
 * @param  {string} appearance
 * @param  {string} timezone
 * @return {object}
 */
export function formatTimeDisplay (
  timeset,
  {
    appearance = timerAppearances.COUNTDOWN,
    timezone = 'UTC',
  } = {},
) {
  let display = ''
  let displayMs
  let displayDhms

  switch (appearance) {
    case timerAppearances.HIDDEN:
      break
    case timerAppearances.TOD:
      display = formatTimeOfDay(new Date(), { timezone })
      break
    case timerAppearances.COUNTUP:
    case timerAppearances.COUNTUP_TOD:
      displayMs = floor50(timeset.totalAsMs - timeset.remainingAsMs)
      displayDhms = millisecondsToDhms(displayMs, { ceil: false })
      display = dhmsToDigits(displayDhms).join('')
      break
    case timerAppearances.COUNTDOWN:
    case timerAppearances.COUNTDOWN_TOD:
    default:
      displayMs = floor50(timeset.remainingAsMs)
      displayDhms = millisecondsToDhms(displayMs, { ceil: true })
      display = dhmsToDigits(displayDhms).join('')
      break
  }

  const [seconds, minutes, hours] = display.split(':').reverse()

  return {
    display: display,
    displayHours: hours || '0',
    displayMinutes: minutes || '00',
    displaySeconds: seconds || '00',
  }
}

/**
 * @param  {TimerState} timer
 * @param  {string} timezone
 * @return {Date}
 */
export function timerToStartDate (timer, timezone) {
  let start
  if (timer.start_time) start = parseDateAsToday(timer.start_time, { timezone })
  if (timer.start_time_uses_date) start = parseDate(timer.start_time, timezone)
  return start
}

/**
 * @param  {string} duration - In the format of 'hh:mm:ss'
 * @return {number}
 */
export function durationToMs (duration) {
  if (typeof duration !== 'string' || !duration) return
  const [hours, minutes, seconds] = duration.split(':')
  return hmsToMilliseconds({ hours, minutes, seconds })
}

function floor50 (num) {
  return Math.floor(num / 50) * 50
}
