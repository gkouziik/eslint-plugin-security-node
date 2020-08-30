# detect eval with string concatenation (detect-eval-with-expr)
### Is eval() Evil? 
JavaScript is an interpreted language, and like so many of its peers, it includes the powerful eval() function.
eval() takes a string and executes it as if it was regular JavaScript code.
It's incredibly powerful and incredibly easy to abuse in ways that make your code slower and harder to maintain.as a general rule, if you're using eval() there's probably something wrong with your design.

### Common mistakes
Here's the classic misuse of eval().
You have a JavaScript object `foo` and you want to access a property on it-but you don't know the name of the property until runtime.
Here's how **NOT** to do it:

```javascript
var property = 'bar';
var value = eval('foo.' + property);
```
Yes, it will work, but every time that piece of code runs JavaScript will have to kick back into interpreter mode, showing down your app.
It's also dirt ugly.

Here's the right way of doing above:
```javascript
var property = 'bar';
var value = foo[property];
```
In JavaScript, square brackets act as an alternative to lookups using a dot.
The only difference is that square bracket syntax expects a string.

### Security Issues
In any programming language you should be extremely cautious of executing code from untrusting source.
The same is true for JavaScript - you should be extremely cautious of running eval() against any code that might have been tampered with - for example, strings taken from the page query string.
Executing untrusted code can leave you vulnerable to XSS (cross-site-scripting) attacks.

Here's a list of applications in which you must use eval():
* Running code remotely sent from a server
* Evaluating user input code**
* Running dynamically generated code
* Running a script and storing its result

**While applications 1,3 and 4 are generally safe, there re real security concerns to our second application - evaluating user input code!

Using eval() does not automatically open you up to an XSS attack nor does it mean there is some lingering security vulnerability that you’re not aware of.
Just like any tool, you need to know how to wield it correctly, but even if you use it incorrectly, the potential for damage is still fairly low and contained.

### When eval() is unavoidable ?
Let's say you have some raw text, and some of that text is JS, you could use eval() to turn the quoted JavaScript back into JavaScript and execute it.
When that is the task you need to do, eval() is the only thing that will work, but it's very rare that you're needing to execute quoted JavaScript code from another language (and this should be done with caution when you do).

### Conclusion
Eval Should never be used when any of the input is out of control!

## Further Reading
[link 1](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)
[link 2](https://blog.risingstack.com/node-js-security-tips/)
[link 3](https://24ways.org/2005/dont-be-eval)
