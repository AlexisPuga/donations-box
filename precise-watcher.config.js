module.exports = {
	'src': [{
		'pattern': 'public',
		'on': 'ready',
		'run': [{
			'cmd': 'live-server',
			'args': ['public'],
		}]
	}, {
		'pattern': ['static/**/*.njk', 'static/.njk/**/*.njk', 'nunjucks.config.js'],
		'on': ['ready', 'change'],
		'run': [{
			'cmd': 'nunjucks-to-html',
			'args': ['*.njk', '--baseDir', 'static']
		}, {
			'cmd': 'html-minifier',
			'args': [
				'--collapse-whitespace',
				'--remove-comments',
				'--remove-redundant-attributes',
				'--remove-script-type-attributes',
				'--minify-css', 'true',
				'--minify-js', 'true',
				'--input-dir', 'public',
				'--output-dir', 'public',
				'--file-ext', 'html'
			]
		}]
	}, {
		'pattern': ['static/css/*.css'],
		'on': ['ready', 'change'],
		'run': [{
			'cmd': 'cleancss',
			'args': [
				'static/css/donations-box.css',
				'-c', 'ie9',
				'-o', 'public/css/donations-box.min.css'
			]
		}]
	}, {
		'pattern': ['static/**/*.{png,ico,jpg,jpeg,svg}'],
		'on': ['ready', 'change'],
		'baseDir': 'static',
		'run': [{
			'cmd': 'cpy',
			'args': [
				'<file>',
				'../public',
				'--cwd=static',
				'--parents'
			]
		}]
	}]
};
