/**
 * Copied from @stagetimerio/timeutils - src/getToday.ts
 */

import { isValidTimezone } from './isValidTimezone.js'
import { getTimezoneOffset } from './getTimezoneOffset.js'

/**
 * Get the Date of 0:00 today in the given timezone
 *
 * @param {string} [timezone]
 * @param {Date} [now]
 * @returns {Date}
 */
export function getToday (timezone = undefined, now = undefined) {
  if (now !== undefined && !(now instanceof Date)) {
    throw new Error('The 2nd argument must be undefined or an instance of date.')
  }

  const tz = timezone && isValidTimezone(timezone) ? timezone : 'UTC'
  const inUTC = now || new Date()

  const inputOffset = tz ? getTimezoneOffset(tz, inUTC) : 0
  const inZone = new Date(inUTC.getTime() + inputOffset)

  inZone.setUTCHours(0, 0, 0, 0)

  const outputOffset = tz ? getTimezoneOffset(tz, inZone) : 0
  return new Date(inZone.getTime() - outputOffset)
}
