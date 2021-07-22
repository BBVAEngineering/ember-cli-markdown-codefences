'use strict';

const Funnel = require('broccoli-funnel');
const MarkdownCodefences = require('broccoli-markdown-codefences');
const VersionChecker = require('ember-cli-version-checker');
const codeTransforms = require('./lib/code-transforms');
const testGenerators = require('./lib/test-generators');
const markdownExtensions = require('markdown-extensions');

module.exports = {
  name: require('./package').name,

  init() {
    this._super.init && this._super.init.apply(this, arguments);

    const checker = new VersionChecker(this);

    if (
      checker.for('ember-qunit', 'npm').exists() ||
      checker.for('ember-cli-qunit', 'npm').exists()
    ) {
      this.testGenerator = 'ember-qunit';
    } else if (
      checker.for('ember-mocha', 'npm').exists() ||
      checker.for('ember-cli-mocha', 'npm').exists()
    ) {
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

    this.codeTransforms = Object.assign(
      {},
      codeTransforms,
      options.codeTransforms
    );
  },

  lintTree(type) {
    if (type === 'templates') {
      return null;
    }

    const files = new Funnel(type, {
      include: [`**/*.{${markdownExtensions.join(',')}}`],
      allowEmpty: true,
    });

    return new MarkdownCodefences(files, {
      codeTransforms: this.codeTransforms,
      testGenerator: this.testGenerator,
    });
  },
};
