# eslint-plugin-security-node

ESLint plugin containing Node.js security rules

This plugin will help to identify potential threats and prevent attacks.


## Installation

```sh
npm install --save-dev eslint-plugin-security-node
```

## Usage

Add the following configuration to your ```.eslintrc``` file:

```
"plugins": [
    "security-node"
],
"extends": [
    "plugin:security-node/recommended"
]
```


## Developer guide

* Use [GitHub pull requests](https://help.github.com/en/articles/about-pull-requests)
* Check the .eslintrc file to see the ESLint setup

## Tests

Type the following to test all the rules:
```sh
$ npm test
```

Type the following to test a particular rule:
```sh
$ ./node_modules/.bin/mocha tests/lib/rules/rule_name
```

## Rules


### `detect non literal regular expr`

For details check the documentation file [non-literal-reg-expr](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/non-literal-reg-expr.md)

### `detect absence of property:name in express-session`

For details check the documentation file [detect-absence-of-name-option-in-exrpress-session](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-absence-of-name-option-in-exrpress-session.md)

### `detect Buffer unsafe allocation`

For details check the documentation file [detect-buffer-unsafe-allocation](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-buffer-unsafe-allocation.md)

### `detect exec of child_process with non-Literal argument`

For details check the documentation file [detect-child-process](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-child-process.md)

### `detect crlf attack`

For details check the documentation file [detect-crlf](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-crlf.md)

### `detect dangerous redirects`

For more information check the documentation file [detect-dangerous-redirects](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-dangerous-redirects.md)

### `detect-eval-with-expr`

For more information check the documentation file [detect-eval-with-expr](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-eval-with-expr.md)

### `detect-html-injection`

For more information check the documentation file [detect-html-injection](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-html-injection.md)

### `detect-insecure-randomness`

For more information check the documentation file [detect-insecure-randomness](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-insecure-randomness.md)

### `detect-non-literal-require-calls`

For more information check the documentation file [detect-non-literal-require-calls](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-non-literal-require-calls.md)

### `detect-nosql-injection`

For more information check the documentation file [detect-nosql-injection](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-nosql-injection.md)

### `detect-option-multiplestatements-in-mysql`

For more information check the documentation file [detect-option-multiplestatements-in-mysql](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-option-multiplestatements-in-mysql.md)

### `detect-option-rejectunauthorized-in-nodejs-httpsrequest`

For more information check the documentation file [detect-option-rejectunauthorized-in-nodejs-httpsrequest](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-option-rejectunauthorized-in-nodejs-httpsrequest.md)

### `detect-option-unsafe-in-serialize-javascript-npm-package`

For more information check the documentation file [detect-option-unsafe-in-serialize-javascript-npm-package](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-option-unsafe-in-serialize-javascript-npm-package.md)

### `detect-possible-timing-attacks`

For more information check the documentation file [detect-possible-timing-attacks](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-possible-timing-attacks.md)

### `detect-runinthiscontext-method-in-nodes-vm`

For more information check the documentation file [detect-runinthiscontext-method-in-nodes-vm.](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-runinthiscontext-method-in-nodes-vm.md)

### `detect-security-missconfiguration-cookie`

For more information check the documentation file [detect-security-missconfiguration-cookie](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-security-missconfiguration-cookie.md)

### `detect-sql-injection`

For more information check the documentation file [detect-sql-injection](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-sql-injection.md)

### `disable-ssl-across-node-server`

For more information check the documentation file [disable-ssl-across-node-server](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/disable-ssl-across-node-server.md)

### `detect-improper-exception-handling`

For more information check the documentation file [detect-improper-exception-handling](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-improper-exception-handling.md)

### `detect-unhandled-async-errors`

For more information check the documentation file [detect-unhandled-async-errors](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-unhandled-async-errors.md)

### `detect-unhandled-event-errors`

For more information check the documentation file [detect-unhandled-event-errors](https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-unhandled-event-errors.md)

### Changelog

All notable changes to this project will be documented in this file. Dates are displayed in UTC.

Generated by [`auto-changelog`](https://github.com/CookPete/auto-changelog).

#### [1.1.3](https://github.com/gkouziik/eslint-plugin-security-node/compare/1.1.2...1.1.3)

- fix: potential error in isTryCatchStatement [`#63`](https://github.com/gkouziik/eslint-plugin-security-node/pull/63)
- updated Readme with changelog [`0520676`](https://github.com/gkouziik/eslint-plugin-security-node/commit/05206765562175acaacd03adcd4431d36f750947)
- test: update test [`922ded3`](https://github.com/gkouziik/eslint-plugin-security-node/commit/922ded32e2bc2ddd0d193079eb0d56b376496c4f)

#### 1.1.2

- Bump diff and mocha [`#74`](https://github.com/gkouziik/eslint-plugin-security-node/pull/74)
- Bump debug and mocha [`#73`](https://github.com/gkouziik/eslint-plugin-security-node/pull/73)
- Bump growl and mocha [`#72`](https://github.com/gkouziik/eslint-plugin-security-node/pull/72)
- Bump minimatch from 3.0.4 to 3.1.2 [`#71`](https://github.com/gkouziik/eslint-plugin-security-node/pull/71)
- Bump ansi-regex from 3.0.0 to 3.0.1 [`#70`](https://github.com/gkouziik/eslint-plugin-security-node/pull/70)
- Bump minimist, mkdirp and mocha [`#69`](https://github.com/gkouziik/eslint-plugin-security-node/pull/69)
- Bump ajv from 6.10.0 to 6.12.6 [`#62`](https://github.com/gkouziik/eslint-plugin-security-node/pull/62)
- Added release-it script [`#78`](https://github.com/gkouziik/eslint-plugin-security-node/pull/78)
- Request to add new rules [`#60`](https://github.com/gkouziik/eslint-plugin-security-node/pull/60)
- Fix headings [`#61`](https://github.com/gkouziik/eslint-plugin-security-node/pull/61)
- Revisions for new rules [`#2`](https://github.com/gkouziik/eslint-plugin-security-node/pull/2)
- chore: remove node_modules [`#59`](https://github.com/gkouziik/eslint-plugin-security-node/pull/59)
- add new rules [`#1`](https://github.com/gkouziik/eslint-plugin-security-node/pull/1)
- Bump lodash from 4.17.19 to 4.17.21 [`#58`](https://github.com/gkouziik/eslint-plugin-security-node/pull/58)
- Add docs urls to rules [`#57`](https://github.com/gkouziik/eslint-plugin-security-node/pull/57)
- remove remaining references to helmet without nocache [`#54`](https://github.com/gkouziik/eslint-plugin-security-node/pull/54)
- Remove noCache since it has been depricated [`#53`](https://github.com/gkouziik/eslint-plugin-security-node/pull/53)
- Fixed typos and improved grammar [`#50`](https://github.com/gkouziik/eslint-plugin-security-node/pull/50)
- Bump lodash from 4.17.15 to 4.17.19 [`#49`](https://github.com/gkouziik/eslint-plugin-security-node/pull/49)
- Bump acorn from 6.1.1 to 6.4.1 [`#48`](https://github.com/gkouziik/eslint-plugin-security-node/pull/48)
- fix: remove console logs in create functions [`#46`](https://github.com/gkouziik/eslint-plugin-security-node/pull/46)
- Bump lodash from 4.17.11 to 4.17.15 [`#44`](https://github.com/gkouziik/eslint-plugin-security-node/pull/44)
- Bump eslint-utils from 1.3.1 to 1.4.3 [`#43`](https://github.com/gkouziik/eslint-plugin-security-node/pull/43)
- Update Readme.md file [`#1`](https://github.com/gkouziik/eslint-plugin-security-node/pull/1)
- Changed package lock [`b0f2d6a`](https://github.com/gkouziik/eslint-plugin-security-node/commit/b0f2d6a57d5389af04ee2671ce03436b8d5e86d5)
- #21 Rule Ready tested [`0ca48df`](https://github.com/gkouziik/eslint-plugin-security-node/commit/0ca48df2e86e2503e735998bf536e2dfd16f6f7a)
- Deleted some files [`ce7d04d`](https://github.com/gkouziik/eslint-plugin-security-node/commit/ce7d04debe8a3d0308e617f73c57cc18b43ca09e)
