// Custom error
class NetworkError extends Error {
	get name() {
		return this.constructor.name
	}
}

class HttpError extends Error {

	/** @param {Response} response */
	constructor(response) {
		super(`${response.status} ${response.statusText}`)
	}

	get name() {
		return this.constructor.name
	}
}

class ApiError extends Error {
	get name() {
		return this.constructor.name
	}
}

/**
 * API Client class for communicating with the Stagetimer.io HTTP RPC API (v1)
 */
export class ApiClient {

	/**
	 * API Client constructor. Configured with the same
	 * API URL, key, and room ID from the module config
	 *
	 * @param {StagetimerConfig} config
	 */
	constructor(config) {
		this.apiUrl = config.apiUrl
		this.apiKey = config.apiKey
		this.roomId = config.roomId
		return this
	}

	/**
	 * Sends an action to the Stagetimer API
	 *
	 * @param {string} path
	 * @param {object} queryParams
	 * @returns {Promise<ApiResponse>}
	 */
	async send(path = '', queryParams = {}) {
		try {

			const params = {
				room_id: this.roomId,
				api_key: this.apiKey,
				...queryParams,
			}

			let query = ''
			query = new URLSearchParams(params).toString()
			query = query && `?${query}`

			const url = `${this.apiUrl}${path}${query}`

			const response = await fetch(url, {
				// Time out before the default Companion IPC action timeout
				signal: AbortSignal.timeout(4900)
			})

			if (!response.ok) {

				// Handle both JSON and non-JSON response body
				const maybeJSON = await response.json().catch(() => {
					throw new HttpError(response)
				})

				throw new ApiError(maybeJSON.message)
			}

			return await response.json()

		} catch (error) {
			switch (error.name) {
				// Handle the timeout with a friendly message
				case 'TimeoutError':
					throw new NetworkError('Request took longer than 5s and timed out')

				// fetch() throws TypeError on network problems
				case 'TypeError':
					throw new NetworkError('There is a problem with the connection')

				// Pass errors through
				default:
					throw error
			}
		}
	}
}
