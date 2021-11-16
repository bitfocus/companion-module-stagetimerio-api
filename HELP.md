## companion-module-hermann-stagetimerio

This module will help to control your [Stagetimer.io](https://stagetimer.io) timers. It implements the Stagetimer API found [here](https://stagetimer.io/docs/api/).

### Configuration

Stagetimer uses simple token-based authentication. An API key is required. You can generate an API key on the controller page.

To use this module you will need:

- a [Stagetimer.io](https://stagetimer.io) Pro account
- a Room ID
- the API Key for the Room ID

Enter the Room ID and the generated API Key in the module configuration.

### Actions

The following Actions have been implemented:

- Room Actions

  - Start highlighted timer
  - Stop highlighted timer
  - Toggle highlighted timer
  - Reset highlighted timer
  - Highlight next timer
  - Highlight previous timer
  - Adjust highlighted timer
  - Flash highlighted timer
  - Toggle blackout

- Timer actions

  - Highlight a timer by index
  - Start timer by index
  - Stop timer by index
  - Toggle timer by index

- Message Actions
  - Show message by index
  - Hide message by index
  - Toggle message visibility by index
