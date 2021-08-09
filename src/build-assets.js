const {exec} = require('child_process');

module.exports = ({config}) => new Promise((resolve, reject) => {

	exec('npm run build', {
		'env': {
			...process.env,
			// Send this variable to nunjucks-to-html command within the build script.
			'DONATIONS_BOX_CONFIG_FILE': config
		}
	}, (error, stdout, stderr) => {

		if (error) { return void reject(error); }

		resolve({stdout, stderr});

	});

});
