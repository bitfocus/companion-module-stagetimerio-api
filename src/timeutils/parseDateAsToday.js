/**
 * Copied from @stagetimerio/timeutils - src/parseDateAsToday.ts
 */

import { parseDate } from './parseDate.js'
import { applyDate } from './applyDate.js'
import { getToday } from './getToday.js'

/**
 * Parses a given timestamp and sets it as today's date.
 *
 * @param {Date|string} rawInput
 * @param {Object} [options]
 * @param {string} [options.timezone]
 * @param {Date} [options.after]
 * @param {Date} [options.now]
 * @returns {Date}
 */
export function parseDateAsToday (
  rawInput,
  {
    timezone = undefined,
    after = undefined,
    now = undefined,
  } = {},
) {
  if (after !== undefined && !(after instanceof Date)) {
    throw new Error('The `after` argument must be undefined or an instance of Date.')
  }
  if (now !== undefined && !(now instanceof Date)) {
    throw new Error('The `now` argument must be undefined or an instance of Date.')
  }

  const today = getToday(timezone, now)
  const parsedInput = parseDate(rawInput, timezone)

  const dateToApply = after && after > today ? after : today
  let output = applyDate(parsedInput, dateToApply, timezone)

  // Add one day if output is before `after`
  if (output && after && output < after) {
    output = new Date(output.getTime() + 86400000)
  }

  return output
}
