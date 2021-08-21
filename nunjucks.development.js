const {npm_package_version} = process.env;
var dollars = {
	'symbol': '$',
	'name': 'Dollars',
	'abbr': 'USD'
};

module.exports = {
	'render': {
		'context': {
			npm_package_version,
			'beneficiary': {
				'alias': 'Donations Box',
				'href': '/beneficiary.html',
				'icon': {
					'src': '/favicon.svg',
					'alt': 'Donations Box icon',
					'href': '/beneficiary.html?icon'
				}
			},
			// This donations are examples.
			// You can modify them any way you want.
			'donations': {
				'Stripe': [{
					'type': 'one-off',
					'href': '/donate.html',
					'title': 'Buy me 1 coffee',
					'amounts': [{
						'value': 3,
						'currency': dollars
					}]
				}, {
					'type': 'one-off',
					'href': '/donate.html',
					'title': 'Buy me 2 coffees',
					'amounts': [{
						'value': 6,
						'currency': dollars
					}]
				}, {
					'type': 'one-off',
					'href': '/donate.html',
					'title': 'Buy me 3 coffees',
					'amounts': [{
						'value': 9,
						'currency': dollars
					}]
				}, {
					'type': 'recurrent',
					'title': 'Buy me a daily coffee',
					'amounts': [{
						'href': '/donate.html',
						'value': 3,
						'periodicity': 'Daily',
						'currency': dollars
					}, {
						'href': '/donate.html',
						'value': 3 * 7,
						'periodicity': 'Weekly',
						'currency': dollars
					}, {
						'href': '/donate.html',
						'value': 3 * 30,
						'periodicity': 'Monthly',
						'currency': dollars
					}, {
						'href': '/donate.html',
						'value': 3 * 365,
						'periodicity': 'Yearly',
						'currency': dollars
					}]
				}],
				'Monero': [{
					'type': 'one-off',
					'title': 'Donate via Monero',
					'amounts': [{
						'href': 'monero:8Bqeu7beB2ocwTr1Gn4gz6VUUoqVDokiR9WAY2E8m5toNSbRvRMrWjgWYnaNGchWc2cVRgVvidNpLjZF5vXJnauf7s2oHPw',
						'qr': {
							'src': '/img/monero-qr.png',
							'alt': 'Donations Box\'s Monero QR Code',
							'srcset': '/img/monero-qr.png 2x'
						},
						'currency': {
							'name': 'Monero',
							'abbr': 'XMR'
						}
					}]
				}]
			}
		}
	}
};
