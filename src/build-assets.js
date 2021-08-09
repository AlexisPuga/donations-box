const {exec} = require('child_process');
const path = require('path');
const PROJECT_ROOT = path.resolve(__dirname, '..');

module.exports = ({config}) => new Promise((resolve, reject) => {

	exec('npm run build', {
		'cwd': PROJECT_ROOT,
		'env': {
			...process.env,
			// Send this variable to nunjucks-to-html command within the build script.
			// Make sure to set it relative to cwd.
			'DONATIONS_BOX_CONFIG_FILE': path.resolve(process.cwd(), config)
		}
	}, (error, stdout, stderr) => {

		if (error) { return void reject(error); }
		if (stderr) { console.error('[donations-box] stderr:', stderr); }
		if (stdout) { console.log('[donations-box]', stdout); }

		resolve();

	});

});
