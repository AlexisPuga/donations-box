var dollars = {
	'symbol': '$',
	'name': 'Dollars',
	'abbr': 'USD'
};

module.exports = {
	'render': {
		'context': {
			// This donations are examples.
			// You can modify them any way you want.
			'donations': [{
				'type': 'one-off',
				'href': '/donate.html',
				'title': 'Buy me 1 coffee',
				'ammounts': [{
					'value': 3,
					'currency': dollars
				}]
			}, {
				'type': 'one-off',
				'href': '/donate.html',
				'title': 'Buy me 2 coffees',
				'ammounts': [{
					'value': 6,
					'currency': dollars
				}]
			}, {
				'type': 'one-off',
				'href': '/donate.html',
				'title': 'Buy me 3 coffees',
				'ammounts': [{
					'value': 9,
					'currency': dollars
				}]
			}, {
				'type': 'recurrent',
				'title': 'Buy me a daily coffee',
				'ammounts': [{
					'href': '/donate.html',
					'value': 3,
					'billed': 'Daily',
					'currency': dollars
				}, {
					'href': '/donate.html',
					'value': 3 * 7,
					'billed': 'Weekly',
					'currency': dollars
				}, {
					'href': '/donate.html',
					'value': 3 * 30,
					'billed': 'Monthly',
					'currency': dollars
				}, {
					'href': '/donate.html',
					'value': 3 * 365,
					'billed': 'Yearly',
					'currency': dollars
				}]
			}]
		}
	}
};
