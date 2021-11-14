const instance_skel = require('../../../instance_skel')

const configs = require('./configs')
const actions = require('./actions')
const constants = require('./constants')
const presets = require('./presets')
const variables = require('./variables')
const feedbacks = require('./feedbacks')

class Instance extends instance_skel {
	constructor(system, id, config) {
		super(system, id, config)

		Object.assign(this, {
			...configs,
			...actions,
			...constants,
			...presets,
			...variables,
			...feedbacks,
		})

		this.config = config

		// instance state store
		this.state = {
			someState: 'default state',
		}
	}

	init() {
		this.initConstants()
		this.initActions()
		this.initPresets()
		this.initFeedbacks()
		this.initVariables()

		this.status(this.STATUS_OK)
	}

	updateConfig(config) {
		this.config = config

		// reinitialize actions/presets/feedbacks if necessary
		// this.initActions()
		// this.initPresets()
		// this.initFeedbacks()

		this.status(this.STATUS_OK)
	}

	destroy() {}
}

module.exports = Instance
