import { parseDateAsToday, parseDate } from '../timeutils/index.js'

/**
 * @param  {TimerState} timer
 * @param  {string} timezone
 * @return {Date}
 */
export function timerToStartDate (timer, timezone) {
  let start
  if (timer.start_time) start = parseDateAsToday(timer.start_time, { timezone })
  if (timer.start_time_uses_date) start = parseDate(timer.start_time, timezone)
  return start
}
