import { InstanceBase, runEntrypoint, InstanceStatus } from '@companion-module/base'
import { initialConfig, validateConfig, configFields } from './config.js'
import { initialState, startState } from './state.js'
import { ApiClient } from './api.js'
import { socketStart, socketStop } from './socket.js'
import { loadActions } from './actions.js'
import { loadFeedbacks } from './feedbacks.js'
import { loadVariables } from './variables.js'
import { loadPresets } from './presets.js'

export class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	config = initialConfig
	state = initialState

	async init(config) {
		await this.configure(config)
	}

	async configUpdated(config) {
		await this.configure(config)
	}

	async configure(config) {
		try {
			validateConfig(config)
		} catch (error) {
			this.updateStatus(InstanceStatus.BadConfig)
			this.log('error', error.message)
			return
		}

		this.config = config
		this.apiClient = new ApiClient(config)

		startState(this)

		socketStart(this)

		try {
			loadActions(this)
			loadFeedbacks(this)
			loadVariables(this)
			loadPresets(this)
		} catch (error) {
			throw new Error(`Failed to start. Error: ${error.message}`)
		}
	}

	getConfigFields() {
		return configFields
	}

	async destroy() {
		socketStop()
	}
}

runEntrypoint(ModuleInstance, [])
