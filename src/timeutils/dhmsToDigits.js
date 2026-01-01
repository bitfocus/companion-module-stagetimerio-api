/**
 * Copied from @stagetimerio/timeutils - src/dhmsToDigits.ts
 */

const COUNTDOWN_FORMAT_DEFAULT = 'HHHMMSS'

const ones = (num) => Math.floor(num % 10)
const tens = (num) => Math.floor((num / 10) % 10)
const hundreds = (num) => Math.floor((num / 100) % 10)
const thousands = (num) => Math.floor((num / 1000) % 10)

/**
 * Convert duration in days, hours, minutes, and seconds to an array of digits and symbols.
 *
 * @param {import('./millisecondsToDhms.js').DHMS} dhms
 * @param {Object} [options]
 * @param {string} [options.format='HHHMMSS']
 * @param {string} [options.overtimePrefix='+']
 * @returns {(string|number)[]}
 */
export function dhmsToDigits (
  dhms,
  {
    format = COUNTDOWN_FORMAT_DEFAULT,
    overtimePrefix = '+',
  } = {},
) {
  const isZero = dhms.days + dhms.hours + dhms.minutes + dhms.seconds === 0
  const showDays = format.includes('D')
  const showHours = format.includes('H')
  const showMinutes = format.includes('M')
  const showSeconds = format.includes('S')
  const showDecimals = format.includes('F')
  const sepLetter = format.includes('L')
  const digits = []

  // Prefix for negative (overtime) durations
  if (dhms.negative && (showDecimals || !isZero)) {
    digits.push(overtimePrefix)
  }

  // Days
  let days = dhms.days
  if (!showHours && !showMinutes && !showSeconds && dhms.hours + dhms.minutes + dhms.seconds)
    days += 1
  if (showDays && (days || (!showHours && !showMinutes && !showSeconds))) {
    if (days > 100) digits.push(hundreds(days))
    if (days > 10) digits.push(tens(days))
    digits.push(ones(days))
    if (sepLetter) digits.push('d', ' ')
    else digits.push(':')
  }

  // Hours
  let hours = dhms.hours + (showDays ? 0 : days * 24)
  if (!showMinutes && !showSeconds && dhms.minutes + dhms.seconds) hours += 1
  if (showHours && (hours || days || (!showMinutes && !showSeconds))) {
    if (hours >= 100 && !showDays) {
      if (hours > 1000) digits.push(thousands(hours))
      digits.push(hundreds(hours))
    }
    if (hours >= 10 || (showDays && !sepLetter && days > 0)) {
      digits.push(tens(hours))
    }
    digits.push(ones(hours))
    if (sepLetter) digits.push('h', ' ')
    else digits.push(':')
  }

  // Minutes
  let minutes = dhms.minutes + (showHours ? 0 : hours * 60)
  if (!showSeconds && dhms.seconds) minutes += 1
  if (showMinutes) {
    if (minutes || hours) {
      if (minutes >= 100 && !showHours) {
        if (minutes > 1000) digits.push(thousands(minutes))
        digits.push(hundreds(minutes))
      }
      if (minutes >= 10 || (!sepLetter && hours > 0)) {
        digits.push(tens(minutes))
      }
    }
    digits.push(ones(minutes))
    if (sepLetter) digits.push('m', ' ')
    else digits.push(':')
  }

  // Seconds
  const seconds = dhms.seconds + (showMinutes ? 0 : minutes * 60)
  if (showSeconds) {
    if (seconds >= 100 && !showMinutes) {
      if (seconds > 1000) digits.push(thousands(seconds))
      digits.push(hundreds(seconds))
    }
    digits.push(tens(seconds))
    digits.push(ones(seconds))
    if (sepLetter) digits.push('s')
  }

  // Decimals
  if (showDecimals) {
    digits.push('.')
    digits.push(ones(dhms.decimals))
  }

  return digits
}
