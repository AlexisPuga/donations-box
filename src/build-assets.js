const {exec} = require('child_process');
const path = require('path');
const fs = require('fs');
const PROJECT_ROOT = path.resolve(__dirname, '..');

module.exports = ({config}) => new Promise((resolve, reject) => {

	const configFilepath = path.resolve(process.cwd(), config);
	const cachedConfigFilepath = path.resolve(PROJECT_ROOT, 'dist', config);
	const cached = fs.existsSync(cachedConfigFilepath)
		&& fs.readFileSync(configFilepath, 'utf8') === fs.readFileSync(cachedConfigFilepath, 'utf8');

	if (cached) { return void resolve(); }

	exec('npm run build', {
		'cwd': PROJECT_ROOT,
		'env': {
			...process.env,
			// Send this variable to nunjucks-to-html command within the build script.
			// Make sure to set it relative to cwd.
			'DONATIONS_BOX_CONFIG_FILE': configFilepath
		}
	}, (error, stdout, stderr) => {

		if (error) { return void reject(error); }
		if (stderr) { console.error('[donations-box] stderr:', stderr); }
		if (stdout) { console.log('[donations-box]', stdout); }

		// Store in cache.
		try { fs.copyFileSync(configFilepath, cachedConfigFilepath); }
		catch (exception) { console.error('[donations-box][cache]', exception); }

		resolve();

	});

});
