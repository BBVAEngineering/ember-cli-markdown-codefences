/* eslint-env node */

'use strict';

const escape = require('broccoli-markdown-codefences/lib/escape');

const generator = {
  suiteHeader(name) {
    return (
      "import { render } from '@ember/test-helpers';\n" +
      "import { hbs } from 'ember-cli-htmlbars';\n" +
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
      `	it(${escape(testName)}, async function() {\n` +
      `		${assertion}\n` +
      '	});\n'
    );
  },
};

module.exports = generator;
