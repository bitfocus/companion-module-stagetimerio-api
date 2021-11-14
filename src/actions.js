module.exports = {
	initActions() {
		const actions = {}

		/**
		 * Replace with your actions
		 * see https://github.com/bitfocus/companion/wiki/Actions
		 */
		actions.sampleAction = {
			label: 'Sample Action',
			options: [
				{
					type: 'textinput',
					label: 'Sample Option',
					id: 'sampleOption',
					default: 'Default Value',
				},
			],
			callback: (action) => {
				console.log(action.options)
			},
		}

		this.setActions(actions)
	},
}
