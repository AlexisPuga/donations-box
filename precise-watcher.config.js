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
		}]
	}, {
		'pattern': ['static/css/*.css'],
		'on': ['ready', 'change'],
		'run': [{
			'cmd': 'cleancss',
			'args': [
				'static/css/donation-box.css',
				'-c', 'ie9',
				'-o', 'public/css/donation-box.min.css'
			]
		}]
	}]
};
