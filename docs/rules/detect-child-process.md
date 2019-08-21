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
**So where's the problem?** Although the exec method executes OS commands in a nonblocking manner,perfectly aligning with Node's async programming paradigm.its flexibility to pass the command as a string often invites **injection flaws**.This is particularly the case when a **user input** is used to construct the command.
For example,the following example shows using the ``` child_process.exec ``` method to invokethe **gzip** command that appends a user-supplied denamic file path to construct the gzip command.

```javascript
child_process.exec(
    'gzip' + req.body.file_path,
    function (err, data) {
        console.log(data);
    });
```
To exploit the injection vulnerability in the preceding code,an attacker can append **; rm -rf /** ,for instance, to the file_path input.This allows an attacker to break out of the gzip command context and execute malicious command that delets all files on the server.As part of the user input,an attacker also chain multiple commands by using characters such as **;,&,|,||,$(),<,>,and >>**.
The attack manifests because,under the hood,the exec method spawns a new bin/sh process and passes the command argument for execution to this system shell.This is equivalent to opening a Bash interpreter for an attacker to run any commands with the same privileges as the vulnerable application!



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
