/**
 * Copied from @stagetimerio/timeutils - src/isValidDate.ts
 *
 * @param {unknown} date
 * @returns {boolean}
 */
export function isValidDate (date) {
  return date instanceof Date && !isNaN(date.getTime())
}
