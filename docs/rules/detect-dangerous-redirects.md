# detect dangerous redirects

### What are Unsafe Redirects?
Unsafe or unvalidated redirects are important security considerations for any web developer!
Express provides native support for redirects, making them easy to implement and use.
However, Express leaves the task of performing input validation to the developer.

Here's the definition according to OWASP.org's "Unvalidated Redirects and Forwards" cheat sheet:

* Unvalidated redirects and forwards are possible when a web application accepts untrusted input that could cause the web application to redirect the request to a URL contained within untrusted input.

Redirects are commonly used in login and authentication processes, so users can be redirected back to the page they were on before logging in.
Other scenarios exist but vary based on business need or application type.

### Why are they bad?
Redirects that do not validate user input can enable attackers to launch phishing scams, steal user credentials, and perform other malicious actions.

If an attacker discovers that you are not validating external, user-supplied input, they may exploit this vulnerability by posting specially-crafted links on forums, social media, and other public places to get users to click it.

At face value, these URLs may look legitimate to the user - since all of them will contain your organization's hostname

* https://example.com/login?url=http://examp1e.com/bad/things

However, if the server-side redirect logic does not validate data entering the url parameter, your users may end up on a site that looks exactly like yours (examp1e.com), but ultimately serves the needs of criminal hackers!

This is just one example of how attackers can take advantage of unsafe redirect logic.

### An Example of an Unsafe Redirect
In the following code, you'll see that /login accepts unvalidated data from the url parameter and passes it directly into the Express res.redirect() method.
As a result, Express will redirect the user to whatever URL is entered or supplied so long as the user is authenticated.

```javascript
var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.get('/login', function (req, res, next) {

	if(req.session.isAuthenticated()) {

		res.redirect(req.query.url);
	}
}); 

app.get('/account', function (req, res, next) {
    res.send('Account page');
});

app.get('/profile', function (req, res, next) {
    res.send('Profile page');
});

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});
```

### How to prevent it?

* Simply avoid using redirects and forwards.

* If used, don’t involve user parameters in calculating the destination. This can usually be done.

* If destination parameters can’t be avoided, ensure that the supplied value is valid, and authorized for the user. 
It is recommended that any such destination parameters be a mapping value, rather than the actual URL or portion of the URL and that server-side code translates this mapping to the target URL.


## Further Reading
[link 1](http://nodegoat.herokuapp.com/tutorial/a10)
[link 2](https://blog.hailstone.io/how-to-prevent-unsafe-redirects-in-node-js/)
