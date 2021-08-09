const glob = require('glob');

module.exports = (files, fn) => {

	const filepaths = glob.sync(files);

	filepaths.forEach(fn);

};
