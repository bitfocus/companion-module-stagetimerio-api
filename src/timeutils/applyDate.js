/**
 * Copied from @stagetimerio/timeutils - src/applyDate.ts
 */

import { isValidDate } from './isValidDate.js'
import { parseDate } from './parseDate.js'
import { getTimezoneOffset } from './getTimezoneOffset.js'

/**
 * Apply year-month-day to a JS date.
 *
 * @param {Date|string|null} time
 * @param {Date|string|null} date
 * @param {string} [timezone]
 * @returns {Date|null}
 */
export function applyDate (time, date, timezone = undefined) {
  const timeInUTC = parseDate(time)
  const dateInUTC = parseDate(date)
  const tz = timezone || 'UTC'
  if (!isValidDate(timeInUTC)) return null
  if (!isValidDate(dateInUTC)) return timeInUTC

  const timeOffset = getTimezoneOffset(tz, timeInUTC)
  const timeInZone = new Date(timeInUTC.getTime() + timeOffset)
  const dateOffset = getTimezoneOffset(tz, dateInUTC)
  const dateInZone = new Date(dateInUTC.getTime() + dateOffset)

  const outputInZone = new Date(timeInZone)
  outputInZone.setUTCDate(1)
  outputInZone.setUTCFullYear(dateInZone.getUTCFullYear())
  outputInZone.setUTCMonth(dateInZone.getUTCMonth())
  outputInZone.setUTCDate(dateInZone.getUTCDate())

  const outputOffset = getTimezoneOffset(tz, new Date(outputInZone.getTime() - dateOffset))
  return new Date(outputInZone.getTime() - outputOffset)
}
