# Donations Box

A widget to ask for donations.

List links for your donations in a pretty way.

## Installation

Run `npm i donations-box --save` or `yarn add donations-box`.

## Usage
First, create your configuration file (`my-config`, for example). [See here for more information](#Configuration).

Then, right before you publish your site:
1. Add `<!-- donations-box -->` to any file (`my-file`, for example).
2. Run `donations-box my-file --config my-config`. (Make sure to replace `my-config` and `my-file` with your files).
3. Check if `my-file` was updated and publish your website as you normally do!

### Options
If you need to change anything, try setting any of the following options:
```cli
donations-box <files...> [options]

Inject the donations box's markup in the given files.

Positionals:
  files  Files to inject the donations box's markup. (Globs supported).

Options:
  --help       Show help                                              [boolean]
  --version    Show version number                                    [boolean]
  --config     Path to your configuration file. See the Configure section in
               the README file to know more.                         [required]
  --assetsDir  Directory in which the assets for this project will be stored.
               E.g: The css file.                           [default: "public"]
  --token      String to be replaced by the donations box's markup.
                                             [default: "<!-- donations-box -->"]
```

## Configuration
Create a new js/json file with any of the following options (remember that all the options are used for display purposes):

```js
module.exports = {
	/**
	 * If a truthy value is given, open all links in a new window.
	 * 
	 * @type {?boolean}
	 */
	'openInNewWindow': false,
	/**
	 * [Optional]
	 *
	 * The reason why you're asking for donations.
	 * 
	 * @type {?string}
	 */
	'headline': '',
	/**
	 * [Optional]
	 * 
	 * A disclaimer about your donations.
	 * 
	 * Any HTML tag is valid, but it will be added within a <small> element.
	 * 
	 * @type {?string}
	 */
	'disclaimer': '',
	/**
	 * [Only available if headline is set]
	 * 
	 * If true, always show the donations. Javascript is not used.
	 * If false, show a button to open the donations. Requires Javascript
	 * to work.
	 * If "auto", show a button to open the donations if Javascript
	 * is enabled, otherwise show the donations.
	 * 
	 * @type {?boolean|?string}
	 */
	'open': true,
	/**
	 * The person/company who is asking for donations.
	 * 
	 * @type {!object}
	 */
	'beneficiary': {
		/**
		 * The display name for the beneficiary.
		 * 
		 * @type {!string}
		 */
		'alias': 'Donations Box',
		/**
		 * The url to the beneficiary's website,
		 * or something similar.
		 * 
		 * @type {!string}
		 */
		'href': '/beneficiary.html',
		/**
		 * Options for the beneficiary's logo/icon.
		 * 
		 * @type {!object}
		 */
		'icon': {
			/**
			 * [Available if "html" is not set]
			 * 
			 * Url to the image.
			 * 
			 * @type {!string}
			 */
			'src': '/favicon.svg',
			/**
			 * [Available if "html" is not set]
			 * 
			 * Icon's description.
			 * 
			 * @type {!string}
			 */
			'alt': 'Donations Box icon',
			/**
			 * [Available if "html" is not set]
			 * 
			 * Url to visit, on click.
			 * 
			 * @type {!string}
			 */
			'href': '/beneficiary.html?icon',
			/**
			 * [Optional]
			 * 
			 * Add your own markup to load the image.
			 * 
			 * @type {?string}
			 */
			'html': null
		}
	},
	/**
	 * An object containing payment providers as keys,
	 * and payment specific options as values.
	 * 
	 * @type {!object}
	 */
	'donations': {
		/**
		 * Payment options.
		 * 
		 * @type {!object[]}
		 */
		'Stripe': [{
			/**
			 * Type of payment: "one-off" or "recurrent".
			 * 
			 * @type {!string}
			 */
			'type': 'one-off',
			/**
			 * The url where you actually make the donation.
			 * It usually includes the description of your donation
			 * (usually referred as "product") and some payment options.
			 * 
			 * @type {!string}
			 */
			'href': '/donate.html',
			/**
			 * The title for your donation/product.
			 * 
			 * @type {!string}
			 */
			'title': 'Buy me 1 coffee',
			/**
			 * The available amounts for your donation.
			 *
			 * If "type" is set to "one-off", it will use the first amount
			 * and ignore the others.
			 * 
			 * @type {!object[]|object}
			 */
			'amounts': [{
				/**
				 * The url for your donation/product.
				 * 
				 * Defaults to donation.href.
				 * 
				 * @type {?string}
				 */
				'href': '/donate.html',
				/**
				 * The requested amount.
				 * 
				 * @type {!number}
				 */
				'value': 3,
				/**
				 * [Available only on "recurrent" donations].
				 * 
				 * The periodicity of the payment:
				 * "Daily", "Monthly", "Yearly", ...
				 * 
				 * The only requirement for this value is that
				 * is should fill the blanks in the following text:
				 * "billed ________".
				 * 
				 * @type {?string}
				 */
				'periodicity': 'Daily',
				/**
				 * [Optional]
				 * 
				 * Options for a QR code.
				 * 
				 * @type {?object}
				 */
				'qr': {
					/**
					 * Url for the image.
					 * 
					 * @type {!string}
					 */
					'src': '/img/monero-qr.png',
					/**
					 * Image's description.
					 * 
					 * @type {!string}
					 */
					'alt': 'Donations Box\'s Monero QR Code',
					/**
					 * [Optional]
					 * 
					 * A valid img[srcset] attribute value.
					 * 
					 * Useful to show different images on retina displays,
					 * for example.
					 * 
					 * @type {?string}
					 */
					'srcset': '/img/monero-qr.png 2x',
					/**
					 * If a truthy value is given, the qr code will
					 * appear on focus/hover.
					 * 
					 * @type {?boolean} 
					 */
					'animate': false
				},
				/**
				 * Options for the used currency.
				 *
				 * Since this value could get repetitive, it's
				 * recommended to use a javascript file and
				 * use a variable here instead. Maybe future
				 * versions will allow setting a string here,
				 * but for now it requires an object.
				 * 
				 * @type {!object}
				 */
				'currency': {
					/**
					 * The symbol for the currency.
					 * 
					 * @type {?string}
					 */
					'symbol': '$',
					/**
					 * The name of the currency.
					 * 
					 * @type {!string}
					 */
					'name': 'Dollars',
					/**
					 * The abbreviation for the currency's name.
					 * 
					 * @type {!string}
					 */
					'abbr': 'USD'
				}
			}]
		}]
	}
};
```
## License
This project is under the [MIT License](LICENSE), unless otherwise stated.
