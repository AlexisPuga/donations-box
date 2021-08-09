class BuildError extends Error {

	constructor (error) {

		super(error);

		this.name = 'BuildError';

	}

};

module.exports = BuildError;
