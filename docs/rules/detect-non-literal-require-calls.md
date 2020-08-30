# Non literal require calls may cause an attack (detect-non-literal-require-calls)
### require() with only literal arguments!
Avoid requiring/importing another file with a path that was given as a parameter due to the concern that it could have originated from user input.
This rule can be extended for accessing files in general(i.e fs.readFile()) or other sensitive resource access with dynamic variables originating from user input!
Malicious user input could find its way to a parameter that is used to require tampered files, for example, a previously uploaded file on the filesystem, or access already existing system files.


## Rule Details
This rule is looking for require() with non-literal arguments!

Examples of **incorrect** code for this rule:

```js
// insecure, as helperPath variable may have been modified by user input
const uploadHelpers = require(helperPath);
```

Examples of **correct** code for this rule:

```js
// secure
const uploadHelpers = require('./helpers/upload');
```
