import { hmsToMilliseconds } from '../timeutils/index.js'

/**
 * @param  {string} duration - In the format of 'hh:mm:ss'
 * @return {number}
 */
export function durationToMs (duration) {
  if (typeof duration !== 'string' || !duration) return
  const [hours, minutes, seconds] = duration.split(':')
  return hmsToMilliseconds({ hours, minutes, seconds })
}
