'use strict';

const testGenerators = {
	'ember-qunit': require('./ember-qunit-generator'),
	'ember-mocha': require('./ember-mocha-generator')
};

const generators = {};

Object.keys(testGenerators).forEach((name) => {
	const testGenerator = testGenerators[name];

	generators[name] = function(relativePath, asserts) {
		if (!asserts.length) {
			return '';
		}

		return (
			testGenerator.suiteHeader(`Markdown Codefences | ${relativePath}`) +
			asserts.map((assert) => testGenerator.test('fenced code should work', assert)).join('') +
			testGenerator.suiteFooter()
		);
	};
});

module.exports = generators;
