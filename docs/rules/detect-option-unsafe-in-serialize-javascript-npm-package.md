# detect opion:unsafe in serialize method in serialize-javasript npm package (detect-option-unsafe-in-serialize-javascript-npm-package)

Serialize-javascript is a famous npm package that serializes javascript to a superset of JSON that includes regular expressions, dates and functions.

### Automatic Escaping of HTML Characters
A primary feature of this package is to serialize code to a string of literal JavaScript which can be embedded in an HTML document by adding it as the contents of the script element.
In order to make this safe, HTML characters and JavaScript line terminators are escaped automatically.
```javascript
serialize({
    haxorXSS: '</script>'
});
```

The above will produce the following string,HTML-escaped output which is safe to put into an HTML document as it will not cause the inline script element to terminate.
```js
'{"haxorXSS":"\\u003C\\u002Fscript\\u003E"}'
```
You can pass an optional unsafe argument to serialize() for straight serialization.

### Options
The serialize() function accepts an options object as its second argument.
All options are being defaulted to undefined.

### What about options.unsafe?
This option is used to signal serialize() that we want to do a straight conversion, without the XSS protection.
This options needs to be explicitly set to true.
HTML characters and JavaScript line terminators will not be escaped.
You will have to roll your own.

```js
serialize(obj,{unsafe:true});
```

### How does this HTML Injection Attack work in practice?

Let's say we have a node.js web app.
We’re running express.js and using ejs for our templating language.
We’re fetching the name url param and injecting it into the ejs template.

```js
// routes/index.js
router.get('/', function(req,res,next){
    var name = req.query.name;
    // we are passing the 'name' query to the template
    res.render('index', {title: 'Home', name: name});
});
```

```html
//views/index.js template
<body>
<h1><%= title %></h1>
<p>Welcome to <%= title %></p>
<p>Hi my name is <%- name %></p>
</body>
```
### The Attack
So far so good. Nothing fishy going on here. Now let’s try to insert a <script> tag into the url:
```js
localhost:3000/?name=<script>alert('I am the hacker!!!!')</script>
```
This is bad because we are allowing an (untrusted) user to execute any JavaScript they want on our page.

### How can this attack hurt me?
An alert box on a page is pretty harmless.
So how could this hurt somebody?

Here’s how an attacker could use this to get access to your bank account.

* You’d receive an email with instructions to log into your bank

* After login, you’re instructed to click on this link
```js
 https://yourBankWebsite.com/account?id=<script>[maliciousCodeHere]</script>
```
When you log in, your bank’s website server starts a session for you (usually lasting 10–15 minutes, after which you are automatically logged out).
The session information (usually called a token) is stored in a cookie on your computer.
If the hacker can get you to log in, and then click the link he sent you, then maliciousCodeHere will run and could send your session token to the hacker.
This allows him to steal your session.
He could then (in theory) create a cookie on his computer and store your session information in it.
If that session is still active, he can visit your bank's website, and he’ll be logged in as you, and can browse around, look at bank account information, and possibly even initiate a transfer or change your password.
In summary, the hacker sent you a link, which caused you to run JavaScript in your browser, after you logged in, allowing him to steal protected information (in this case, the session token).
This is dangerous because you are running unsafe JS after you’ve been given access to your sensitive info.



## Further Reading
[link 1](https://medium.com/@jamischarles/xss-aka-html-injection-attack-explained-538f46475f6c)
[link 2](https://www.npmjs.com/package/serialize-javascript)
