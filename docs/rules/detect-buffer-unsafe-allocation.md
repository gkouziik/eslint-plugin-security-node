# Detect buffer unsafe allocation
We all know Nodejs Buffer. Now there's a method in buffer's Class, the **allocUnsafe**.
Before we dive into allocUnsafe 's evil "face" we need to clarify this method. 
```javascript
Buffer.allocUnsafe(size);
```
**size** (integer) -> The desired length of the new Buffer.

Allocates a new Buffer of size bytes.A zero-length Buffer is created if size is 0.
(tip: pay attention to the lines below and the example)

The underlying memory for Buffer instances created in this way is not initialized.The contents of the newly created Buffer are unknown and may contain sensitive data.
example,

```javascript
const buf = Buffer.allocUnsafe(10);

console.log(buf);
// Prints (contents may vary) CHECK WHAT BUFFER CONTAINTS ->
// <Buffer a0 8b 28 3f 01 00 00 00 50 32>


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
