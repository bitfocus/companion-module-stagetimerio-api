import { millisecondsToDhms } from '../timeutils/index.js'
import { dhmsToFormatted } from './dhmsToFormatted.js'

/**
 * Adapted from `createMoment()` in Stagetimer codebase.
 *
 * @param {PlaybackState} timeset
 * @param {number} now Date in ms
 * @returns {PlaybackState}
 */
export function createTimeset (timeset) {
  const tenMin = 60000
  const now = Date.now() - timeset.serverTimeDiff

  // Calculate 'total' (round 10 ms due to inaccuracies)
  const total = timeset.deadline ? timeset.deadline - timeset.kickoff : tenMin

  // Calculate time remaining
  let remaining
  if (!timeset.deadline) remaining = tenMin
  else if (timeset.isRunning) remaining = timeset.deadline - now
  else remaining = timeset.deadline - timeset.lastStop

  // Correct edge-case where left > total
  if (remaining > total) remaining = total

  // Prepare total
  const totalAsMsRounded = Math.ceil(total/1000) * 1000
  const totalAsDhms = millisecondsToDhms(totalAsMsRounded)
  const totalFormatted = dhmsToFormatted(totalAsDhms)

  // Prepare remaining
  const remainingAsMsRounded = Math.ceil(remaining/1000) * 1000
  const remainingAsDhms = millisecondsToDhms(remainingAsMsRounded)
  const remainingFormatted = dhmsToFormatted(remainingAsDhms)

  return {
    ...timeset,
    // Total
    totalAsMs       : totalAsMsRounded,
    totalAsHuman    : totalFormatted.human,
    // Remaining
    remainingAsMs   : remainingAsMsRounded,
    remainingAsHuman: remainingFormatted.human,
    remainingHours  : remainingFormatted.hhh,
    remainingMinutes: remainingFormatted.mm,
    remainingSeconds: remainingFormatted.ss,
  }
}
