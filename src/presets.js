module.exports = {
	initPresets() {
		const presets = []

		/**
		 * Replace with your resets
		 * see https://github.com/bitfocus/companion/wiki/Presets
		 */
		presets.push({
			category: 'Sample Category',
			label: 'Sample Preset',
			bank: {
				style: 'text',
				text: 'Sample Button',
				size: 18,
				color: this.rgb(255, 255, 255),
				bgcolor: this.rgb(0, 0, 0),
			},
			actions: [
				{
					action: 'sampleAction',
					options: {
						sampleOption: 'Sample Option Value',
					},
				},
			],
		})

		this.setPresetDefinitions(presets)
	},
}
