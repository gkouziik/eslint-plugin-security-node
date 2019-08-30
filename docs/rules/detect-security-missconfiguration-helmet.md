# detect security missconfiguration in express hemlet (detect-security-missconfiguration-helmet)
### What about express helmet?
Helmet helps you secure your Express apps by setting various HTTP headers. It’s not a silver bullet, but it can help!

### How it works?
Helmet is a collection of 13 smaller middleware functions that set HTTP response headers. Running **app.use(helmet())** will not include all of these middleware functions by default.

**Module** | **Included By Default**
---------- | ----------------------
contentSecurityPolicy for setting Content Security Policy | No
dnsPrefetchControl controls browser DNS prefetching | Yes
expectCt for handling Certificate Transparency | No
featurePolicy to limit your site’s features | No
frameguard to prevent clickjacking | Yes
hidePoweredBy to remove the X-Powered-By header | Yes
hsts for HTTP Strict Transport Security	| Yes
ieNoOpen sets X-Download-Options for IE8+ | Yes
noCache to disable client-side caching	| No
noSniff to keep clients from sniffing the MIME type	| Yes
permittedCrossDomainPolicies for handling Adobe products’ crossdomain requests	| No
referrerPolicy to hide the Referer header | No
xssFilter adds some small XSS protections	| Yes

### What's the point of this Rule?
As we saw,helmet is not a silver-bullet,but it ships with some middlewares which will you secure from many kind of attacks! From my expreience many developers will include the default "package" of express helmet by running app.use(helmet()).This will include only the default Modules from the above array.The other modules are not included by default so a developer have to add them manually!

This rule aims to warn developers that use express-helmet,without the extras modules,to include them manually,like the contentSecurityPolicy module of express-helmet!

Let's see an example,why contentSecurityPolicy module is so important!

### contentSecurityPolicy Module
he CSP module sets the Content-Security-Policy header which can help protect against malicious injection of JavaScript, CSS, plugins, and more.

#### The attack
Hackers can do lots of bad things if they can put things onto your webpages.

The nastiest attack is probably cross-site scripting (XSS), which is when a hacker puts malicious JavaScript onto your page. If I can run JavaScript on your page, I can do a lot of bad things, from stealing authentication cookies to logging every user action.

There are other things attackers can do, even if they can’t execute JavaScript. For example, if I could put a tiny, transparent 1x1 image on your site, I could get a pretty good idea of how much traffic your site gets. If I could get a vulnerable browser plugin like Flash to run, I could exploit its flaws and do things you don’t want!

There isn’t one specific attack that the CSP module prevents. The main thing is this: you don’t want anyone putting anything on your webpages that you don’t expect.

#### The Header
One of the tricky things about these injection attacks is that the browser doesn’t know what’s good and what’s bad. How can it tell the difference between a legitimate JavaScript file and a malicious one? In many cases, it can’t…unless you’ve defined a Content Security Policy.

Most modern browsers support a header called Content-Security-Policy, which is effectively a whitelist of things that are allowed to be on your page. You can whitelist JavaScript, CSS, images, plugins, and much more. Things are opt-in, so you’re saying “this stuff is allowed” instead of “this stuff is not allowed”.

Let’s say you’ve got a website that links to no external resources at all—just your stuff. You could set a header that looks like this:

```javascript
Content-Security-Policy: default-src 'self'
```

This effectively tells the browser “only load things that are from my own domain”. If you’re running example.com and a user tries to load https://example.com/my-javascript.js, it’ll work just fine. But if a user tries to load http://evil.com/evil.js, it won’t load at all!

Now, let’s say you want to also allow CSS from Bootstrap’s CDN. You could set a CSP that looks like this:

```javascript
Content-Security-Policy: default-src 'self'; style-src 'self' maxcdn.bootstrapcdn.com
```

Now we’ve whitelisted 'self' and maxcdn.bootstrapcdn.com. The user will be able to load CSS from there, but nothing else. The user won’t even be able to load JavaScript or images from that URL, either—only stylesheets.

There are a lot of nuances to CSP: what you can and can’t whitelist, browser support for various features, and alternate headers. Refer to the stuff below for more information.


## Further Reading
[link 1](https://helmetjs.github.io/docs/)
