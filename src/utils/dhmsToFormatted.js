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
 * @param {string} [overtimePrefix='+']
 * @returns {FormattedDhmsObj}
 */
export function dhmsToFormatted (dhms, overtimePrefix = '+') {
  const prefix = dhms.negative ? overtimePrefix : ''

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
