# Command Injection in Node.js

Before we dive into the rule details, we have to clarify **command Injection**

An injection vulnerability manifests when application code sends untrusted user input to an interpreter as part of a command or query!
### What an attacker can do
Using command injection, an attacker can execute arbitrary commands on the host operating system of a vulnerable application.
This flaw gives enormous opportunities to an attacker, ranging from reading restricted file contents to installing malware with which the attacker can take full control of the server and hot network!

### Demonstration of an attack
Before we demonstrate how an attacker can cause serious damage to our application, let's see how **child_process** works!
The child_process core module enables Node developers to invoke underlying OS commands from the application code.
Due to its name and simplicity of use,the child_process.exec method is commonly used for making system calls.
The exec method takes three arguments: a command in string format,an optional options object, and a callback function,as demonstrated below
```javascript
child_process.exec(command[,options][, callback])
```
**So where's the problem?** Although the exec method executes OS commands in a nonblocking manner, perfectly aligning with Node's async programming paradigm, its flexibility to pass the command as a string often invites **injection flaws**.
This is particularly the case when a **user input** is used to construct the command.
For example, the following example shows using the ``` child_process.exec ``` method to invoke the **gzip** command that appends a user-supplied dynamic file path to construct the gzip command.

```javascript
child_process.exec(
    'gzip' + req.body.file_path,
    function (err, data) {
        console.log(data);
    });
```
To exploit the injection vulnerability in the preceding code, an attacker can append **; rm -rf /**, for instance, to the file_path input.
This allows an attacker to break out of the gzip command context and execute malicious commands that delete all files on the server.
As part of the user input, an attacker also chain multiple commands by using characters such as **;,&,|,||,$(),<,>, and >>**.
The attack manifests because, under the hood, the exec method spawns a new bin/sh process and passes the command argument for execution to this system shell.
This is equivalent to opening a Bash interpreter for an attacker to run any commands with the same privileges as the vulnerable application!

### Preventing Command Injection
Now that you know the potential of an injection attack to cause severe damage, let's go over methods to prevent it.

### Do not use exec with  String concatenation
As you saw in the example above, exec spawns a new shell, so if the **command** argument is a user input (string concatenation may denote user input), that may cause serious damage.

### Use execFile OR spawn instead of exec
When possible, use the child_process module's **execFile** or **spawn** methods instead of exec.
Unlike exec, the spawn and execFile method signatures force developers to separate the command and its arguments.
Check the example below,

```javascript
var file_path = req.body.file_path;

//Execute gzip command
child_process.execFile(
    'gzip',
    [file_path],
    function (err,data) {
        console.log(data);
    });
```
Any malicious commands chained to file_path user input end up in execFile method's second argument of type array.
Any malicious commands in user input are simply ignored or cause a syntax error if they are not relevant to the target command, thus failing the command injection attempts!

### Do not use execFile or spawn with option:true
let's dive into **spawn and execFile** methods! 
```javscript
child_process.spawn(command[,args][,options])
child_process.execFile(file[,args][,options][,callback])
```

They both have several options that a user can manipulate.
One of them is the option **shell:true**.
If the shell option is true, then the command runs into a new shell and becomes as dangerous as exec method can be.

### Input Validation
Although execFile or spawn are safer alternatives to exec, these methods cannot completely prevent command injection.
The related scenarios include developers using these methods to invoke a custom script that processes user input or to execute OS commands (such as find, awk, or sed) that allow passing options to enable file read/write.
Just like other injection attacks, command injection is primarily possible due to insufficient input validation.
To protect against it, verify that user-controlled command arguments and command options are valid.

### Using a Whitelist approach for input Validation
When writing the validation logic, use a whitelist approach; that is, define what is permitted and reject any input that doesn't fit this definition.
Avoid writing this logic in an opposite manner(blacklist approach), or, in other words, by comparing input against a set of known unsafe characters.
Attackers can often find a way to circumvent such filters by being creative with input construction!

## Rule Details

Examples of **incorrect** code for this rule:

```javascript
//exec invalid
var path = "user input"; 
child_process.exec("ls -l" + path, function (err, data) {});

//execFile invalid
child_process.execFile("node",["--version"],{shell:true},function(error,stdout,stderr){if(error){throw error}});

//invalid spawn
child_process.spawn("ls-la",["--version"],{shell:true});

```

Examples of **correct** code for this rule:

```javascript
//exec valid
child_process.exec("ls", function (err, data) {});

//execFile valid
child_process.execFile("node",["--version"],{cwd:"..."},function(error,stdout,stderr){if(error){throw error}});

//spawn valid
child_process.spawn("ls-la",["--version"],{cwd:"..."})
```

### Further Reading
[link 1](https://www.oreilly.com/library/view/securing-node-applications/9781491982426)
[link 2](https://hackernoon.com/nodejs-security-issue-javascript-node-example-tutorial-vulnerabilities-hack-line-url-command-injection-412011924d1b)

