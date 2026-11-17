<img src="https://r2.stagetimer.io/logo/logo-full-dark.png" alt="Stagetimer Logo" width="285" height="50">

&nbsp;

# Stagetimer.io module for Companion

This module lets you remotely control [Stagetimer](https://stagetimer.io/) using Companion.

It connects using the [Stagetimer HTTP RPC API](https://stagetimer.io/docs/api-v1) and [Stagetimer Socket.io endpoint](https://stagetimer.io/docs/api-v1/#socket-io-endpoint).

For a comprehensive guide with video tutorials, see the full documentation:
**[Controlling Stagetimer via Companion for Stream Deck](https://stagetimer.io/docs/integration-with-streamdeck-companion/)**

---

## Requirements

To use this module you need:

- A Stagetimer account on a **paid plan** (*Pro* or *Premium*).
- **Room ID**: The ID of the Stagetimer room you want to control.
- **API Key**: A key that authorizes you to use the Stagetimer API. You can generate an API key on the controller page.

---

## Configuration

1. Click on the module in the Connections list to reveal the configuration pane.
2. Enter your **Room ID** and **API Key** in the form and click *Save*.
3. If the details you entered are correct, the module will connect. If the module fails to connect, please review the output in the Companion Logs tab.

---

## Presets

There are multiple presets available for the most common actions, ready to drop into your button layout.

The presets are organized into categories:

- **Transport**: Start/Stop, Start, Stop, Reset, Previous, Next, Jump back/forward, Add/Subtract time
- **Viewer**: Time display, Wrap-up indicator, Timer appearance, Current timer, Speaker, Labels, Current/next group, Timezone, Flash, Blackout, ON AIR
- **Timer**: Reset, Start, Stop, Create specific timers
- **Message**: Toggle, Toggle fullscreen, Show, Hide, Create messages

Find a complete reference with button images in the Stagetimer docs:
**[Controlling Stagetimer via Companion for Stream Deck](https://stagetimer.io/docs/integration-with-streamdeck-companion/#presets)**

On Companion 5.0 or newer, you can also import a ready-made page with all Stagetimer buttons:
**[Ready-made Button Page](https://stagetimer.io/docs/integration-with-streamdeck-companion/#ready-made-button-page)**

---

## Actions

The following Actions are available:

**Message actions:**

- **Message: Hide**  
    Hide a message in the room
- **Message: Show**  
    Show a message in the room. Enable "Fullscreen" to cover all other output elements.
- **Message: Toggle visibility**  
    Show/hide a message in the room. When showing, enable "Fullscreen" to cover all other output elements.
- **Message: Create new message**  
    Create a new message in the room

**Timer actions:**

- **Timer: Reset**  
    Reset a specific timer to original duration
- **Timer: Start**  
    Start or resume a specific timer in the room
- **Timer: Stop**  
    Stop a specific timer in the room
- **Timer: Toggle playback**  
    Toggle (start/stop) a specific timer in the room
- **Timer: Create new timer**
    Create a new timer in the room
- **Timer: Update timer**
    Update an existing timer in the room

The `Timer: *` and `Message: *` actions target either an index (position in the list, starting at 1) or an ID. Use one or the other — if both fields are filled, the ID wins. Both fields accept variables, so setting `Timer ID` to `$(stagetimer:currentTimerId)` and clearing `Timer index` targets the currently selected timer.

**Transport actions:**

- **Transport: Add time**  
    Add an amount of time to the selected timer in the room.
- **Transport: Jump playhead**  
    Jump the playhead of the selected timer forward or back. The duration does not change. A positive number of milliseconds jumps forward, a negative number jumps back. It cannot jump back past the start of the timer. If it would, the timer does not move.
- **Transport: Next**  
    Select the next timer in the list
- **Transport: Previous**  
    Reset the selected timer in the room if it is running. If the selected timer is not running, select the previous timer in the list. Optionally, you can automatically start the previous timer once it's selected.
- **Transport: Start**  
    Start or resume the selected timer in the room
- **Transport: Start/stop**  
    Start/stop the selected timer in the room
- **Transport: Stop**  
    Stop the selected timer in the room
- **Transport: Reset**  
    Reset or restart the currently selected timer.
- **Transport: Subtract time**  
    Subtract an amount of time from the selected timer in the room.

**Viewer actions:**

- **Viewer: Disable blackout mode**  
    Disable blackout mode in the room
- **Viewer: Enable blackout mode**  
    Enable blackout mode in the room
- **Viewer: Flash the screen**  
    Flashes the screen in the room. Can be used to grab the attention of speakers.
- **Viewer: Stop flashing**  
    Stops any flashing timers and message on the screen.
- **Viewer: Toggle blackout mode**  
    Toggle (enable/disable) blackout mode in the room
- **Viewer: Enable ON AIR**
    Enable ON AIR mode in the room
- **Viewer: Disable ON AIR**
    Disable ON AIR mode in the room
- **Viewer: Toggle ON AIR**
    Toggle (enable/disable) ON AIR mode in the room
- **Viewer: Enable focus mode (legacy)**  
    Legacy: Use "Message: Show" with the "Fullscreen" option instead.
- **Viewer: Disable focus mode (legacy)**  
    Legacy: Use "Message: Hide" instead.
- **Viewer: Toggle focus mode (legacy)**  
    Legacy: Use "Message: Show" with the "Fullscreen" option instead.

**Utility actions:**

- **Utility: Switch room**
    Change the active room. Requires a team API key that has access to the target room. The module will reconnect to the new room. Supports variables in the Room ID field.
- **Utility: Get room**  
    Get status of the room
- **Utility: Get status**  
    Get playback status of the room
- **Utility: Test auth**  
    Test connection and authentication

---

## Variables

Variables let you display live data from Stagetimer on your Stream Deck buttons.

**Room**
- `$(stagetimer:roomId)` - Room ID
- `$(stagetimer:roomName)` - Room name
- `$(stagetimer:roomTimezone)` - Room timezone ([Docs](https://stagetimer.io/docs/using-timers/#timezones))
- `$(stagetimer:timeOfDay)` - Time of day in the room timezone and time of day format
- `$(stagetimer:connected)` - `true` while the module is connected to Stagetimer, else `false`. The module tries again until the connection is back.

**Playback Snapshot**  
The time display is equal to the Stagetimer output, taking [timer appearance](https://stagetimer.io/docs/using-timers/#timer-appearances) into account ([Docs](https://stagetimer.io/docs/viewer/#3-timer)). It also uses the room's overtime prefix and overtime behavior: with "stop" it stays at zero, with "hide" it is empty. The current time remaining is always strictly a countdown and runs into overtime. It uses the overtime prefix too.

- `$(stagetimer:timeDisplay)` - Time Display
- `$(stagetimer:timeDisplayHours)` - Time Display (hours)
- `$(stagetimer:timeDisplayMinutes)` - Time Display (minutes)
- `$(stagetimer:timeDisplaySeconds)` - Time Display (seconds)
- `$(stagetimer:currentTimerRemaining)` - Timer remaining time
- `$(stagetimer:currentTimerRemainingAsMs)` - Timer remaining time (ms)
- `$(stagetimer:currentTimerRemainingHours)` - Timer remaining time (hours)
- `$(stagetimer:currentTimerRemainingMinutes)` - Timer remaining time (minutes)
- `$(stagetimer:currentTimerRemainingSeconds)` - Timer remaining time (seconds)
- `$(stagetimer:running)` - `true` while the timer runs, else `false`
- `$(stagetimer:lastStartedAt)` - Time of the last fresh timer start (Unix time in ms)

A fresh start changes `lastStartedAt`. A resume after a pause does not change it. To run a button action at the moment a timer starts, make a Companion trigger with the event "On variable change" for `$(stagetimer:lastStartedAt)`. When the trigger runs, the current timer variables already show the timer that started, for example `$(stagetimer:currentTimerField.vt)`. The module ignores a start that is older than 2 seconds when it gets it, for example after a reconnect. This prevents a late cue.

**Current Timer**  
The timer currently selected in the room. These variables are empty while no timer is selected.

- `$(stagetimer:currentTimerId)` - Timer ID
- `$(stagetimer:currentTimerName)` - Timer name
- `$(stagetimer:currentTimerIndex)` - Timer number as the controller shows it, for example `2.1` in a group
- `$(stagetimer:currentTimerGroup)` - Title of the group that holds the timer. Empty outside a group
- `$(stagetimer:currentTimerGroupId)` - ID of that group. A trigger on this variable runs when the show enters another group
- `$(stagetimer:currentTimerGroupColor)` - Color of that group as hex, for example `#7c3aed`
- `$(stagetimer:currentTimerSpeaker)` - Timer speaker
- `$(stagetimer:currentTimerNotes)` - Timer notes
- `$(stagetimer:currentTimerAppearance)` – Timer appearance ([Docs](https://stagetimer.io/docs/using-timers/#timer-appearances))
- `$(stagetimer:currentTimerStartTime)` - Hard start time (room time of day format, [Docs](https://stagetimer.io/docs/using-timers/#using-the-start-time-properly))
- `$(stagetimer:currentTimerStartTime12h)` - Hard start time (12h format, [Docs](https://stagetimer.io/docs/using-timers/#using-the-start-time-properly))
- `$(stagetimer:currentTimerStartTime24h)`- Hard start time (24h format, [Docs](https://stagetimer.io/docs/using-timers/#using-the-start-time-properly))
- `$(stagetimer:currentTimerDuration)` - Timer duration
- `$(stagetimer:currentTimerDurationAsMs)` - Timer duration (ms)
- `$(stagetimer:currentTimerLabels)` - Timer labels (comma-separated)
- `$(stagetimer:currentTimerLabel1)` - Timer label 1
- `$(stagetimer:currentTimerLabel2)` - Timer label 2
- `$(stagetimer:currentTimerLabel3)` - Timer label 3

**Next Timer**  
The timer that follows the current one. These variables are empty when the last timer is selected, so `$(stagetimer:nextTimerId)` can be used to detect the end of the rundown.

- `$(stagetimer:nextTimerId)` - Timer ID
- `$(stagetimer:nextTimerName)` - Timer name
- `$(stagetimer:nextTimerIndex)` - Timer number as the controller shows it, for example `2.1` in a group
- `$(stagetimer:nextTimerGroup)` - Title of the group that holds the timer. Empty outside a group
- `$(stagetimer:nextTimerGroupId)` - ID of that group. A trigger on this variable runs when the show enters another group
- `$(stagetimer:nextTimerGroupColor)` - Color of that group as hex, for example `#7c3aed`
- `$(stagetimer:nextTimerSpeaker)` - Timer speaker
- `$(stagetimer:nextTimerNotes)` - Timer notes
- `$(stagetimer:nextTimerAppearance)` – Timer appearance ([Docs](https://stagetimer.io/docs/using-timers/#timer-appearances))
- `$(stagetimer:nextTimerStartTime)` - Hard start time (room time of day format, [Docs](https://stagetimer.io/docs/using-timers/#using-the-start-time-properly))
- `$(stagetimer:nextTimerStartTime12h)` - Hard start time (12h format, [Docs](https://stagetimer.io/docs/using-timers/#using-the-start-time-properly))
- `$(stagetimer:nextTimerStartTime24h)`- Hard start time (24h format, [Docs](https://stagetimer.io/docs/using-timers/#using-the-start-time-properly))
- `$(stagetimer:nextTimerDuration)` - Timer duration
- `$(stagetimer:nextTimerDurationAsMs)` - Timer duration (ms)
- `$(stagetimer:nextTimerLabels)` - Timer labels (comma-separated)
- `$(stagetimer:nextTimerLabel1)` - Timer label 1
- `$(stagetimer:nextTimerLabel2)` - Timer label 2
- `$(stagetimer:nextTimerLabel3)` - Timer label 3

**Timer Fields**  
A timer can hold custom fields, for example `VT image` or `vlc`. Each key gets one variable for the current timer and one for the next timer. The key is written in lowercase, and each run of other characters becomes `_`, so `VT image` becomes `vt_image`. Two keys with the same result share one variable.

- `$(stagetimer:currentTimerField.vt_image)` - Field `VT image` of the current timer
- `$(stagetimer:nextTimerField.vt_image)` - Field `VT image` of the next timer
- `$(stagetimer:currentTimerFields)` - All fields of the current timer as a JSON string
- `$(stagetimer:nextTimerFields)` - All fields of the next timer as a JSON string

A variable appears when the module first sees the key, and it stays until the module restarts. It is empty when a timer does not have that key. A nested value is a JSON string. To read one part of it, use the `jsonpath` function (Companion 3.3 or later), for example `jsonpath($(stagetimer:currentTimerField.slides), '$[0].name')`. For a key that does not give a usable variable name, use the JSON of all fields, for example `jsonpath($(stagetimer:currentTimerFields), '$["Größe"]')`.

**Current Message**  
The message currently showing on the viewer. These variables are empty while no message is showing.

- `$(stagetimer:currentMessageId)` - Message ID
- `$(stagetimer:currentMessageText)` - Message text
- `$(stagetimer:currentMessageColor)` - Message color

---

## Feedbacks

- Blackout mode
- Connected
- Flashing
- Message is fullscreen
- Group color: the background takes the color of the current or next timer's group
- ON AIR mode
- Message showing
- Playback running
- Playback stopped
- Timer is over time
- Timer is running and on time
- Timer is showing red wrap-up warning
- Timer is showing yellow wrap-up warning

---

## Using with the Desktop App

This module also works with the [Stagetimer desktop app](https://stagetimer.io/desktop-app/) for offline use.

1. In the desktop app, go to **Menu → API** to find the Room ID, API Key, and API URL.
2. Enter these details in the Companion module configuration.
3. Make sure to update the **API URL** field to match your desktop app's local address (e.g., `http://127.0.0.1:3000`).

---

## Controlling Multiple Rooms

### Switching rooms dynamically

Use the **Room: Switch room** action to change the active room on-the-fly with a single connection. This requires a **team API key** (generated from the dashboard), which has access to all rooms in your team.

The Room ID field supports variables, so you can wire it to other inputs or triggers.

The current room is available via `$(stagetimer:roomId)`.

### Using multiple connections

Alternatively, you can control multiple rooms simultaneously by adding multiple connections:

1. Change the label of your first connection to something distinctive (e.g., `stagetimer-1`).
2. Add another "stagetimer.io: Stagetimer API" connection.
3. Configure with a unique label (e.g., `stagetimer-2`) and the second room's credentials.

Reference variables by connection label:
- Room 1: `$(stagetimer-1:currentTimerName)`
- Room 2: `$(stagetimer-2:currentTimerName)`

---

## Troubleshooting

**Connection fails:**
- Verify your Room ID and API Key are correct
- Ensure you have an active *Pro* or *Premium* subscription
- Check the Companion Logs tab for detailed error messages

**Variables not updating:**
- The module uses Socket.io for real-time updates
- If variables are stale, try disabling and re-enabling the connection

**Need more help?**
Visit the [Stagetimer documentation](https://stagetimer.io/docs/) or contact support at support@stagetimer.io
