/* eslint-env node */

'use strict';

const escape = require('broccoli-markdown-codefences/lib/escape');

const generator = {
	suiteHeader(name) {
		return (
			"import { module, test } from 'qunit';\n" +
			"import { setupRenderingTest } from 'ember-qunit';\n" +
			"import { render } from '@ember/test-helpers';\n" +
			"import { hbs } from 'ember-cli-htmlbars';\n" +
			`module(${escape(name)}, function(hooks) {\n` +
			'setupRenderingTest(hooks);\n'
		);
	},
	test(testName, assertion) {
		return (
			`test(${escape(testName)}, async function(assert) {\n` +
			'	assert.expect(0);\n' +
			`	${assertion}\n` +
			'});\n'
		);
	},
	suiteFooter() {
		return '});';
	},
};

module.exports = generator;
