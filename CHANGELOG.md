# Changelog


## v2.3.1

Internal:
- Removes `@stagetimerio/shared` and `@stagetimerio/timeutils` dependencies by inlining the required utilities into `src/timeutils/` and `src/utils/` folders. This eliminates the need for GitHub Packages registry access.
- Restores the standard Bitfocus reusable workflow for CI checks.

Fixes:
- Fixes information text not rendering HTML in module settings.

## v2.3.0

New features:
- Adds ON AIR mode support with new actions and feedback:
  - `Viewer: Enable ON AIR` - Enable ON AIR mode in the room
  - `Viewer: Disable ON AIR` - Disable ON AIR mode in the room
  - `Viewer: Toggle ON AIR` - Toggle ON AIR mode in the room
  - New feedback `ON AIR mode` to indicate when ON AIR is active
  - New preset button for toggling ON AIR mode
- Adds timer labels support:
  - New options in `Create Timer` and `Update Timer` actions to set up to 3 labels with custom names and colors
  - New variables for current timer labels:
    - `$(stagetimer:currentTimerLabels)` - Labels (comma-separated)
    - `$(stagetimer:currentTimerLabel1)` - Label 1
    - `$(stagetimer:currentTimerLabel2)` - Label 2
    - `$(stagetimer:currentTimerLabel3)` - Label 3
  - New variables for next timer labels:
    - `$(stagetimer:nextTimerLabels)` - Labels (comma-separated)
    - `$(stagetimer:nextTimerLabel1)` - Label 1
    - `$(stagetimer:nextTimerLabel2)` - Label 2
    - `$(stagetimer:nextTimerLabel3)` - Label 3

Fixes:
- Enables sticky session cookie support for improved connection reliability with load-balanced servers.

## v2.2.1

- Fixes new accepted alphabet for room IDs.
- Fixes handling of empty `current_timer` and `next_timer` socket events.

## v2.2.0: Adds reset action and multiple variables

New features:
- Adds action `Transport: Reset`: Reset or restart the currently highlighted timer, utilizing the new `/reset` API endpoint. (Resolves #11 and #14)
- Handles new socket events `current_timer` and `next_timer`. See https://stagetimer.io/changelog/#version-213. 
- Adds new variables for the time display. The time display is equal to the Stagetimer output, taking [timer appearance](https://stagetimer.io/docs/using-timers/#timer-appearances) into account ([Docs](https://stagetimer.io/docs/viewer/#3-timer)). (Resolves  #12)
  - `$(stagetimer:timeDisplay)` - Time Display
  - `$(stagetimer:timeDisplayHours)` - Time Display (hours)
  - `$(stagetimer:timeDisplayMinutes)` - Time Display (minutes)
  - `$(stagetimer:timeDisplaySeconds)` - Time Display (seconds)
- Adds some variable about the current timer:
  - `$(stagetimer:currentTimerStartTime12h)` - Hard start time (12h format, [Docs](https://stagetimer.io/docs/using-timers/#using-the-start-time-properly))
  - `$(stagetimer:currentTimerStartTime24h)`- Hard start time (24h format, [Docs](https://stagetimer.io/docs/using-timers/#using-the-start-time-properly))
- Adds all new variables about the next timer:
  - `$(stagetimer:nextTimerId)` - Timer ID
  - `$(stagetimer:nextTimerName)` - Timer name
  - `$(stagetimer:nextTimerSpeaker)` - Timer speaker
  - `$(stagetimer:nextTimerNotes)` - Timer notes
  - `$(stagetimer:nextTimerAppearance)` – Timer appearance ([Docs](https://stagetimer.io/docs/using-timers/#timer-appearances))
  - `$(stagetimer:nextTimerStartTime12h)` - Hard start time (12h format, [Docs](https://stagetimer.io/docs/using-timers/#using-the-start-time-properly))
  - `$(stagetimer:nextTimerStartTime24h)`- Hard start time (24h format, [Docs](https://stagetimer.io/docs/using-timers/#using-the-start-time-properly))
  - `$(stagetimer:nextTimerDuration)` - Timer duration
  - `$(stagetimer:nextTimerDurationAsMs)` - Timer duration (ms)

## v2.1.0: Adds "Create Timer" and "Create Message" presets

Implements enhancements to the stagetimer.io API v1:
  - New timer endpoints added: `/create_timer`, `/update_timer`, `/delete_timer`
  - New timer properties: `start_time`, `start_date`, `finish_time`, `finish_date`, `appearance`, `trigger`, `type`.
  - `start_time` and `finish_time` allow setting hard start and finish times for cues, supporting both date and time-based scheduling.
  - `appearance`, `trigger`, and `type` properties provide additional control over timer behavior and display.
  - New message endpoints added: `/create_message`, `/update_message`, `/delete_message`
  - Enhanced flexibility in message management with the updated `/hide_message` endpoint, allowing hiding messages without specific arguments.
  - Full API documentation: https://stagetimer.io/docs/api-v1/
  - Full companion module documentation: https://stagetimer.io/docs/integration-with-streamdeck-companion/

## v2.0.0 (2023-07-05)

New Stagetimer.io module for Companion, rewritten from scratch for Companion v3.
Uses the new Stagetimer.io API v1.

## v1.0.0 (2021-11-16)

Initial version of Stagetimer.io module for Companion.
