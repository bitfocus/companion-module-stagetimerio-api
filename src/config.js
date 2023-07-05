// Regular Expressions for validation
const roomIdRegExp = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZ]{8}$/
const apiKeyRegExp = /^[a-f0-9-]{32}$/
const apiUrlRegExp = /^https?:\/\/.*(\/v1\/)$/

/** @type {StagetimerConfig} */
export const initialConfig = {
	roomId: '',
	apiKey: '',
	apiUrl: '',
}

/**
 * @param { StagetimerConfig } config
 * @returns {boolean}
 * @throws
 */
export function validateConfig(config) {

	if (
		roomIdRegExp.test(config.roomId)
		&& apiKeyRegExp.test(config.apiKey)
		&& apiUrlRegExp.test(config.apiUrl)
	) {
		return true
	}

	throw new Error('Bad configuration! Please review module settings and try again.')
}

/**
 * @type { SomeCompanionConfigField[] }
 */
export const configFields = [
	{
		type: 'static-text',
		width: 12,
		id: 'info',
		label: 'Information',
		value: `
		Remotely control <a href="https://stagetimer.io/" target="_blank">Stagetimer.io</a> using Companion.<br><br>
		Requires a Stagetimer.io account on a <b>paid plan</b> (<i>Pro</i> or <i>Premium</i>).<br><br>
		Enter your <b>Room ID</b> and <b>API key</b> below to get started.<br>
		You can generate an API key on the controller page.
		`,
	},
	{
		type: 'textinput',
		width: 4,
		id: 'roomId',
		label: 'Room ID',
		regex: roomIdRegExp.toString(),
		required: true,
		default: 'YOUR-ID',
	},
	{
		type: 'textinput',
		width: 8,
		id: 'apiKey',
		label: 'API Key',
		regex: apiKeyRegExp.toString(),
		required: true,
		default: 'YOUR-KEY',
	},
	{
		type: 'textinput',
		width: 12,
		id: 'apiUrl',
		label: 'API URL',
		regex: apiUrlRegExp.toString(),
		required: true,
		default: 'https://api.stagetimer.io/v1/',
	},
]
