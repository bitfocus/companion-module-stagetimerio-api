/**
 * Copied from @stagetimerio/timeutils - src/formatTimezone.ts
 * Only 'abbr' format is used in this codebase
 */

import { abbreviations } from './abbreviations.js'

/**
 * Formats an IANA timezone string into an abbreviation.
 *
 * @param {string} timezone - The IANA timezone string, e.g., 'America/Los_Angeles'
 * @param {'abbr'} [_format='abbr'] - Only 'abbr' format is supported
 * @param {Date} [date] - The reference date
 * @returns {string}
 */
export function formatTimezone (timezone, _format = 'abbr', date = new Date()) {
  if (!timezone) return ''

  const formatOpts = { timeZone: timezone, timeZoneName: 'long' }
  const long = new Intl.DateTimeFormat('en-US', formatOpts).format(date).split(', ')[1]
  if (!long) return ''

  const abbr = abbreviations[long] || abbreviations[long.replace('Standard ', '')]
  return abbr || ''
}
