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
		.option('token', {
			'describe': 'String to be replaced by the donations box\'s markup.',
			'default': '<!-- donations-box -->'
		})
	);
const {token, files} = argv;
const markupFilepath = 'dist/donations-box.html';

exec('npm run build', (error, stdout, stderr) => {

	if (error) { return void console.error('[donations-box] error:', error); }
	if (stderr) { console.error('[donations-box] stderr:', stderr); }
	if (stdout) { console.log('[donations-box]', stdout); }

	const markup = fs.readFileSync(markupFilepath);

	glob(files, (error, filepaths) => {

		if (error) { return void console.error('[donations-box] error:', error); }

		filepaths.forEach((filepath) => {

			const file = fs.readFileSync(filepath).toString();
			const replacedFile = file.replace(token, markup);
			/** @TODO Allow replacing in another file. I.e: Prevent overrides. */
			const outFile = filepath;

			fs.writeFileSync(outFile, replacedFile);

		});

	});

});