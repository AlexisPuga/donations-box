const {DONATIONS_BOX_CONFIG_FILE, npm_package_version} = process.env;

module.exports = {
	'options': {
		'data': DONATIONS_BOX_CONFIG_FILE
	},
	'render': {
		'context': {
			npm_package_version
		}
	}
};
