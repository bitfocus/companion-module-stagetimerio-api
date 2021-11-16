module.exports = {
	initActions() {
		const actions = {}
		const parseIndex = (value, type, action) => {
			let index

			this.parseVariables(value, (parsed) => {
				index = parseInt(parsed)
				if (index >= 0) {
					return
				}

				index = NaN
				this.log('error', `${action} - Invalid ${type} index "${parsed}"`)
			})

			return index
		}

		// Room Actions
		actions.highlightedTimerStart = {
			label: 'Highlighted Timer: Start',
			callback: () => this.startHighlightedTimer(),
		}

		actions.highlightedTimerStop = {
			label: 'Highlighted Timer: Stop',
			callback: () => this.stopHighlightedTimer(),
		}

		actions.highlightedTimerToggle = {
			label: 'Highlighted Timer: Toggle',
			callback: () => this.toggleHighlightedTimer(),
		}

		actions.highlightedTimerReset = {
			label: 'Highlighted Timer: Reset',
			callback: () => this.resetHighlightedTimer(),
		}

		actions.highlightedTimerNext = {
			label: 'Highlighted Timer: Next',
			callback: () => this.highlightNextTimer(),
		}

		actions.highlightedTimerPrevious = {
			label: 'Highlighted Timer: Previous',
			callback: () => this.highlightPreviousTimer(),
		}

		actions.highlightedTimerFlash = {
			label: 'Highlighted Timer: Flash',
			callback: () => this.flashTimer(),
		}

		actions.highlightedTimerBlackout = {
			label: 'Highlighted Timer: Blackout',
			callback: () => this.blackoutTimer(),
		}

		actions.highlightedTimerTweak = {
			label: 'Highlighted Timer: Tweak',
			options: [
				{
					type: 'dropdown',
					label: 'Adjustment Type',
					id: 'type',
					choices: [
						{ id: '-', label: '(-) Decrease' },
						{ id: '+', label: '(+) Increase' },
					],
					default: '-',
				},
				{
					type: 'number',
					label: 'Amount',
					id: 'amount',
					min: 1,
					default: 1,
					step: 1,
					required: true,
					range: true,
				},
				{
					type: 'dropdown',
					label: 'Unit',
					id: 'unit',
					choices: [
						{ id: 'h', label: 'Hours' },
						{ id: 'm', label: 'Minutes' },
						{ id: 's', label: 'Seconds' },
					],
					default: 's',
				},
			],
			callback: ({ options }) => this.tweakTimer(`${options.type}${options.amount}${options.unit}`),
		}

		// Timer Actions
		actions.timerSet = {
			label: 'Timer: Set',
			options: [
				{
					type: 'textwithvariables',
					label: 'Timer Index (0 is the first timer)',
					id: 'timer',
					default: '0',
					required: true,
				},
			],
			callback: ({ options }) => {
				const timer = parseIndex(options.timer, 'timer', 'Timer: Set')
				if (!Number.isNaN(timer)) {
					this.setTimer(timer)
				}
			},
		}

		actions.timerStart = {
			label: 'Timer: Start',
			options: [
				{
					type: 'textwithvariables',
					label: 'Timer Index (0 is the first timer)',
					id: 'timer',
					default: '0',
					required: true,
				},
			],
			callback: ({ options }) => {
				const timer = parseIndex(options.timer, 'timer', 'Timer: Start')
				if (!Number.isNaN(timer)) {
					this.startTimer(timer)
				}
			},
		}

		actions.timerStop = {
			label: 'Timer: Stop',
			options: [
				{
					type: 'textwithvariables',
					label: 'Timer Index (0 is the first timer)',
					id: 'timer',
					default: '0',
					required: true,
				},
			],
			callback: ({ options }) => {
				const timer = parseIndex(options.timer, 'timer', 'Timer: Stop')
				if (!Number.isNaN(timer)) {
					this.stopTimer(timer)
				}
			},
		}

		actions.timerToggle = {
			label: 'Timer: Toggle',
			options: [
				{
					type: 'textwithvariables',
					label: 'Timer Index (0 is the first timer)',
					id: 'timer',
					default: '0',
					required: true,
				},
			],
			callback: ({ options }) => {
				const timer = parseIndex(options.timer, 'timer', 'Timer: Toggle')
				if (!Number.isNaN(timer)) {
					this.toggleTimer(timer)
				}
			},
		}

		// Message Actions
		actions.messageShow = {
			label: 'Message: Show',
			options: [
				{
					type: 'textwithvariables',
					label: 'Message Index (0 is the first message)',
					id: 'message',
					default: '0',
					required: true,
				},
			],
			callback: ({ options }) => {
				const message = parseIndex(options.message, 'message', 'Message: Show')
				if (!Number.isNaN(message)) {
					this.showMessage(message)
				}
			},
		}

		actions.messageHide = {
			label: 'Message: Hide',
			options: [
				{
					type: 'textwithvariables',
					label: 'Message Index (0 is the first message)',
					id: 'message',
					default: '0',
					required: true,
				},
			],
			callback: ({ options }) => {
				const message = parseIndex(options.message, 'message', 'Message: HIde')
				if (!Number.isNaN(message)) {
					this.hideMessage(message)
				}
			},
		}

		actions.messageToggle = {
			label: 'Message: Toggle',
			options: [
				{
					type: 'textwithvariables',
					label: 'Message Index (0 is the first message)',
					id: 'message',
					default: '0',
					required: true,
				},
			],
			callback: ({ options }) => {
				const message = parseIndex(options.message, 'message', 'Message: Toggle')
				if (!Number.isNaN(message)) {
					this.toggleMessage(message)
				}
			},
		}

		this.setActions(actions)
	},
}
