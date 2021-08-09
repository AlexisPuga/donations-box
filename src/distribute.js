const {exec} = require('child_process');
const fs = require('fs');
const path = require('path');
const eachFilepath = require('./lib/each-filepath');

module.exports = ({token, files, config, assetsDir}) => {

	const destinationDir = path.resolve('dist');
	const markupFilepath = path.resolve(destinationDir, 'donations-box.html');
	const assetsFilepath = path.resolve(destinationDir, '**', '*.css');
	const ensureDirectory = (filepath) => {

		const directory = path.dirname(filepath);

		if (!fs.existsSync(directory)) {

			fs.mkdirSync(directory, {
				'recursive': true
			});

		}

	};

	exec('npm run build', {
		'env': {
			...process.env,
			// Send this variable to nunjucks-to-html command within the build script.
			'DONATIONS_BOX_CONFIG_FILE': config
		}
	}, (error, stdout, stderr) => {

		if (error) { return void console.error('[donations-box] error:', error); }
		if (stderr) { console.error('[donations-box] stderr:', stderr); }
		if (stdout) { console.log('[donations-box]', stdout); }

		const markup = fs.readFileSync(markupFilepath);

		try {

			eachFilepath(files, (filepath) => {

				const file = fs.readFileSync(filepath).toString();
				const replacedFile = file.replace(token, markup);
				/** @TODO Allow replacing in another file. I.e: Prevent overrides. */
				const outFile = filepath;

				fs.writeFileSync(outFile, replacedFile);

			});

		}
		catch (error) { return void console.error('[donations-box] Error:', error); }

		try {

			eachFilepath(assetsFilepath, (filepath) => {

				const destinationFilepath = filepath.replace(destinationDir, assetsDir);

				ensureDirectory(destinationFilepath);
				fs.copyFileSync(filepath, destinationFilepath);

			});

		}
		catch (error) { return void console.error('[donations-box] Error while copying assets:', error); }

	});

};
