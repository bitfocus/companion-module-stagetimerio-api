/** @type {ModuleInstance} */
let instance = null

/**
 * Enum of Action IDs allowed by Stagetimer.io API (v1)
 *
 * @readonly
 * @enum {string}
 */
export const actionIdType = {
  // Auth and status
  test_auth: 'test_auth',
  get_status: 'get_status',
  get_room: 'get_room',

  // Transport
  start: 'start',
  stop: 'stop',
  start_or_stop: 'start_or_stop',
  next: 'next',
  previous: 'previous',
  add_time: 'add_time',
  subtract_time: 'subtract_time',

  // Viewer
  start_flashing: 'start_flashing',
  stop_flashing: 'stop_flashing',
  enable_blackout: 'enable_blackout',
  disable_blackout: 'disable_blackout',
  toggle_blackout: 'toggle_blackout',
  enable_focus: 'enable_focus',
  disable_focus: 'disable_focus',
  toggle_focus: 'toggle_focus',

  // Timer
  start_timer: 'start_timer',
  stop_timer: 'stop_timer',
  start_or_stop_timer: 'start_or_stop_timer',
  reset_timer: 'reset_timer',
  get_timer: 'get_timer',

  // Message
  show_or_hide_message: 'show_or_hide_message',
  show_message: 'show_message',
  hide_message: 'hide_message',
}

// Reusable labels
let idTip = 'Unique identifier for a '
let indexTip = 'Index of a timer or message to target in a room. Note: Index is not zero-based, it starts at 1. Example: To target the second timer from the top, set `index=2`'

/**
 * Dictionary of Action Input Fields ({@link SomeCompanionActionInputField})
 *
 * @type {Object.<string, SomeCompanionActionInputField[]>}
 */
const actionOptions = {
  autostart: [
    {
      id: 'autostart',
      type: 'checkbox',
      label: 'Autostart',
      default: false,
      tooltip: 'Set to `true` to automatically start the timer after the action is triggered.',
    },
  ],
  amount: [
    {
      id: 'amount',
      type: 'textinput',
      label: 'Amount',
      default: '1m',
      required: true,
      tooltip: 'An amount of time specified by a number followed by a divison of time. Eg. `5s` for 5 seconds, `10m` for 10 minutes, etc.',
    },
  ],
  count: [
    {
      id: 'count',
      type: 'number',
      label: 'Count',
      default: 3,
      min: 1,
      max: 999,
      tooltip: 'Number of times to repeat the action. Accepted numbers: 1 - 999.',
    },
  ],
  timer: [
    {
      id: 'index',
      type: 'number',
      label: 'Timer index',
      default: 1,
      min: 1,
      max: 99,
      tooltip: indexTip,
    },
    {
      id: 'timer_id',
      type: 'textinput',
      label: 'Timer ID',
      tooltip: idTip + 'timer',
    },
  ],
  message: [
    {
      id: 'index',
      type: 'number',
      label: 'Message index',
      default: 1,
      min: 1,
      max: 99,
      tooltip: indexTip,
    },
    {
      id: 'message_id',
      type: 'textinput',
      label: 'Message ID',
      tooltip: idTip + 'message',
    },
  ],
}


