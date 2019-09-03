# Non literal require calls may cause an attack (detect-non-literal-require-calls)
### require() with only literal arguments!
Avoid requireing/importing another file with a path that was given as parameter due to the concern that it could have origanted from user input.This rule can be extended for accessing files in general(i.e fs.readFile()) or other sensitive resource access with dynamic variables originating from user input!
Malicious user input could find its way to a parameter that is used to require tampered files, for example a previously uploaded file on the filesystem,or access already existing system files.


## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

// fill me in

```

Examples of **correct** code for this rule:

```js

// fill me in

```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
