# detect insecure randomness via Math.random() (detect-insecure-randomness)
### Insecure Randomness
The **Math.random()** function returns a floating-point, pseudo-random number in the range 0–1 (inclusive of 0, but not 1) with approximately uniform distribution over that range — which you can then scale to your desired range.
The implementation selects the initial seed to the random number generation algorithm; it cannot be chosen or reset by the user.

The **Math.random()** is often used to generate nonpredictable values such as random tokens, resource IDs, or UUIDs.
However, Math.random() is cryptographically insecure.
It can produce predictable values and is therefore not safe to use in a security-sensitive context.

### How To Prevent It?
Math.random() does not provide cryptographically secure random numbers.
Do not use them for anything related to security. Use the Web Crypto API instead, and more precisely the window.crypto.getRandomValues() method.

### Crypto.getRandomValues()
The Crypto.getRandomValues() method lets you get cryptographically strong random values.
The array given as the parameter is filled with random numbers (random in its cryptographic meaning).

To guarantee enough performance, implementations are not using a truly random number generator, but they are using a pseudo-random number generator seeded with a value with enough entropy.
The PRNG used differs from one implementation to the other but is suitable for cryptographic usages.
Implementations are also required to use a seed with enough entropy, like a system-level entropy source.

### Syntax
```javascript
cryptoObj.getRandomValues(typedArray);
```
### Examples
```javascript
/* Assuming that window.crypto.getRandomValues is available */

var array = new Uint32Array(10);
window.crypto.getRandomValues(array);

console.log("Your lucky numbers:");
for (var i = 0; i < array.length; i++) {
  console.log(array[i]);
}
```
For a more secure implementation of **Math.random()**, you could try this:

```javascript
function secureMathRandom() {
  // Divide a random UInt32 by the maximum value (2^32 -1) to get a result between 0 and 1
  return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
}
```


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


## Further Reading
[link 1](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues)
[link 2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)