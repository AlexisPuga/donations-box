class CopyError extends Error {

	constructor (error) {

		super(error);

		this.name = 'CopyError';

	}

};

module.exports = CopyError;
