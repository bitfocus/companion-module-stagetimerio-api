import { format } from 'date-fns'

/**
 * @param {number} number
 * @returns {boolean}
 */
export function isNegative(number) {
  return Math.sign(number) == -1 ? true : false
}

//
// Utility functions from Stagetimer.io
//

/**
 * Correction for millisecond rounding
 *
 * @param {number} ms Duration of time as milliseconds.
 * @returns {number}
 */
function floor50(ms) {
  return Math.floor(ms / 50) * 50
}

/**
 * Creates new zeroed timestamp
 *
 * @returns {number}
 */
function zero() {
  return new Date().setHours(0, 0, 0, 0)
}

/**
 * Adapted from `createMoment()` in Stagetimer codebase.
 *
 * @param {PlaybackState} timeset
 * @param {number} now Date in ms
 * @returns {PlaybackState}
 */
export function createTimeset(timeset, now = Date.now()) {
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

  return {
    ...timeset,
    total: floor50(total),
    remaining: floor50(remaining),
  }
}

/**
 * Formats a duration of time (in milliseconds) into a human-readable string.
 * Adapted from `formatDuration()` in Stagetimer codebase.
 *
 * @param {number} milliseconds - The duration in milliseconds to format.
 * @param {object} [options] - Formatting options.
 * @param {boolean} [options.includeH] - Whether to include hours in the output.
 * @param {boolean} [options.includeS] - Whether to include seconds in the output.
 * @param {boolean} [options.includeMs] - Whether to include milliseconds in the output.
 * @param {boolean} [options.includePrefix] - Whether to include a '-' prefix for negative durations.
 * @param {string} [options.customFormat] - A custom format string to use instead of the default format.
 *
 * @returns {string} The formatted duration string.
 */
export function formatDuration(
  milliseconds = 0,
  { includeH = true, includeS = true, includeMs = false, includePrefix = true, customFormat = null } = {}
) {
  // Return an empty string if milliseconds is not a number or is NaN
  if (typeof milliseconds !== 'number' || isNaN(milliseconds)) return ''

  const withMs = includeMs
  const withSec = includeS || Math.abs(milliseconds) < 3600000
  const withHrs = includeH || Math.abs(milliseconds) >= 3600000

  // Determine the prefix of the output string.
  const prefix = isNegative(milliseconds) ? '-' : ''

  // Determine the format string based on the options.
  let formatStr = 'm'
  if (withMs) formatStr = 'm:ss.S'
  else if (withSec) formatStr = 'm:ss'
  if (withHrs) formatStr = 'm' + formatStr

  // Format the duration into the output string
  let output = format(zero() + Math.abs(milliseconds), customFormat || formatStr)

  // Add hours to the output if necessary
  if (withHrs) {
    output = Math.floor(Math.abs(milliseconds) / 3600000) + ':' + output
  }

  // Add optional prefix
  if (includePrefix) {
    output = prefix + output
  }

  return output
}
