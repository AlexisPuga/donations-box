#!/usr/bin/env node
const {exec} = require('child_process');
const fs = require('fs');
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
		.option('token', {
			'describe': 'String to be replaced by the donations box\'s markup.',
			'default': '<!-- donations-box -->'
		})
		.demandOption('config', 'Please provide the path to your configuration file using --config [filepath].')
	);
const {token, files, config} = argv;
const markupFilepath = 'dist/donations-box.html';
const eachFilepath = (files, fn) => {

	const filepaths = glob.sync(files);

	filepaths.forEach(fn);

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

});
