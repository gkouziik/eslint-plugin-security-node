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




