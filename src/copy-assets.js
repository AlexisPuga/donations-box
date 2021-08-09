const path = require('path');
const fs = require('fs');
const ensureDirectory = require('./lib/ensure-directory');
const eachFilepath = require('./lib/each-filepath');

module.exports = (baseDir, destinationDir) => {

	const assetsFilepath = path.resolve(baseDir, '**', '*.css');

	eachFilepath(assetsFilepath, (filepath) => {

		const destinationFilepath = filepath.replace(baseDir, destinationDir);

		ensureDirectory(destinationFilepath);
		fs.copyFileSync(filepath, destinationFilepath);

	});

};
