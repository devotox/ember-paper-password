[![Ember Observer Score](http://emberobserver.com/badges/ember-paper-password.svg)](http://emberobserver.com/addons/ember-paper-password)
[![Build Status](https://travis-ci.org/devotox/ember-paper-password.svg)](http://travis-ci.org/devotox/ember-paper-password)
[![Coverage Status](https://codecov.io/gh/devotox/ember-paper-password/branch/master/graph/badge.svg)](https://codecov.io/gh/devotox/ember-paper-password)
[![NPM Version](https://badge.fury.io/js/ember-paper-password.svg)](http://badge.fury.io/js/ember-paper-password)
[![NPM Downloads](https://img.shields.io/npm/dm/ember-paper-password.svg)](https://www.npmjs.org/package/ember-paper-password)
[![Dependency Status](https://david-dm.org/poetic/ember-paper-password.svg)](https://david-dm.org/poetic/ember-paper-password)
[![DevDependency Status](https://david-dm.org/poetic/ember-paper-password/dev-status.svg)](https://david-dm.org/poetic/ember-paper-password#info=devDependencies)
[![Greenkeeper](https://badges.greenkeeper.io/devotox/ember-paper-password.svg)](https://greenkeeper.io/)

ember-paper-password
==============================================================================

Input Password addon for [Ember Paper](https://github.com/miguelcobain/ember-paper)

[DEMO](http://devotox.github.io/ember-paper-password)

Installation
------------------------------------------------------------------------------

```
ember install ember-paper-password2
```


Usage
------------------------------------------------------------------------------

```handlebars
{{paper-password reveal=true value=value onChange=(action (mut value))}}
```

Paper Input Options: [Ember Paper](https://github.com/miguelcobain/ember-paper)


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-paper-password`
* `yarn install`

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
