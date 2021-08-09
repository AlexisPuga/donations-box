const fs = require('fs');
const eachFilepath = require('./lib/each-filepath');

module.exports = (markupFilepath, files, {token}) => {

	const markup = fs.readFileSync(markupFilepath);

	eachFilepath(files, (filepath) => {

		const file = fs.readFileSync(filepath).toString();
		const replacedFile = file.replace(token, markup);
		/** @TODO Allow replacing in another file. I.e: Prevent overrides. */
		const outFile = filepath;

		fs.writeFileSync(outFile, replacedFile);

	});

};
