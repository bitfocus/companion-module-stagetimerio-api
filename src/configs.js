module.exports = {
	config_fields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: `
					This module allows you to control timers from your stagetimer.io account.<br />
					<hr />
					If you want to use the offline version, check the <i>'Use Custom API Url'</i> option<br />
					and add the custom API Base Url.<br />
					<hr />
					<span style="font-style: italic">
					Stagetimer uses simple token-based authentication. An API key is required.<br />
					You can generate an API key on the controller page. (You will need a Pro account)
					</span>
				`,
			},
			{
				type: 'textinput',
				label: 'Room ID',
				width: 6,
				id: 'roomId',
				required: true,
			},
			{
				type: 'textinput',
				label: 'API Key',
				width: 6,
				id: 'apiKey',
				required: true,
			},
			{
				type: 'checkbox',
				label: 'Use Custom API Url',
				id: 'useCustomApiUrl',
				default: false,
			},
			{
				type: 'textinput',
				label: 'Custom API Base Url',
				width: 40,
				id: 'customApiUrl',
				required: false,
			}
		]
	},
}
