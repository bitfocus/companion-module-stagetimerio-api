/**
 * Copied from @stagetimerio/timeutils - src/millisecondsToDhms.ts
 *
 * @typedef {Object} DHMS
 * @property {number} negative - 1 if overtime, 0 otherwise
 * @property {number} days
 * @property {number} hours
 * @property {number} minutes
 * @property {number} seconds
 * @property {number} decimals
 */

/**
 * @param {number} [ms=0]
 * @param {Object} [options]
 * @param {boolean} [options.ceil=true]
 * @returns {DHMS}
 */
export function millisecondsToDhms (ms = 0, { ceil = true } = {}) {
  const negative = ms < 0 ? 1 : 0
  const decimalMs = Math.abs(Math.floor(ms % 1000)) || 0
  const round = ceil ? Math.ceil : Math.floor
  const roundedMs = Math.abs(round(ms / 1000)) * 1000

  return {
    negative,
    days: Math.floor(roundedMs / 86400000) || 0,
    hours: Math.floor((roundedMs % 86400000) / 3600000) || 0,
    minutes: Math.floor((roundedMs % 3600000) / 60000) || 0,
    seconds: Math.floor((roundedMs % 60000) / 1000) || 0,
    decimals: Math.floor(decimalMs / 100),
  }
}
