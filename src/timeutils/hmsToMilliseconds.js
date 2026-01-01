/**
 * Copied from @stagetimerio/timeutils - src/hmsToMilliseconds.ts
 *
 * @param {Object} params
 * @param {number} [params.hours=0]
 * @param {number} [params.minutes=0]
 * @param {number} [params.seconds=0]
 * @returns {number}
 */
export function hmsToMilliseconds ({ hours = 0, minutes = 0, seconds = 0 } = {}) {
  return hours * 3600000 + minutes * 60000 + seconds * 1000
}
