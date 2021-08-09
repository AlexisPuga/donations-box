const fs = require('fs');
const path = require('path');
const inject = require('./inject');
const copyAssets = require('./copy-assets');
const buildAssets = require('./build-assets');

module.exports = async ({token, files, config, assetsDir}) => {

	const destinationDir = path.resolve('dist');
	const markupFilepath = path.resolve(destinationDir, 'donations-box.html');

	await buildAssets({config});

	const markup = fs.readFileSync(markupFilepath);

	try { inject(markup, files, {token}); }
	catch (error) { return void console.error('[donations-box] Error:', error); }

	try { copyAssets(destinationDir, assetsDir); }
	catch (error) { return void console.error('[donations-box] Error while copying assets:', error); }

};
