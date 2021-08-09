class InjectionError extends Error {

	constructor (error) {

		super(error);

		this.name = 'InjectionError';

	}

};

module.exports = InjectionError;
