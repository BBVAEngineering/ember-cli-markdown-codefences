'use strict';

const Funnel = require('broccoli-funnel');
const MarkdownCodefences = require('broccoli-markdown-codefences');
const mergeTrees = require('broccoli-merge-trees');
const VersionChecker = require('ember-cli-version-checker');
const codeTransforms = require('./lib/code-transforms');
const testGenerators = require('./lib/test-generators');
const markdownExtensions = require('markdown-extensions');

module.exports = {
	name: 'ember-cli-markdown-codefences',

	init() {
		this._super.init && this._super.init.apply(this, arguments);

		const checker = new VersionChecker(this);

		if (checker.for('ember-qunit', 'npm').exists() || checker.for('ember-cli-qunit', 'npm').exists()) {
			this.testGenerator = 'ember-qunit';
		} else if (checker.for('ember-mocha', 'npm').exists() || checker.for('ember-cli-mocha', 'npm').exists()) {
			this.testGenerator = 'ember-mocha';
		}
	},

	included(app) {
		this._super.included.apply(this, arguments);

		const options = app.options['markdown-codefences'] || {};

		if (options.testGenerator) {
			this.testGenerator = options.testGenerator;
		}

		if (testGenerators[this.testGenerator]) {
			this.testGenerator = testGenerators[this.testGenerator];
		}

		this.codeTransforms = Object.assign({}, codeTransforms, options.codeTransforms);
	},

	lintTree(type) {
		const options = {
			codeTransforms: this.codeTransforms,
			testGenerator: this.testGenerator,
			persist: false
		};
		const files = new Funnel('.', {
			include: markdownExtensions.map((ext) => `${type}/**/*.${ext}`),
			allowEmpty: true
		});
		const markdownTree = new MarkdownCodefences(files, options);

		if (type === 'tests') {
			// Instead of using this tree only to lint tests, use it to lint root dir files
			const rootMarkdowns = new Funnel('.', {
				include: markdownExtensions.map((ext) => `*.${ext}`)
			});

			return mergeTrees([
				new MarkdownCodefences(rootMarkdowns, options),
				markdownTree
			]);
		}

		return markdownTree;
	}
};
