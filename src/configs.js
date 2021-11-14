module.exports = {
	config_fields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: '[replace with module description]',
			},
			/**
			 * replace with configuration fields for your module
			 * see https://github.com/bitfocus/companion/wiki/Module-Configuration
			 */
			// {
			// 	type: 'textinput',
			// 	id: 'ip',
			// 	label: 'Target IP',
			// 	width: 6,
			// 	regex: this.REGEX_IP,
			// 	default: this.DEFAULT_IP,
			// 	required: true,
			// },
			// {
			// 	type: 'textinput',
			// 	id: 'port',
			// 	label: 'Target Port',
			// 	width: 6,
			// 	regex: this.REGEX_PORT,
			// 	default: this.DEFAULT_PORT,
			// 	required: true,
			// },
		]
	},
}
