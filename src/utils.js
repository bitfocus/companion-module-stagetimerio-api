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
 * Converts a duration of time (in milliseconds) into a Dhms object.
 * Adapted from `millisecondsToDhms()` in Stagetimer codebase.
 *
 * @param {number} ms A duration as milliseconds
 * @returns {DhmsObj}
 */
export function millisecondsToDhms (ms = 0) {
  const negative = ms < 0 ? 1 : 0
  const absMs = Math.abs(ms)

  return {
    negative: negative,
    days    : Math.floor(absMs / 86400000) || 0,
    hours   : Math.floor((absMs % 86400000) / 3600000) || 0,
    minutes : Math.floor((absMs % 3600000) / 60000) || 0,
    seconds : Math.floor((absMs % 60000) / 1000) || 0,
    hoursSum: Math.floor(absMs / 3600000) || 0,
  }
}

/**
 * Formats a Dhms object into formatted segments.
 *
 * @param {DhmsObj} dhms
 * @returns {FormattedDhmsObj}
 */
export function dhmsToFormatted (dhms) {
  const prefix = dhms.negative ? '-' : ''

  const hhh = `${prefix}${dhms.hoursSum}`
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
export function createTimeset (timeset, now = Date.now()) {
  const tenMin = 60000
  if (now <= 0) now = Date.now()

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
