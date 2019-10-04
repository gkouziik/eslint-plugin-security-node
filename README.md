# eslint-plugin-security-plugin

ESLint plugin for security <br/>
ESLint rules for Node Security <br/>
This plugin will help to identify potential threads,and prevent attacks


## Installation

npm install --save-dev eslint-plugin-security-node

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


## Tests

```sh
$ npm test
```

## Rules

#### `detect non literal regular expr`





