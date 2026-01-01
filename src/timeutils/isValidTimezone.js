/**
 * Copied from @stagetimerio/timeutils - src/isValidTimezone.ts
 *
 * Checks if a given time zone is valid.
 *
 * @param {string} tz - The time zone identifier to be validated.
 * @returns {boolean} - Returns true if the time zone is valid, otherwise false.
 */
export function isValidTimezone (tz) {
  if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
    throw new Error('Time zones are not available in this environment')
  }

  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz })
    return true
  } catch {
    return false
  }
}
