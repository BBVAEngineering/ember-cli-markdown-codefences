/* eslint-env node */

'use strict';

function transformHandlebars(content) {
  // eslint-disable-next-line
  return 'await render(hbs`' + content.replace(/`/g, '') + '`);';
}

const codeTransforms = {
  handlebars: transformHandlebars,
};

module.exports = codeTransforms;