/**
 * @param { ModuleInstance } theInstance
 * @returns {void}
*/
export function loadActions (theInstance) {

  instance = theInstance

  /** @type {CompanionActionDefinitions} */
  const all_actions = {

    // Transport actions
    [actionIdType.start]: {
      name: 'Transport: Start',
      description: 'Start or resume the highlighted timer in the room',
      options: [],
      callback: sendActionToApi,
    },
    [actionIdType.stop]: {
      name: 'Transport: Stop',
      description: 'Stop the highlighted timer in the room',
      options: [],
      callback: sendActionToApi,
    },
    [actionIdType.start_or_stop]: {
      name: 'Transport: Start/stop',
      description: 'Start/stop the highlighted timer in the room',
      options: [],
      callback: sendActionToApi,
    },
    [actionIdType.next]: {
      name: 'Transport: Next',
      description: 'Highlight the next timer in the list',
      options: actionOptions.autostart,
      callback: sendActionToApi,
    },
    [actionIdType.previous]: {
      name: 'Transport: Previous',
      description: 'Reset the highlighted timer in the room if it is running. If the highlighted timer is not running, highlight the previous timer in the list. Optionally, you can automatically start the previous timer once it\'s highlighted.',
      options: actionOptions.autostart,
      callback: sendActionToApi,
    },
    [actionIdType.add_time]: {
      name: 'Transport: Add time',
      description: 'Add an amount of time to the highlighted timer in the room.',
      options: actionOptions.amount,
      callback: sendActionToApi,
    },
    [actionIdType.subtract_time]: {
      name: 'Transport: Subtract time',
      description: 'Subtract an amount of time from the highlighted timer in the room.',
      options: actionOptions.amount,
      callback: sendActionToApi,
    },

    // Viewer actions
    [actionIdType.start_flashing]: {
      name: 'Viewer: Flash the screen',
      description: 'Flashes the screen in the room. Can be used to grab the attention of speakers.',
      options: actionOptions.count,
      callback: sendActionToApi,
    },
    [actionIdType.stop_flashing]: {
      name: 'Viewer: Stop flashing',
      description: 'Stops any flashing timers and message on the screen.',
      options: [],
      callback: sendActionToApi,
    },
    [actionIdType.enable_blackout]: {
      name: 'Viewer: Enable blackout mode',
      description: 'Enable blackout mode in the room',
      options: [],
      callback: sendActionToApi,
    },
    [actionIdType.disable_blackout]: {
      name: 'Viewer: Disable blackout mode',
      description: 'Disable blackout mode in the room',
      options: [],
      callback: sendActionToApi,
    },
    [actionIdType.toggle_blackout]: {
      name: 'Viewer: Toggle blackout mode',
      description: 'Toggle (enable/disable) blackout mode in the room',
      options: [],
      callback: sendActionToApi,
    },
    [actionIdType.enable_focus]: {
      name: 'Viewer: Enable focus mode',
      description: 'Enable focus mode in the room',
      options: [],
      callback: sendActionToApi,
    },
    [actionIdType.disable_focus]: {
      name: 'Viewer: Disable focus mode',
      description: 'Disable focus mode in the room',
      options: [],
      callback: sendActionToApi,
    },
    [actionIdType.toggle_focus]: {
      name: 'Viewer: Toggle focus mode',
      description: 'Toggle (enable/disable) focus mode in the room',
      options: [],
      callback: sendActionToApi,
    },

    // Timer actions
    [actionIdType.start_timer]: {
      name: 'Timer: Start',
      description: 'Start or resume a specific timer in the room',
      options: actionOptions.timer,
      callback: sendActionToApi,
    },
    [actionIdType.stop_timer]: {
      name: 'Timer: Stop',
      description: 'Stop a specific timer in the room',
      options: actionOptions.timer,
      callback: sendActionToApi,
    },
    [actionIdType.start_or_stop_timer]: {
      name: 'Timer: Toggle playback',
      description: 'Toggle (start/stop) a specific timer in the room',
      options: actionOptions.timer,
      callback: sendActionToApi,
    },
    [actionIdType.reset_timer]: {
      name: 'Timer: Reset',
      description: 'Reset a specific timer to original duration',
      options: actionOptions.timer,
      callback: sendActionToApi,
    },

    // Message actions
    [actionIdType.show_message]: {
      name: 'Message: Show',
      description: 'Show a message in the room',
      options: actionOptions.message,
      callback: sendActionToApi,
    },
    [actionIdType.hide_message]: {
      name: 'Message: Hide',
      description: 'Hide a message in the room',
      options: actionOptions.message,
      callback: sendActionToApi,
    },
    [actionIdType.show_or_hide_message]: {
      name: 'Message: Toggle visibility',
      description: 'Show/hide a message in the room',
      options: actionOptions.message,
      callback: sendActionToApi,
    },

    // Developer and utility actions
    [actionIdType.test_auth]: {
      name: 'Utility: Test auth',
      description: 'Test connection and authentication',
      options: [],
      callback: sendActionToApi,
    },
    [actionIdType.get_status]: {
      name: 'Utility: Get status',
      description: 'Get playback status of the room',
      options: [],
      callback: sendActionToApi,
    },
    [actionIdType.get_room]: {
      name: 'Utility: Get room',
      description: 'Get status of the room',
      options: [],
      callback: sendActionToApi,
    },
  }

  instance.setActionDefinitions(all_actions)
}

/**
 * Handles Action event callbacks and calls the API client
 *
 * @param {CompanionActionEvent} event
 * @returns {Promise<void>}
 */
async function sendActionToApi ({ actionId, options }) {

  instance.log('debug', `Action: ${actionId}`)

  if (actionId in actionIdType === false) {
    // Prevent actionId's not allowed by HTTP API
    throw new Error('Not a valid actionId')
  }

  const params = assignTruthyOptionsToParams(options)

  try {
    const { message } = await instance.apiClient.send(actionId, params)

    instance.log('debug', `API response: ${message}`)
  } catch (error) {
    instance.log('error', error.toString())
  }
}

/**
 * Filters Action options ({@link CompanionOptionValues}) for falsy values,
 * so that only truthy ones are used as query params.
 *
 * @param {CompanionOptionValues} options
 * @returns {object}
 */
function assignTruthyOptionsToParams (options) {

  return Object.fromEntries(
    Object.entries(options).filter(([_key, value]) => value),
  )

}
