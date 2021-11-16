const needle = require('needle')

module.exports = {
	sendCommand({ cmd, timer, message, body = {}, timeout = 2000 }) {
		let url = `${this.API_URL_BASE}/room/${this.config.roomId}`
		const headers = {
			Authorization: `Bearer ${this.config.apiKey}`,
		}

		if (timer !== undefined) {
			url = `${url}/timer/${timer}`
		}

		if (message !== undefined) {
			url = `${url}/message/${message}`
		}

		url = `${url}/${cmd}`

		console.log({ url, body, headers })
		needle('POST', url, body, { headers, json: true, open_timeout: timeout, response_timeout: timeout })
			.then((res) => res.body)
			.catch((error) => {
				this.log('error', `Error calling API: ${error}`)
			})
	},

	// Room Endpoints
	startHighlightedTimer() {
		this.sendCommand({ cmd: 'start' })
	},

	stopHighlightedTimer() {
		this.sendCommand({ cmd: 'stop' })
	},

	toggleHighlightedTimer() {
		this.sendCommand({ cmd: 'start-stop' })
	},

	resetHighlightedTimer() {
		this.sendCommand({ cmd: 'reset' })
	},

	highlightNextTimer() {
		this.sendCommand({ cmd: 'next' })
	},

	highlightPreviousTimer() {
		this.sendCommand({ cmd: 'previous' })
	},

	tweakTimer(amount) {
		this.sendCommand({ cmd: 'tweak', body: { amount } })
	},

	flashTimer() {
		this.sendCommand({ cmd: 'flash' })
	},

	blackoutTimer() {
		this.sendCommand({ cmd: 'blackout' })
	},

	// Timer Endpoints
	setTimer(timer = 0) {
		this.sendCommand({ timer, cmd: 'set' })
	},

	startTimer(timer = 0) {
		this.sendCommand({ timer, cmd: 'start' })
	},

	stopTimer(timer = 0) {
		this.sendCommand({ timer, cmd: 'stop' })
	},

	toggleTimer(timer = 0) {
		this.sendCommand({ timer, cmd: 'start-stop' })
	},

	// Message Endpoints
	showMessage(message = 0) {
		this.sendCommand({ message, cmd: 'show' })
	},

	hideMessage(message = 0) {
		this.sendCommand({ message, cmd: 'hide' })
	},

	toggleMessage(message = 0) {
		this.sendCommand({ message, cmd: 'toggle' })
	},
}
