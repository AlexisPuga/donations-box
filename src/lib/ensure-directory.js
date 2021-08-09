const fs = require('fs');
const path = require('path');

module.exports = (filepath) => {

	const directory = path.dirname(filepath);

	if (!fs.existsSync(directory)) {

		fs.mkdirSync(directory, {
			'recursive': true
		});

	}

};
