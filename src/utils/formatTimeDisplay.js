import { formatTimeOfDay, millisecondsToDhms, dhmsToDigits } from '../timeutils/index.js'
import { timerAppearances } from '../config.js'

function floor50 (num) {
  return Math.floor(num / 50) * 50
}

/**
 * @param  {PlaybackState} timeset
 * @param  {string} appearance
 * @param  {string} timezone
 * @return {object}
 */
export function formatTimeDisplay (
  timeset,
  {
    appearance = timerAppearances.COUNTDOWN,
    timezone = 'UTC',
  } = {},
) {
  let display = ''
  let displayMs
  let displayDhms

  switch (appearance) {
    case timerAppearances.HIDDEN:
      break
    case timerAppearances.TOD:
      display = formatTimeOfDay(new Date(), { timezone })
      break
    case timerAppearances.COUNTUP:
    case timerAppearances.COUNTUP_TOD:
      displayMs = floor50(timeset.totalAsMs - timeset.remainingAsMs)
      displayDhms = millisecondsToDhms(displayMs, { ceil: false })
      display = dhmsToDigits(displayDhms).join('')
      break
    case timerAppearances.COUNTDOWN:
    case timerAppearances.COUNTDOWN_TOD:
    default:
      displayMs = floor50(timeset.remainingAsMs)
      displayDhms = millisecondsToDhms(displayMs, { ceil: true })
      display = dhmsToDigits(displayDhms).join('')
      break
  }

  const [seconds, minutes, hours] = display.split(':').reverse()

  return {
    display: display,
    displayHours: hours || '0',
    displayMinutes: minutes || '00',
    displaySeconds: seconds || '00',
  }
}
