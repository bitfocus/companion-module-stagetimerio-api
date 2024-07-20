import { InstanceStatus } from '@companion-module/base'
import { io } from 'socket.io-client'
import {
  updatePlaybackState,
  updateRoomState,
  updateCurrentTimerState,
  updateNextTimerState,
  updateFlashingState,
  updateMessageState,
} from './state.js'
import { actionIdType } from './actions.js'

/** @type {Socket | null} */
let socket = null

/**
 * Enum of allowed Stagetimer.io socket events
 *
 * @readonly
 * @enum {string}
 */
export const stagetimerEvents = {
  playback_status: 'playback_status',
  room: 'room',
  current_timer: 'current_timer',
  next_timer: 'next_timer',
  flash: 'flash',
  message: 'message',
}

/**
 * Disconnect existing Socket.io connection
 *
 * @returns {void}
 */
export function socketStop () {
  if (socket) {
    socket.disconnect()
  }
}

/**
 * Configure and start Socket.io connection
 *
 * @param {ModuleInstance} instance
 * @returns {void}
 * @throws
 */
export function socketStart (instance) {

  if (!instance || !instance.config) {
    throw Error('Module instance required')
  }

  const { apiUrl, roomId, apiKey } = instance.config
  const url = new URL(apiUrl)

  socketStop()

  instance.log('info', 'Connecting to Stagetimer.io...')
  instance.updateStatus(InstanceStatus.Connecting)

  // Configure socket
  socket = io(url.origin, {
    path: url.pathname + 'socket.io',
    auth: {
      room_id: roomId,
      api_key: apiKey,
    },
    // Prevent infinite retries
    reconnectionAttempts: 5,
    // Prevent infinite exponential backoff
    reconnectionDelayMax: 10000,
  })

  //
  // Socket events
  //

  socket.on('connect', () => {
    instance.log('info', 'Connected!')
    instance.updateStatus(InstanceStatus.Ok)

    if (!instance.apiClient) {
      throw Error('API client not ready')
    }

    /**
     * @DEPRECATED
     * The API socket now emits room, playback_status, current_timer and next_timer on connect.
     * Temporarily retained for backwards compatibility.
     */
    instance.apiClient.send(actionIdType.get_room, {})
      .then(({ data }) => {

        const { _id, name, blackout, focus_message, timezone } = /** @type {RoomData} */(data)

        updateRoomState.call(instance, {
          roomId: _id,
          roomName: name,
          roomBlackout: blackout,
          roomFocus: focus_message,
          roomTimezone: timezone,
        })
      })
      .catch((error) => {
        instance.log('error', error.toString())
      })

    /**
     * @DEPRECATED
     * The API socket now emits room, playback_status, current_timer and next_timer on connect.
     * Temporarily retained for backwards compatibility.
     */
    instance.apiClient.send(actionIdType.get_status, {})
      .then(({ data }) => {

        const { timer_id, running, start, finish, pause, server_time } = /** @type {StatusData} */(data)

        const serverTimeDiff = Date.now() - server_time
        instance.log('debug', `Difference between system and server time: ${serverTimeDiff}ms`)

        updatePlaybackState.call(instance, {
          currentTimerId: timer_id,
          isRunning: running,
          kickoff: start,
          deadline: finish,
          lastStop: pause,
          serverTimeDiff,
        })

        return timer_id
      })
      .then((timer_id) => {
        getTimerAndUpdateState.call(instance, timer_id)
      })
      .catch((error) => {
        instance.log('error', error.toString())
      })
  })

  socket.on('connect_error', (error) => {
    instance.log('warn', `Failed to connect! (${error.message})`)
    instance.updateStatus(InstanceStatus.ConnectionFailure)
  })

  socket.on('disconnect', (reason) => {
    if (reason === 'io client disconnect') { return }
    instance.log('warn', `Disconnected! Reason: ${reason}`)
    instance.updateStatus(InstanceStatus.Disconnected)
  })

  socket.on('error', (error) => {
    instance.log('error', `Unexpected error: ${error.message}`)
    instance.updateStatus(InstanceStatus.UnknownError)
  })

  //
  // Socket IO Manager events
  //

  socket.io.on('reconnect_attempt', (attempt) => {
    instance.log('warn', `Reconnecting... (Attempt #${attempt})`)
    instance.updateStatus(InstanceStatus.Connecting)
  })

  socket.io.on('reconnect', (attempt) => {
    instance.log('info', `Reconnected on attempt #${attempt}!`)
    instance.updateStatus(InstanceStatus.Ok)
  })

  socket.io.on('reconnect_failed', () => {
    instance.log('error', 'Unable to connect to Stagetimer.io!')
    instance.updateStatus(InstanceStatus.ConnectionFailure)
  })

  socket.io.on('error', (error) => {
    instance.log('debug', `[Socket manager] Unexpected error: ${error}`)
  })

  //
  // Stagetimer events
  //

  socket.on(stagetimerEvents.playback_status, (payload) => {
    instance.log('debug', 'Event: playback_status')

    const { timer_id, running, start, finish, pause, server_time } = payload

    const serverTimeDiff = Date.now() - server_time
    instance.log('debug', `Difference between system and server time: ${serverTimeDiff}ms`)

    updatePlaybackState.call(instance, {
      currentTimerId: timer_id,
      isRunning: running,
      kickoff: start,
      deadline: finish,
      lastStop: pause,
      serverTimeDiff,
    })

    getTimerAndUpdateState.call(instance, timer_id)
  })

  socket.on(stagetimerEvents.room, (payload) => {
    instance.log('debug', 'Event: room')

    const { blackout, focus_message, timezone } = payload

    updateRoomState.call(instance, {
      roomBlackout: blackout,
      roomFocus: focus_message,
      roomTimezone: timezone,
    })
  })

  socket.on(stagetimerEvents.current_timer, (payload) => {
    instance.log('debug', 'Event: current_timer')

    if (!payload) return updateCurrentTimerState.call(instance, {})

    const {
      _id,
      name,
      speaker,
      notes,
      duration,
      appearance,
      wrap_up_yellow,
      wrap_up_red,
      start_time,
      start_time_uses_date,
    } = payload

    updateCurrentTimerState.call(instance, {
      _id,
      name,
      speaker,
      notes,
      duration,
      appearance,
      wrap_up_yellow,
      wrap_up_red,
      start_time,
      start_time_uses_date,
    })
  })

  socket.on(stagetimerEvents.next_timer, (payload) => {
    instance.log('debug', 'Event: next_timer')

    if (!payload) return updateNextTimerState.call(instance, {})

    const {
      _id,
      name,
      speaker,
      notes,
      duration,
      appearance,
      wrap_up_yellow,
      wrap_up_red,
      start_time,
      start_time_uses_date,
    } = payload

    updateNextTimerState.call(instance, {
      _id,
      name,
      speaker,
      notes,
      duration,
      appearance,
      wrap_up_yellow,
      wrap_up_red,
      start_time,
      start_time_uses_date,
    })
  })

  socket.on(stagetimerEvents.message, (payload) => {
    instance.log('debug', 'Event: message')

    const { showing, text, color, bold, uppercase } = payload

    updateMessageState.call(instance, {
      showing,
      text,
      color,
      bold,
      uppercase,
    })
  })

  socket.on(stagetimerEvents.flash, (payload) => {
    instance.log('debug', 'Event: flash')

    const { count } = payload

    updateFlashingState.call(instance, count)
  })

  // Start
  socket.connect()
}

/**
 * @param {string} timer_id
 * @this {ModuleInstance}
 * @throws
 *
 * @deprecated Retained as legacy fallback until all clients return new `current_timer` and `next_timer` socket events.
 */
function getTimerAndUpdateState (timer_id) {

  const instance = this

  if (!instance.apiClient) {
    throw Error('API client not ready')
  }

  instance.apiClient.send(actionIdType.get_timer, { timer_id })
    .then(({ data }) => {

      const { _id, name, speaker, notes, duration, appearance, wrap_up_yellow, wrap_up_red } = /** @type {TimerData} */ (data)

      updateCurrentTimerState.call(this, {
        _id,
        name,
        speaker,
        notes,
        duration,
        appearance,
        wrap_up_yellow,
        wrap_up_red,
      })
    })
    .catch((error) => {
      instance.log('error', error.toString())
    })
}
