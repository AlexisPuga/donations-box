#!/usr/bin/env node
const {exec} = require('child_process');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const glob = require('glob');
const {argv} = yargs(process.argv.slice(2))
	.demandCommand(1)
	.usage('$0 <files...> [options]', 'Inject the donations box\'s markup in the given files.', (yargs) => yargs
		.positional('files', {
			'describe': 'Files to inject the donations box\'s markup. (Globs supported).'
		})
		.option('config', {
			'describe': 'Path to your configuration file. See the Configure section in the README file to know more.'
		})
		.option('assetsDir', {
			'describe': 'Directory in which the assets for this project will be stored. E.g: The css file.',
			'default': 'public'
		})
		.option('token', {
			'describe': 'String to be replaced by the donations box\'s markup.',
			'default': '<!-- donations-box -->'
		})
		.demandOption('config', 'Please provide the path to your configuration file using --config [filepath].')
	);
const {token, files, config, assetsDir} = argv;
const destinationDir = path.resolve('dist');
const markupFilepath = path.resolve(destinationDir, 'donations-box.html');
const assetsFilepath = path.resolve(destinationDir, '**', '*.css');
const eachFilepath = (files, fn) => {

	const filepaths = glob.sync(files);

	filepaths.forEach(fn);

};
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
