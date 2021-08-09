const path = require('path');
const injectMarkup = require('./inject-markup');
const copyAssets = require('./copy-assets');
const buildAssets = require('./build-assets');

module.exports = async ({token, files, config, assetsDir}) => {

	const destinationDir = path.resolve('dist');
	const markupFilepath = path.resolve(destinationDir, 'donations-box.html');

	await buildAssets({config});

	try { injectMarkup(markupFilepath, files, {token}); }
	catch (error) { return void console.error('[donations-box] Error:', error); }

	try { copyAssets(destinationDir, assetsDir); }
	catch (error) { return void console.error('[donations-box] Error while copying assets:', error); }

};
