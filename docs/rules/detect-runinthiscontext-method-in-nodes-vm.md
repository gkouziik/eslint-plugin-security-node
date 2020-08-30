# detect vm.runInThisContext() method in nodes vm (detect-runinthiscontext-method-in-nodes-vm)

### Dive into VM's world
With node.js VM you can run JS code in a new "node process" that has no access to the standard node library - no **process**, no **console**, just basic plain JS: that's what the vm module lets you do.

Let's take a look at the following example:

```js
const vm = require('vm');
let result = vm.runInNewContext('a + 1', {a: 2});
console.log(result); // 3
```

Here we are asking Node to create a new V8 context and run a bunch of code (a + 1) there for us, passing an object that constitutes the global environment of that new context ({a: 2}).

Note that the current execution context is not affected by what happens in that new context:

```js
let a = 0;
let result = vm.runInNewContext('a += 1', {a});
console.log(a) // a
```

unless you specifically tell the VM that you want to re-use an existing context or to use the current context with **vm.runInThisContext()**:

```js
a = 0;
vm.runInThisContext('a += 1');
console.log(a) // 1
```
When you use the current execution context (runInThisContext) the executed code is going to have access to globally-defined variables of the current context which, of course, exposes us to the same kind of problems we’d have with eval.




Examples of **incorrect** code for this rule:

```js

// fill me in

```

Examples of **correct** code for this rule:

```js

// fill me in

```


## Further Reading
[link 1](https://odino.org/eval-no-more-understanding-vm-vm2-nodejs/)
