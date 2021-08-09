const path = require('path');
const injectMarkup = require('./inject-markup');
const copyAssets = require('./copy-assets');
const buildAssets = require('./build-assets');

module.exports = async ({token, files, config, assetsDir}) => {

	const destinationDir = path.resolve('dist');
	const markupFilepath = path.resolve(destinationDir, 'donations-box.html');

	try { await buildAssets({config}); }
	catch (error) { return void console.error('[donations-box] Error building assets:', error); }

	try { await injectMarkup(markupFilepath, files, {token}); }
	catch (error) { return void console.error('[donations-box] Error injecting markup:', error); }

	try { await copyAssets(destinationDir, assetsDir); }
	catch (error) { return void console.error('[donations-box] Error while copying assets:', error); }

};
