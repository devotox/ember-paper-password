/* eslint-env node */
'use strict';

module.exports = {
	name: 'paper-password',
	options: {
		babel: {
			plugins: [
				'transform-object-rest-spread',
				'transform-async-to-generator'
			]
		},
		'ember-cli-babel': {
			compileModules: true,
			includePolyfill: true,
			disableDebugTooling: true
		}
	}
};