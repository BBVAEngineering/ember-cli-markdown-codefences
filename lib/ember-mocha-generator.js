/* eslint-env node */

'use strict';

const escape = require('broccoli-markdown-codefences/lib/escape');

const generator = {
	suiteHeader(name) {
		return (
			"import { describe, it } from 'mocha';\n" +
			"import { setupComponentTest } from 'ember-mocha';\n" +
			`describe(${escape(name)}, function() {\n` +
			"	setupComponentTest('dummy', {\n" +
			'		integration: true\n' +
			'	});\n'
		);
	},
	suiteFooter() {
		return '});';
	},
	test(testName, assertion) {
		return (
			`	it(${escape(testName)}, function() {\n` +
			`		${assertion}\n` +
			'	});\n'
		);
	},
};

module.exports = generator;
