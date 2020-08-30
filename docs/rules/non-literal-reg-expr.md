# Non-literal regular expressions may cause possible attack (non-literal-reg-expr)

### How a Regular Expression can bring your Node.js service down
The use of Regular Expressions (RegEx) is quite common among software engineers and DevOps IT roles where they specify a string pattern to match a specific string in a text.

Often, programmers will use RegEx to validate that an input received from a user conforms to an expected condition.
For example:

Testing that a user's provided e-mail address is valid:

```js
var testEmail = /^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/.exec('john@example.com');
```

### What does it have to do with Node.js?
The risk that is inherent with the use of Regular Expressions is the computational resources that require to parse text and match a given pattern.
A flawed Regular Expression pattern can be attacked in a manner where a provided user input for text to match will require an outstanding amount of CPU cycles to process the RegEx execution.
Such an attack will render a Node.js or JavaScript application unresponsive, and thus is referred to as a ReDoS — Regular Expression Denial of Service.


## Rule Details

This rule aims to detect non-literal RegExp that may contains user's input!

Examples of **incorrect** code for this rule:

```js
RegExp('/\w+/' + input);
// OR
RegExp(input);
```

Examples of **correct** code for this rule:

```js
RegExp('/\w+/');
```


## Further Reading
[link 1](https://medium.com/@liran.tal/node-js-pitfalls-how-a-regex-can-bring-your-system-down-cbf1dc6c4e02)