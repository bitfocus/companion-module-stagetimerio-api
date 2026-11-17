const AUTO_FORMATS = {
  AUTO: { h12: 'h:mm:ss aa', h24: 'H:mm:ss' },
  AUTO_HHMM: { h12: 'h:mm aa', h24: 'H:mm' },
}

/**
 * @returns {boolean} True when the locale of the Companion machine uses a 12-hour clock.
 */
export function localeUsesH12 () {
  const { hourCycle } = new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).resolvedOptions()
  return hourCycle === 'h11' || hourCycle === 'h12'
}

/**
 * Format a time of day with a Stagetimer `todFormat`.
 *
 * @param {Date} date
 * @param {object} [options]
 * @param {string} [options.timezone='UTC']
 * @param {string} [options.todFormat='AUTO'] - `AUTO`, `AUTO_HHMM` or a date-fns format string from `todFormats`. Empty means `AUTO`.
 * @param {boolean} [options.h12] - Resolves `AUTO`. Defaults to the locale of the Companion machine.
 * @returns {string} Never empty. An unknown timezone formats as UTC.
 */
export function formatTod (date, { timezone = 'UTC', todFormat = 'AUTO', h12 = localeUsesH12() } = {}) {
  const auto = AUTO_FORMATS[todFormat || 'AUTO']
  const format = auto ? (h12 ? auto.h12 : auto.h24) : todFormat
  const isH12 = format.startsWith('h')

  const options = { hour: 'numeric', minute: '2-digit', second: '2-digit', hourCycle: isH12 ? 'h12' : 'h23' }
  let formatter
  try {
    formatter = new Intl.DateTimeFormat('en-US', { ...options, timeZone: timezone || 'UTC' })
  } catch {
    formatter = new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'UTC' })
  }
  const parts = Object.fromEntries(formatter.formatToParts(date).map(({ type, value }) => [type, value]))

  const hour = format.startsWith('HH') ? parts.hour.padStart(2, '0') : String(Number(parts.hour))
  let tod = `${hour}:${parts.minute}`
  if (format.includes(':ss')) tod += `:${parts.second}`
  if (format.endsWith('aa')) tod += ` ${parts.dayPeriod}`
  return tod
}
