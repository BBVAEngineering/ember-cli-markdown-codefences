# ember-cli-markdown-codefences

[![Build Status](https://travis-ci.org/BBVAEngineering/ember-cli-markdown-codefences.svg?branch=master)](https://travis-ci.org/BBVAEngineering/ember-cli-markdown-codefences)
[![GitHub version](https://badge.fury.io/gh/BBVAEngineering%2Fember-cli-markdown-codefences.svg)](https://badge.fury.io/gh/BBVAEngineering%2Fember-cli-markdown-codefences)
[![npm version](https://badge.fury.io/js/ember-cli-markdown-codefences.svg)](https://badge.fury.io/js/ember-cli-markdown-codefences)
[![Dependency Status](https://david-dm.org/BBVAEngineering/ember-cli-markdown-codefences.svg)](https://david-dm.org/BBVAEngineering/ember-cli-markdown-codefences)

> Generate tests for markdown codefences.

## Information

[![NPM](https://nodei.co/npm/ember-cli-markdown-codefences.png?downloads=true&downloadRank=true)](https://nodei.co/npm/ember-cli-markdown-codefences/)

## Installation

```
ember install ember-cli-markdown-codefences
```

## Usage

Markdown codefences will be tested by `ember-cli-qunit` or `ember-cli-mocha` automatically when you run ember test.

### Configuration

`ember-cli-markdown-codefences` can be configured through the `markdown-codefences` key in your `ember-cli-build.js` file:

```js
const app = new EmberApp(defaults, {
  'markdown-codefences': {
    testGenerator: 'ember-qunit'
  }
});
```

- `testGenerator` is automatically detected if `ember-qunit`/`ember-cli-qunit`
  or `ember-mocha`/`ember-cli-mocha` are used, but can also be set to `ember-qunit`
  and `ember-mocha` manually.

- `codeTransforms` is automatically filled with `javascript`, `html`, `json` and `handlebars`.

## Contribute

If you want to contribute to this addon, please read the [CONTRIBUTING.md](CONTRIBUTING.md).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/BBVAEngineering/ember-cli-markdown-codefences/tags).

## Authors

See the list of [contributors](https://github.com/BBVAEngineering/ember-cli-markdown-codefences/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
