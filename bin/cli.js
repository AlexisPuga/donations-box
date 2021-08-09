#!/usr/bin/env node
const yargs = require('yargs/yargs');
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
