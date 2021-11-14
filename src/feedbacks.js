module.exports = {
	initFeedbacks() {
		/**
		 * Replace with your feedbacks
		 * see https://github.com/bitfocus/companion/wiki/Feedback
		 * use this.checkFeedbacks('sampleFeedback') to recheck the specified feedback
		 */
		const feedbacks = {}

		feedbacks.sampleFeedback = {
			type: 'boolean',
			label: 'Brief description of the Sample Feedback',
			description: 'Longer description of the Sample Feedback',
			style: {
				color: this.rgb(0, 0, 0),
				bgcolor: this.rgb(255, 0, 0),
			},
			options: [
				{
					type: 'text',
					label: 'Some Value',
					id: 'someValue',
					default: 'Some other state',
				},
			],
			callback: function ({ options }) {
				// This callback will be called whenever companion wants to check if this feedback is 'active' and should affect the button style
				if (this.store.sampleState == options.someValue) {
					return true
				} else {
					return false
				}
			},
		}

		this.setFeedbackDefinitions(feedbacks)
	},
}
