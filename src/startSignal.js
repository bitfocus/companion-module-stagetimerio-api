/** An older start is a connect or a reconnect. A late cue is worse than a missed one. */
const LIVE_START_MAX_AGE_MS = 2000

/**
 * A fresh start sets `start` and `pause` to the same time. A resume moves `start` back and keeps `pause`.
 *
 * @param {Pick<StatusData, 'running' | 'start' | 'pause' | 'server_time'>} status - `playback_status` payload
 * @param {number} lastSeenStart - `start` of the previous live fresh start
 * @returns {boolean}
 */
export function isLiveFreshStart ({ running, start, pause, server_time }, lastSeenStart) {
  return running
    && start === pause
    && start !== lastSeenStart
    && server_time - start < LIVE_START_MAX_AGE_MS
}
