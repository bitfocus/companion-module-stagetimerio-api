import { messageColorDropdownOptions, timerAppearanceDropdownOptions, timerAppearances, timerTriggers, timerTriggersDropdownOptions, timerTypes, timerTypesDropdownOptions } from './config.js'

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
  create_timer: 'create_timer',

  // Message
  show_or_hide_message: 'show_or_hide_message',
  show_message: 'show_message',
  hide_message: 'hide_message',
  create_message: 'create_message',
}

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
      tooltip: 'Index of a timer to target in a room. Note: Index is not zero-based, it starts at 1. Example: To target the second timer from the top, set `index=2`.',
    },
    {
      id: 'timer_id',
      type: 'textinput',
      label: 'Timer ID',
      tooltip: 'The ID of the timer you want to target.',
    },
  ],
  timerCreate: [
    {
      id: 'name',
      type: 'textinput',
      label: 'Name',
      tooltip: 'Name of the timer.',
    },
    {
      id: 'speaker',
      type: 'textinput',
      label: 'Speaker',
      tooltip: 'Used to identify speakers.',
    },
    {
      id: 'notes',
      type: 'textinput',
      label: 'Notes',
      tooltip: 'Notes related to the timer or speaker.',
    },
    {
      id: 'hours',
      type: 'number',
      label: 'Hours',
      default: 0,
      required: false,
      min: 0,
      max: 999,
      tooltip: 'Duration (hours).',
    },
    {
      id: 'minutes',
      type: 'number',
      label: 'Minutes',
      default: 10,
      required: false,
      min: 0,
      max: 59,
      tooltip: 'Duration (minutes).',
    },
    {
      id: 'seconds',
      type: 'number',
      label: 'Seconds',
      default: 0,
      required: false,
      min: 0,
      max: 59,
      tooltip: 'Duration (seconds).',
    },
    {
      id: 'wrap_up_yellow',
      type: 'number',
      label: 'Wrap up, yellow',
      default: 60,
      required: false,
      min: 0,
      max: 9999,
      tooltip: 'Yellow wrap-up time (in seconds from the end).',
    },
    {
      id: 'wrap_up_red',
      type: 'number',
      label: 'Wrap up, red',
      default: 15,
      required: false,
      min: 0,
      max: 9999,
      tooltip: 'Red wrap-up time (in seconds from the end).',
    },
    {
      id: 'advanced',
      type: 'static-text',
      label: 'Advanced options:',
      value: 'The settings below are for advanced timer configuration.',
    },
    {
      id: 'appearance',
      type: 'dropdown',
      label: 'Timer appearance',
      tooltip: `Defines how the timer is displayed. See the "Timer Appearances" page in the docs. Default: ${timerAppearances.COUNTDOWN}`,
      choices: timerAppearanceDropdownOptions,
      default: 0,
    },
    {
      id: 'type',
      type: 'dropdown',
      label: 'Timer type',
      tooltip: `Defines the type of timer, ie. how runtime length is handled. See the "Timer Types" page in the docs. Default: ${timerTypes.DURATION}`,
      choices: timerTypesDropdownOptions,
      default: 0,
    },
    {
      id: 'trigger',
      type: 'dropdown',
      label: 'Timer trigger',
      tooltip: `Defines how the timer is triggered (started). See the "Timer Triggers" page in the docs. Default: ${timerTriggers.MANUAL}`,
      choices: timerTriggersDropdownOptions,
      default: 0,
    },
    {
      id: 'start_time',
      type: 'textinput',
      label: 'Start time',
      tooltip: 'Set a hard start time for this cue. Required when `trigger=LINKED` and `trigger=SCHEDULED`, but optional for `trigger=MANUAL`',
    },
    {
      id: 'start_time_uses_date',
      type: 'checkbox',
      label: 'Start time uses date',
      default: false,
      tooltip: 'Determines if the date-part of `start_time` is being used. If `true`, then the the full date is used (e.g. 11 am on Oct 6). But if `false`, the start date is interpreted as today and the date part ignored (e.g. 11 am today).',
    },
    {
      id: 'finish_time',
      type: 'textinput',
      label: 'Finish time',
      tooltip: 'Finish time for the cue. Required when `type=FINISH_TIME`, otherwise ignored.',
    },
    {
      id: 'finish_time_uses_date',
      type: 'checkbox',
      label: 'Finish time uses date',
      default: false,
      tooltip: 'Determines if the date-part of `finish_time` is being used. If `true`, then the the full date is used (e.g. 11 am on Oct 6). But if `false`, the start date is interpreted as today and the date part ignored (e.g. 11 am today).',
    },
  ],
  message: [
    {
      id: 'index',
      type: 'number',
      label: 'Message index',
      // @ts-expect-error: According to Companion docs, `default: ''` should work for optional, but is of course a type error.
      default: '',
      min: 1,
      max: 99,
      tooltip: 'Index of a message to target in a room. Note: Index is not zero-based, it starts at 1. Example: To target the second message from the top, set `index=2`. Leave blank to target active or first message.',
    },
    {
      id: 'message_id',
      type: 'textinput',
      label: 'Message ID',
      tooltip: 'The ID of the message you want to target.',
    },
  ],
  messageCreate: [
    {
      id: 'text',
      type: 'textinput',
      label: 'Message text',
      tooltip: 'Text content of the message.',
    },
    {
      id: 'color',
      type: 'dropdown',
      label: 'Text color',
      tooltip: 'Choose a text color for the message. Default: white',
      choices: messageColorDropdownOptions,
      default: 0,
    },
    {
      id: 'bold',
      type: 'checkbox',
      label: 'Bold text',
      default: false,
      tooltip: 'Check to make the message text bold.',
    },
    {
      id: 'uppercase',
      type: 'checkbox',
      label: 'Uppercase text',
      default: false,
      tooltip: 'Check to make the message text uppercase.',
    },
  ],
}


