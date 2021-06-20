module.exports = {
	'src': [{
		'pattern': 'public',
		'on': 'ready',
		'run': [{
			'cmd': 'serve',
			'args': ['public'],
		}]
	}]
};
