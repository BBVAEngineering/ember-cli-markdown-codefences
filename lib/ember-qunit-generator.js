'use strict';

const escape = require('broccoli-markdown-codefences/lib/escape');

const generator = {
	suiteHeader(name) {
		return (
			'import { moduleForComponent, test } from \'ember-qunit\';\n' +
			`moduleForComponent('dummy', ${escape(name)}, {\n` +
			'	integration: true\n' +
			'});\n'
		);
	},
	suiteFooter() {
		return '';
	},
	test(testName, assertion) {
		return (
			`test(${escape(testName)}, function(assert) {\n` +
			'	assert.expect(0);\n' +
			`	${assertion}\n` +
			'});\n'
		);
	}
};

module.exports = generator;
