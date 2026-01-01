/**
 * Copied from @stagetimerio/timeutils - src/formatTimeOfDay.ts
 * Simplified to use Intl.DateTimeFormat instead of date-fns
 */

/**
 * Format the time of day with timezone and format
 *
 * @param {Date} date
 * @param {Object} [options]
 * @param {string} [options.timezone='UTC']
 * @param {'12h'|'24h'} [options.format='24h']
 * @returns {string}
 */
export function formatTimeOfDay (
  date,
  {
    timezone = 'UTC',
    format = '24h',
  } = {},
) {
  if (!(date instanceof Date)) throw new Error('`date` must be an instance of Date')

  try {
    const options = {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: format === '12h',
    }

    const formatted = new Intl.DateTimeFormat('en-US', options).format(date)

    // For 24h format, remove leading zero from hour if present
    if (format === '24h') {
      return formatted.replace(/^0/, '')
    }

    return formatted
  } catch {
    return '--:--'
  }
}