/**
 * @param { ModuleInstance } instance
 * @returns {void}
*/
export function loadActions (instance) {

  const actionCallback = sendActionToApi.bind(instance)

  /** @type {CompanionActionDefinitions} */
  const all_actions = {

    // Transport actions
    [actionIdType.start]: {
      name: 'Transport: Start',
      description: 'Start or resume the highlighted timer in the room',
      options: [],
      callback: actionCallback,
    },
    [actionIdType.stop]: {
      name: 'Transport: Stop',
      description: 'Stop the highlighted timer in the room',
      options: [],
      callback: actionCallback,
    },
    [actionIdType.start_or_stop]: {
      name: 'Transport: Start/stop',
      description: 'Start/stop the highlighted timer in the room',
      options: [],
      callback: actionCallback,
    },
    [actionIdType.next]: {
      name: 'Transport: Next',
      description: 'Highlight the next timer in the list',
      options: actionOptions.autostart,
      callback: actionCallback,
    },
    [actionIdType.previous]: {
      name: 'Transport: Previous',
      description: 'Reset the highlighted timer in the room if it is running. If the highlighted timer is not running, highlight the previous timer in the list. Optionally, you can automatically start the previous timer once it\'s highlighted.',
      options: actionOptions.autostart,
      callback: actionCallback,
    },
    [actionIdType.add_time]: {
      name: 'Transport: Add time',
      description: 'Add an amount of time to the highlighted timer in the room.',
      options: actionOptions.amount,
      callback: actionCallback,
    },
    [actionIdType.subtract_time]: {
      name: 'Transport: Subtract time',
      description: 'Subtract an amount of time from the highlighted timer in the room.',
      options: actionOptions.amount,
      callback: actionCallback,
    },

    // Viewer actions
    [actionIdType.start_flashing]: {
      name: 'Viewer: Flash the screen',
      description: 'Flashes the screen in the room. Can be used to grab the attention of speakers.',
      options: actionOptions.count,
      callback: actionCallback,
    },
    [actionIdType.stop_flashing]: {
      name: 'Viewer: Stop flashing',
      description: 'Stops any flashing timers and message on the screen.',
      options: [],
      callback: actionCallback,
    },
    [actionIdType.enable_blackout]: {
      name: 'Viewer: Enable blackout mode',
      description: 'Enable blackout mode in the room',
      options: [],
      callback: actionCallback,
    },
    [actionIdType.disable_blackout]: {
      name: 'Viewer: Disable blackout mode',
      description: 'Disable blackout mode in the room',
      options: [],
      callback: actionCallback,
    },
    [actionIdType.toggle_blackout]: {
      name: 'Viewer: Toggle blackout mode',
      description: 'Toggle (enable/disable) blackout mode in the room',
      options: [],
      callback: actionCallback,
    },
    [actionIdType.enable_focus]: {
      name: 'Viewer: Enable focus mode',
      description: 'Enable focus mode in the room',
      options: [],
      callback: actionCallback,
    },
    [actionIdType.disable_focus]: {
      name: 'Viewer: Disable focus mode',
      description: 'Disable focus mode in the room',
      options: [],
      callback: actionCallback,
    },
    [actionIdType.toggle_focus]: {
      name: 'Viewer: Toggle focus mode',
      description: 'Toggle (enable/disable) focus mode in the room',
      options: [],
      callback: actionCallback,
    },

    // Timer actions
    [actionIdType.start_timer]: {
      name: 'Timer: Start',
      description: 'Start or resume a specific timer in the room',
      options: actionOptions.timer,
      callback: actionCallback,
    },
    [actionIdType.stop_timer]: {
      name: 'Timer: Stop',
      description: 'Stop a specific timer in the room',
      options: actionOptions.timer,
      callback: actionCallback,
    },
    [actionIdType.start_or_stop_timer]: {
      name: 'Timer: Toggle playback',
      description: 'Toggle (start/stop) a specific timer in the room',
      options: actionOptions.timer,
      callback: actionCallback,
    },
    [actionIdType.reset_timer]: {
      name: 'Timer: Reset',
      description: 'Reset a specific timer to original duration',
      options: actionOptions.timer,
      callback: actionCallback,
    },
    [actionIdType.create_timer]: {
      name: 'Timer: Create new timer',
      description: 'Create a new timer in the room',
      options: actionOptions.timerCreate,
      callback: actionCallback,
    },

    // Message actions
    [actionIdType.show_message]: {
      name: 'Message: Show',
      description: 'Show a message in the room',
      options: actionOptions.message,
      callback: actionCallback,
    },
    [actionIdType.hide_message]: {
      name: 'Message: Hide',
      description: 'Hide a message in the room',
      options: actionOptions.message,
      callback: actionCallback,
    },
    [actionIdType.show_or_hide_message]: {
      name: 'Message: Toggle visibility',
      description: 'Show/hide a message in the room',
      options: actionOptions.message,
      callback: actionCallback,
    },
    [actionIdType.create_message]: {
      name: 'Message: Create new message',
      description: 'Create a new message in the room',
      options: actionOptions.messageCreate,
      callback: actionCallback,
    },

    // Developer and utility actions
    [actionIdType.test_auth]: {
      name: 'Utility: Test auth',
      description: 'Test connection and authentication',
      options: [],
      callback: actionCallback,
    },
    [actionIdType.get_status]: {
      name: 'Utility: Get status',
      description: 'Get playback status of the room',
      options: [],
      callback: actionCallback,
    },
    [actionIdType.get_room]: {
      name: 'Utility: Get room',
      description: 'Get status of the room',
      options: [],
      callback: actionCallback,
    },
  }

  instance.setActionDefinitions(all_actions)
}

/**
 * Handles callbacks from Actions and calls the API client
 *
 * @this {ModuleInstance}
 * @param {CompanionActionEvent} event
 * @returns {Promise<void>}
 */
async function sendActionToApi ({ actionId, options }) {

  const instance = this

  instance.log('debug', `Action: ${actionId}`)

  if (actionId in actionIdType === false) {
    // Prevent actionId's not allowed by HTTP API
    throw new Error('Not a valid actionId')
  }

  if (!instance.apiClient) {
    throw new Error('API client not ready')
  }

  const params = assignTruthyOptionsToParams(options)

  try {
    const { message } = await instance.apiClient.send(actionId, params)

    instance.log('debug', `API response: ${message}`)

  } catch (error) {
    if (!(error instanceof Error)) { throw new Error }
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
