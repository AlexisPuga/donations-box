#!/usr/bin/env node
const fs = require('fs');
const minifyHtml = require('@minify-html/js');
const glob = require('glob');
const source = 'public/**/*.html';
const globOptions = null;
const configFileContents = {
	'minifyJs': true,
	'minifyCss': true
};
const config = minifyHtml.createConfiguration(configFileContents);

glob(source, globOptions, (error, filepaths) => {

	filepaths.map((filepath) => {

		const file = fs.readFileSync(filepath);
		const minified = minifyHtml.minify(file, config);

		fs.writeFileSync(filepath, minified);

	});

});
