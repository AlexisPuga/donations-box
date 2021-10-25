const cpy = require('cpy');
const {npm_package_version} = process.env;

module.exports = {
	'src': [{
		'pattern': 'public',
		'run': [{
			'cmd': 'mkdir',
			'args': ['public']
		}]
	}, {
		'pattern': 'public',
		'on': 'ready',
		'run': [{
			'cmd': 'servor',
			'args': ['public', '--browse', '--reload'],
		}]
	}, {
		'pattern': ['static/**/*.njk', 'static/.njk/**/*.njk', 'nunjucks.development.js'],
		'on': ['ready', 'change'],
		'run': [{
			'cmd': 'nunjucks-to-html',
			'args': ['*.njk', '--baseDir', 'static', '--config', 'nunjucks.development.js']
		}].concat([
			'public/beneficiary.html',
			'public/donate.html',
			'public/index.html'
		].map((src) => ({
			'cmd': 'minify-html',
			'args': [
				/** @TODO Use glob patterns, when possible. */
				src,
				'--output', src,
				'--do-not-minify-doctype',
				'--ensure-spec-compliant-unquoted-attribute-values',
				'--keep-closing-tags',
				'--keep-html-and-head-opening-tags',
				'--keep-spaces-between-attributes',
				'--minify-js',
				'--minify-css',
				'--remove-bangs',
				'--remove-processing-instructions'
			],
			'callNext': 'parallel'
		})))
	}, {
		'pattern': ['static/css/*.css'],
		'on': ['ready', 'change'],
		'run': [{
			'cmd': 'cleancss',
			'args': [
				'static/css/donations-box.css',
				'-c', 'ie9',
				'-o', 'public/css/donations-box/' + npm_package_version + '.min.css'
			]
		}]
	}, {
		'pattern': ['static/**/*.{png,ico,jpg,jpeg,svg}'],
		'on': ['ready', 'change'],
		'baseDir': 'static',
		'run': [{
			/*
			 * @TODO Use beforeRun's function here when precise-watcher
			 *       supports them.
			 */
			'cmd': 'echo',
			'args': [
				'<file>',
				'../public'
			],
			async beforeRun ({args}) {

				const {baseDir} = this;
				const [source, destination] = args;

				await cpy(source, destination, {
					'cwd': baseDir,
					'parents': true
				});

			}
		}]
	}]
};
