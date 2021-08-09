(function (mainElement, statesAttributeName) {

	'use strict';

	var states = (function parseStatesFromAttribute (element, attributeName) {

		var states = {};
		var attributeValue = element.getAttribute(attributeName);

		try { states = JSON.parse(attributeValue); }
		catch (exception) { console.error(exception); }

		return states;

	})(mainElement, statesAttributeName);
	var removeState = function (element, state) {

		// Use className to add <= IE9 support.
		// Don't use trim as is not supported in IE9 D:
		element.className = element.className.replace(
			new RegExp('\s*' + state),
			''
		).replace(/\s+$/, '');

	};
	var addState = function (element, state) {

		element.className += ' ' + state;

	};
	var STATE_OPEN = states.open;
	var showDonationsButton = mainElement.querySelector('.header .show-donations-button');

	// Remove the open state if it's using js.
	removeState(mainElement, STATE_OPEN);

	showDonationsButton.addEventListener('click', function setOpenState (e) {

		this.removeEventListener('click', setOpenState, false);
		addState(mainElement, STATE_OPEN);

	}, false);

})(document.getElementById('donations-box'), 'data-states');
