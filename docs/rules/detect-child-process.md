# Command Injection in Node.js

Before we dive into the rule details, we have to clarify **command Injection**

An injection vulnerability manifests when application code sends untrusted user input to an interpreter as part of a command or query!
### What an attacker can do
Using command injection, an attacker can execute arbitary commands on the host operating system of a vulnerable application.This flaw gives enormous opportunities to an attacker,ranging from reading restricted file contents to installing malware with which the attacker can take full control of the server and hot network!

### Demonstration of an attack
Before we demonstrate how an attacker can cause serious damage to our application lets see how **child_process** works!
The child_process core module enables Node developers to invoke underlying OS commands from the applicaton code.Due to its name and simplicity of use,the child_process.exec method is commonly used for making system calls.
The exec method takes three arguments: a command in string format,an optional options object, and a callback function,as demonstrated below
```javascript
child_process.exec(command[,options][, callback])
```
**So where's the problem?** Although the exec method executes OS commands in a nonblocking manner,perfectly aligning with Node's async programming paradigm.its flexibility to pass the command as a string often invites **injection flaws**.This is particularly the case when a **user input** is used to construct the command



(detect instances of child_process.exec with or without string concatenation and shell:true option in chil_process functions (detect-child-process))

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
