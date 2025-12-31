# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Bitfocus Companion module for controlling [Stagetimer.io](https://stagetimer.io/) timers remotely. It integrates with Companion v3 using the `@companion-module/base` framework.

## Commands

- `yarn lint` - Run ESLint on `./src`
- `yarn test` - Run tests using Node.js built-in test runner
- `yarn version` - Sync versions and stage changes (used during release)

## Code Style

ESLint is configured with:
- 2-space indentation
- Single quotes
- No semicolons
- Trailing commas in multiline
- Space before function parentheses
- Unused variables prefixed with `_` are allowed

## Architecture

### Module Entry Point (`src/index.js`)
`ModuleInstance` extends `InstanceBase` from Companion and orchestrates:
- Configuration validation and updates
- API client instantiation
- Socket connection management
- Loading of actions, feedbacks, variables, and presets

### Communication Layer
- **`src/api.js`** - HTTP RPC client for Stagetimer.io API v1. Sends actions with query parameters to `/v1/` endpoints.
- **`src/socket.js`** - Socket.io client for real-time state updates. Connects to the Stagetimer.io WebSocket API and receives events like `playback_status`, `room`, `current_timer`, `next_timer`, `flash`, and `message`.

### State Management (`src/state.js`)
Central state store with update functions that:
1. Merge incoming state
2. Update Companion variables via `setVariableValues()`
3. Trigger feedback checks via `checkFeedbacks()`

A timekeeper service (`setInterval` at 250ms) updates playback state while timers are running.

### Companion Integration
- **`src/actions.js`** - Defines transport controls (start/stop/reset/next/previous), viewer controls (flash/blackout/focus), timer-specific actions, and message actions. Actions map to API endpoints.
- **`src/feedbacks.js`** - Boolean feedbacks for playback state, timer phases (yellow/red warnings), and viewer modes.
- **`src/variables.js`** - Exposes room info, current/next timer details, and time display values.
- **`src/presets.js`** - Pre-configured button presets for common operations.
- **`src/config.js`** - Configuration fields and validation (Room ID, API Key, API URL).

### Type System (`src/types.js`)
JSDoc typedefs for TypeScript-like type checking. Key types:
- `StagetimerConfig` - Module configuration
- `State` - Full module state shape
- `PlaybackState`, `TimerState`, `RoomState`, `MessageState` - State slices
- `ApiResponse`, `StatusData`, `RoomData`, `TimerData` - API response types

## Key Dependencies

- `@companion-module/base` - Companion module framework
- `@stagetimerio/shared` - Shared Stagetimer utilities
- `@stagetimerio/timeutils` - Time formatting utilities
- `socket.io-client` - WebSocket client for real-time updates
