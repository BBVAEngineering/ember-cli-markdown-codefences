'use strict';

const path = require('path');
const fs = require('fs-extra');
const exec = require('child_process').exec;
const expect = require('chai').expect;

const FILE = path.join(__dirname, '../tests/dummy/app/some.md');
const TIMEOUT = 60000;

describe('ember-cli-eslint', function () {
  this.timeout(TIMEOUT);

  afterEach(async () => {
    await fs.remove(FILE);
  });

  it('passes if codefences tests does not exists', async () => {
    const result = await emberTest();

    expect(result.error).to.not.exist;
    expect(result.stdout).to.not.match(/^not ok .* - Markdown Codefences/m);
  });

  it('fails if a codefences tests fails', async () => {
    await fs.outputFile(
      FILE,
      ['```javascript', 'foo.bar = "wow";', '```'].join('\n')
    );

    const result = await emberTest();

    expect(result.error).to.exist;
    expect(result.stdout).to.match(
      /^not ok .* - Markdown Codefences \| dummy\/app\/some\.md: fenced code should work/m
    );
  });

  describe('ember-qunit', () => {
    it('fails if a handlebars codefence test fail', async () => {
      await fs.outputFile(
        FILE,
        ['```handlebars', "{{dummy foo=(action 'bar')}}", '```'].join('\n')
      );

      const result = await emberTest();

      expect(result.error).to.exist;
      expect(result.stdout).to.match(
        /^not ok .* - Markdown Codefences \| dummy\/app\/some\.md: fenced code should work/m
      );
    });
  });
});

function emberTest() {
  return new Promise((resolve) => {
    exec(
      'node_modules/.bin/ember test',
      { cwd: path.join(__dirname, '..'), env: process.env },
      (error, stdout, stderr) => {
        resolve({
          error,
          stdout,
          stderr,
        });
      }
    );
  });
}
