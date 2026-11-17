import { millisecondsToDhms, dhmsToDigits } from '../timeutils/index.js'
import { timerAppearances } from '../config.js'
import { formatTod } from './formatTod.js'

function floor50 (num) {
  return Math.floor(num / 50) * 50
}

/**
 * The time as a Stagetimer output shows it.
 *
 * @param {PlaybackState} timeset
 * @param {object} [options]
 * @param {string} [options.appearance]
 * @param {string} [options.timezone='UTC']
 * @param {string} [options.todFormat='AUTO']
 * @param {string} [options.overtimePrefix='+']
 * @param {string} [options.overtimeBehavior='continue'] - `continue`, `stop` (hold at zero) or `hide`
 * @return {{ display: string, displayHours: string, displayMinutes: string, displaySeconds: string }}
 */
export function formatTimeDisplay (
  timeset,
  {
    appearance = timerAppearances.COUNTDOWN,
    timezone = 'UTC',
    todFormat = 'AUTO',
    overtimePrefix = '+',
    overtimeBehavior = 'continue',
  } = {},
) {
  const isOver = timeset.remainingAsMs <= 0
  const hide = appearance === timerAppearances.HIDDEN || (isOver && overtimeBehavior === 'hide')
  const stop = isOver && overtimeBehavior === 'stop'
  let display = ''

  switch (appearance) {
    case timerAppearances.HIDDEN:
      break
    case timerAppearances.TOD:
      display = formatTod(new Date(), { timezone, todFormat })
      break
    case timerAppearances.COUNTUP:
    case timerAppearances.COUNTUP_TOD: {
      if (hide) break
      const ms = stop ? timeset.totalAsMs : floor50(timeset.totalAsMs - timeset.remainingAsMs)
      display = dhmsToDigits(millisecondsToDhms(ms, { ceil: false })).join('')
      break
    }
    case timerAppearances.COUNTDOWN:
    case timerAppearances.COUNTDOWN_TOD:
    default: {
      if (hide) break
      const ms = stop ? 0 : floor50(timeset.remainingAsMs)
      display = dhmsToDigits(millisecondsToDhms(ms, { ceil: true }), { overtimePrefix }).join('')
      break
    }
  }

  if (!display) return { display, displayHours: '', displayMinutes: '', displaySeconds: '' }

  const [seconds, minutes, hours] = display.split(':').reverse()

  return {
    display,
    displayHours: hours || '0',
    displayMinutes: minutes || '00',
    displaySeconds: seconds || '00',
  }
}
