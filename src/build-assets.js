const {exec} = require('child_process');

module.exports = ({config}, cb) => {

	exec('npm run build', {
		'env': {
			...process.env,
			// Send this variable to nunjucks-to-html command within the build script.
			'DONATIONS_BOX_CONFIG_FILE': config
		}
	}, (error, stdout, stderr) => {

		if (error) { return void cb(error); }

		cb(null, {stdout, stderr});

	});

};
