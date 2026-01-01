/**
 * Copied from @stagetimerio/timeutils - src/parseDate.ts
 * Simplified to not require date-fns
 */

import { isValidDate } from './isValidDate.js'
import { getTimezoneOffset } from './getTimezoneOffset.js'

/**
 * Parses a given input into a date object.
 *
 * @param {unknown} rawInput
 * @param {string} [tz]
 * @returns {Date|null}
 */
export function parseDate (rawInput, tz = undefined) {
  if (typeof rawInput === 'boolean') return null
  if (rawInput === null || rawInput === undefined) return null
  if (isValidDate(rawInput)) return new Date(rawInput)

  if (typeof rawInput === 'string') {
    // Test for yyyy-MM-dd
    const regex1 = /^(\d{4})-(\d{2})-(\d{2})$/
    const match1 = rawInput.match(regex1)
    if (match1) {
      const [, year, month, day] = match1
      const inSystemZone = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      if (!tz) return inSystemZone
      const inUTC = new Date(inSystemZone.getTime() - inSystemZone.getTimezoneOffset() * 60000)
      const inOutZone = new Date(inUTC.getTime() + getTimezoneOffset(tz, inUTC))
      return inOutZone
    }

    // Test for yyyy-MM-ddTHH:mm:ss
    const regex2 = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/
    const match2 = rawInput.match(regex2)
    if (match2) {
      const [, year, month, day, hours, minutes, seconds] = match2
      return new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes),
        parseInt(seconds),
      )
    }
  }

  const parsedNative = new Date(rawInput)
  if (isValidDate(parsedNative)) return parsedNative

  return null
}
