const path = require('path');
const injectMarkup = require('./inject-markup');
const copyAssets = require('./copy-assets');
const buildAssets = require('./build-assets');
const {BuildError, InjectionError, CopyError} = require('./errors');
const PROJECT_ROOT = path.resolve(__dirname, '..');

module.exports = async ({token, files, config, assetsDir}) => {

	const destinationDir = path.resolve(PROJECT_ROOT, 'dist');
	const markupFilepath = path.resolve(destinationDir, 'donations-box.html');

	try { await buildAssets({config}); }
	catch (error) { throw new BuildError(error); }

	try { await injectMarkup(markupFilepath, files, {token}); }
	catch (error) { return new InjectionError(error); }

	try { await copyAssets(destinationDir, assetsDir); }
	catch (error) { return new CopyError(error); }

};
