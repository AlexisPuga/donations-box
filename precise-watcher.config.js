module.exports = {
	'src': [{
		'pattern': 'public',
		'on': 'ready',
		'run': [{
			'cmd': 'live-server',
			'args': ['public'],
		}]
	}, {
		'pattern': ['static/**/*'],
		'on': ['ready', 'change'],
		'run': [{
			'cmd': 'nunjucks-to-html',
			'args': ['**/*', '--baseDir', 'static']
		}]
	}]
};
