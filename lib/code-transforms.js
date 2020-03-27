/* eslint-env node */

'use strict';

const HTMLBarsCompiler = require('ember-source/dist/ember-template-compiler');

function transformHandlebars(content) {
	content = HTMLBarsCompiler.precompile(content);

	return `this.render(Ember.HTMLBars.template(${content}));`;
}

const codeTransforms = {
	handlebars: transformHandlebars
};

module.exports = codeTransforms;
