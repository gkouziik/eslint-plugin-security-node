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
