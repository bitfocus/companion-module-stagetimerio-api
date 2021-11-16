const instance_skel = require('../../../instance_skel')

const configs = require('./configs')
const actions = require('./actions')
const constants = require('./constants')
const presets = require('./presets')
const variables = require('./variables')
const feedbacks = require('./feedbacks')

const api = require('./api')

class StagetimerInstance extends instance_skel {
	constructor(system, id, config) {
		super(system, id, config)

		Object.assign(this, {
			...configs,
			...actions,
			...constants,
			...presets,
			...variables,
			...feedbacks,
			...api,
		})

		this.initConstants()
		this.config = config

		// instance state store
		// this.state = {
		// 	someState: 'default state',
		// }

		// Access Denied: Wrong API key
		// Room not found
	}

	init() {
		if (!this.isValidConfig()) {
			return
		}

		this.initActions()
		this.initFeedbacks()
		this.initPresets()
		// this.initVariables()

		this.status(this.STATUS_OK)
	}

	updateConfig(config) {
		this.config = config

		if (!this.isValidConfig()) {
			return
		}

		// reinitialize actions/presets/feedbacks if necessary
		this.initActions()
		this.initFeedbacks()
		this.initPresets()
		// this.initVariables()

		this.status(this.STATUS_OK)
	}

	isValidConfig() {
		if (this.config.roomId === undefined || this.config.apiKey === undefined) {
			this.log('error', 'Please configure instances. Needs Room ID and API Key.')
			this.status(this.STATUS_UNKNOWN, 'Needs Configration')
			return false
		}

		return true
	}

	destroy() {}
}

module.exports = StagetimerInstance
