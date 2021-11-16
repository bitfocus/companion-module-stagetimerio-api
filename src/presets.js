const images = require('./images')

module.exports = {
	initPresets() {
		const presets = []

		// Room Presets
		presets.push({
			category: 'Room Presets',
			label: 'Start Highlighted Timer',
			bank: {
				style: 'png',
				text: 'START',
				size: '7',
				alignment: 'center:bottom',
				pngalignment: 'center:center',
				color: 16777215,
				bgcolor: 0,
				latch: false,
				relative_delay: false,
				png64: images.startTimer,
			},
			actions: [
				{
					action: 'highlightedTimerStart',
					options: {},
				},
			],
		})

		presets.push({
			category: 'Room Presets',
			label: 'Stop Highlighted Timer',
			bank: {
				style: 'png',
				text: 'STOP',
				size: '7',
				alignment: 'center:bottom',
				pngalignment: 'center:center',
				color: 16777215,
				bgcolor: 0,
				latch: false,
				relative_delay: false,
				png64: images.stopTimer,
			},
			actions: [
				{
					action: 'highlightedTimerStop',
					options: {},
				},
			],
		})

		presets.push({
			category: 'Room Presets',
			label: 'Toggle Highlighted Timer',
			bank: {
				style: 'png',
				text: 'TOGGLE',
				size: '7',
				alignment: 'center:bottom',
				pngalignment: 'center:center',
				color: 16777215,
				bgcolor: 0,
				latch: false,
				relative_delay: false,
				png64: images.toggle,
			},
			actions: [
				{
					action: 'highlightedTimerToggle',
					options: {},
				},
			],
		})

		presets.push({
			category: 'Room Presets',
			label: 'Reset Highlighted Timer',
			bank: {
				style: 'png',
				text: 'RESET',
				size: '7',
				alignment: 'center:bottom',
				pngalignment: 'center:center',
				color: 16777215,
				bgcolor: 0,
				latch: false,
				relative_delay: false,
				png64: images.resetTimer,
			},
			actions: [
				{
					action: 'highlightedTimerReset',
					options: {},
				},
			],
		})

		presets.push({
			category: 'Room Presets',
			label: 'Previous Highlighted Timer',
			bank: {
				style: 'png',
				text: 'PREVIOUS',
				size: '7',
				alignment: 'center:bottom',
				pngalignment: 'center:center',
				color: 16777215,
				bgcolor: 0,
				latch: false,
				relative_delay: false,
				png64: images.previous,
			},
			actions: [
				{
					action: 'highlightedTimerPrevious',
					options: {},
				},
			],
		})

		presets.push({
			category: 'Room Presets',
			label: 'Next Highlighted Timer',
			bank: {
				style: 'png',
				text: 'NEXT',
				size: '7',
				alignment: 'center:bottom',
				pngalignment: 'center:center',
				color: 16777215,
				bgcolor: 0,
				latch: false,
				relative_delay: false,
				png64: images.next,
			},
			actions: [
				{
					action: 'highlightedTimerNext',
					options: {},
				},
			],
		})

		presets.push({
			category: 'Room Presets',
			label: 'Flash Highlighted Timer',
			bank: {
				style: 'png',
				text: 'FLASH',
				size: '7',
				alignment: 'center:bottom',
				pngalignment: 'center:center',
				color: 16777215,
				bgcolor: 0,
				latch: false,
				relative_delay: false,
				png64: images.flash,
			},
			actions: [
				{
					action: 'highlightedTimerFlash',
					options: {},
				},
			],
		})

		presets.push({
			category: 'Room Presets',
			label: 'Blackout Highlighted Timer',
			bank: {
				style: 'png',
				text: 'BLACKOUT',
				size: '7',
				alignment: 'center:bottom',
				pngalignment: 'center:center',
				color: 16777215,
				bgcolor: 0,
				latch: false,
				relative_delay: false,
				png64: images.blackout,
			},
			actions: [
				{
					action: 'highlightedTimerBlackout',
					options: {},
				},
			],
		})

		const presetCount = 10 // Used for Timer/Message Presets

		// Timer Presets
		for (let index = 0; index < presetCount; index++) {
			presets.push({
				category: 'Timer Presets',
				label: `Set Timer ${index}`,
				bank: {
					style: 'png',
					text: `SET\\n\\n\\n\\n\\n\\nTIMER ${index}`,
					size: '7',
					alignment: 'center:center',
					pngalignment: 'center:center',
					color: 16777215,
					bgcolor: 0,
					latch: false,
					relative_delay: false,
					png64: images.timer,
				},
				actions: [
					{
						action: 'timerSet',
						options: { timer: index.toString() },
					},
				],
			})
		}

		for (let index = 0; index < presetCount; index++) {
			presets.push({
				category: 'Timer Presets',
				label: `Start Timer ${index}`,
				bank: {
					style: 'png',
					text: `START\\n\\n\\n\\n\\n\\nTIMER ${index}`,
					size: '7',
					alignment: 'center:center',
					pngalignment: 'center:center',
					color: 16777215,
					bgcolor: 0,
					latch: false,
					relative_delay: false,
					png64: images.startTimer,
				},
				actions: [
					{
						action: 'timerStart',
						options: { timer: index.toString() },
					},
				],
			})
		}

		for (let index = 0; index < presetCount; index++) {
			presets.push({
				category: 'Timer Presets',
				label: `Stop Timer ${index}`,
				bank: {
					style: 'png',
					text: `STOP\\n\\n\\n\\n\\n\\nTIMER ${index}`,
					size: '7',
					alignment: 'center:center',
					pngalignment: 'center:center',
					color: 16777215,
					bgcolor: 0,
					latch: false,
					relative_delay: false,
					png64: images.stopTimer,
				},
				actions: [
					{
						action: 'timerStop',
						options: { timer: index.toString() },
					},
				],
			})
		}

		for (let index = 0; index < presetCount; index++) {
			presets.push({
				category: 'Timer Presets',
				label: `Toggle Timer ${index}`,
				bank: {
					style: 'png',
					text: `TOGGLE\\n\\n\\n\\n\\n\\nTIMER ${index}`,
					size: '7',
					alignment: 'center:center',
					pngalignment: 'center:center',
					color: 16777215,
					bgcolor: 0,
					latch: false,
					relative_delay: false,
					png64: images.toggle,
				},
				actions: [
					{
						action: 'timerToggle',
						options: { timer: index.toString() },
					},
				],
			})
		}

		// Message Presets
		for (let index = 0; index < presetCount; index++) {
			presets.push({
				category: 'Message Presets',
				label: `Show Message ${index}`,
				bank: {
					style: 'png',
					text: `SHOW\\n\\n\\n\\n\\n\\nMESSAGE ${index}`,
					size: '7',
					alignment: 'center:center',
					pngalignment: 'center:center',
					color: 16777215,
					bgcolor: 0,
					latch: false,
					relative_delay: false,
					png64: images.showMessage,
				},
				actions: [
					{
						action: 'messageShow',
						options: { timer: index.toString() },
					},
				],
			})
		}

		for (let index = 0; index < presetCount; index++) {
			presets.push({
				category: 'Message Presets',
				label: `Hide Message ${index}`,
				bank: {
					style: 'png',
					text: `HIDE\\n\\n\\n\\n\\n\\nMESSAGE ${index}`,
					size: '7',
					alignment: 'center:center',
					pngalignment: 'center:center',
					color: 16777215,
					bgcolor: 0,
					latch: false,
					relative_delay: false,
					png64: images.hideMessage,
				},
				actions: [
					{
						action: 'messageHide',
						options: { timer: index.toString() },
					},
				],
			})
		}

		for (let index = 0; index < presetCount; index++) {
			presets.push({
				category: 'Message Presets',
				label: `Toogle Message ${index}`,
				bank: {
					style: 'png',
					text: `TOGGLE\\n\\n\\n\\n\\n\\nMESSAGE ${index}`,
					size: '7',
					alignment: 'center:center',
					pngalignment: 'center:center',
					color: 16777215,
					bgcolor: 0,
					latch: false,
					relative_delay: false,
					png64: images.toggle,
				},
				actions: [
					{
						action: 'messageToggle',
						options: { timer: index.toString() },
					},
				],
			})
		}

		this.setPresetDefinitions(presets)
	},
}
