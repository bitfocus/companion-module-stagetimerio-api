import { InstanceBase, runEntrypoint, InstanceStatus } from '@companion-module/base'
import { initialConfig, validateConfig, configFields } from './config.js'
import { initialState } from './state.js'
import { ApiClient } from './api.js'
import { socketStart, socketStop } from './socket.js'
import { loadActions } from './actions.js'
import { loadFeedbacks } from './feedbacks.js'
import { loadVariables } from './variables.js'
import { loadPresets } from './presets.js'

/**
 * @extends {InstanceBase<StagetimerConfig>}
 */
export class ModuleInstance extends InstanceBase {

  config = initialConfig
  state = initialState

  /** @type {ApiClient | null} */
  apiClient = null

  /**
   * @param {StagetimerConfig} config
   * @returns {Promise<void>}
   */
  async init (config) {
    await this.configure(config)
  }

  /**
   * @param {StagetimerConfig} config
   * @returns {Promise<void>}
   */
  async configUpdated (config) {
    await this.configure(config)
  }

  /**
   * @param {StagetimerConfig} config
   * @returns {Promise<void>}
   */
  async configure (config) {
    try {
      validateConfig(config)
    } catch (error) {
      this.updateStatus(InstanceStatus.BadConfig)
      if(error instanceof Error) {
        this.log('error', error.message)
      }
    }

    this.config = config
    this.apiClient = new ApiClient(config)

    try {
      socketStart(this)
      loadActions(this)
      loadFeedbacks(this)
      loadVariables(this)
      loadPresets(this)
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(`Failed to start. Error: ${error.message}`)
      }
    }
  }

  getConfigFields () {
    return configFields
  }

  async destroy () {
    socketStop()
  }
}

runEntrypoint(ModuleInstance, [])
