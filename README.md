# eslint-plugin-security-plugin

ESLint plugin for security
ESLint rules for Node Security
This plugin will help to identify potential threads,and prevent attacks


## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-security-plugin`:

```
$ npm install eslint-plugin-security-plugin --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-security-plugin` globally.

## Usage

Add `security-plugin` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "security-plugin"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "security-plugin/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





