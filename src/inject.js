const fs = require('fs');
const eachFilepath = require('./lib/each-filepath');

module.exports = (content, files, {token}) => {

	eachFilepath(files, (filepath) => {

		const file = fs.readFileSync(filepath).toString();
		const replacedFile = file.replace(token, content);
		/** @TODO Allow replacing in another file. I.e: Prevent overrides. */
		const outFile = filepath;

		fs.writeFileSync(outFile, replacedFile);

	});

};
