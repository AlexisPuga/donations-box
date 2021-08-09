#!/usr/bin/env node
const yargs = require('yargs/yargs');
const distribute = require('../src/distribute');
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

(async () => {

	try { await distribute(argv); }
	catch (exception) { console.error('[donations-box]:', exception); }

})();
