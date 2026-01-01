/**
 * Copied from @stagetimerio/timeutils - src/getTimezoneOffset.ts
 * Simplified to only use Intl (no date-fns fallback needed for modern environments)
 *
 * Get the timezone offset for a given date and timezone.
 *
 * @param {string} timezone - The IANA timezone string
 * @param {Date} date - The date to get the offset for
 * @returns {number} The offset in milliseconds
 */
export function getTimezoneOffset (timezone, date) {
  if (!(date instanceof Date)) throw new Error('`date` must be a valid Date')
  if (typeof timezone !== 'string') throw new Error('`timezone` must be provided')

  const options = {
    timeZone: timezone,
    timeZoneName: 'longOffset',
  }
  const formatted = new Intl.DateTimeFormat('en', options).format(date)
  const offsetStr = formatted.split(', ')[1]

  const match = offsetStr?.match(/GMT(?:([+-]\d{2}):(\d{2}))?/)
  if (!match) throw new Error('Unable to parse timezone offset')
  if (!match[1]) return 0

  const hours = parseInt(match[1])
  const minutes = parseInt(match[2] ?? '0')
  return (hours * 60 + (hours < 0 ? -minutes : minutes)) * 60 * 1000
}
