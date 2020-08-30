# detect security missconfiguration in express cookie (detect-security-missconfiguration-cookie)
This vulnerability allows an attacker to access default accounts, unused pages, unpatched flaws, unprotected files, and directories, etc. to gain unauthorized access to or knowledge of the system.

Security misconfiguration can happen at any level of an application stack, including the platform, web server, application server, database, framework, and custom code.

Developers and system administrators need to work together to ensure that the entire stack is configured properly.

### Attack Mechanics
If the server is misconfigured to leak internal implementation details via cookie names or HTTP response headers, then an attacker can use this information towards building site's risk profile and finding vulnerabilities

### What about express-session?

#### What is Express session used for?
You can **use sessions** to communicate data to middleware that's executed later or retrieve it later on, on subsequent requests.
Where is the session data stored? It depends on how you set up the express-session module.
All solutions store the session id in a cookie and keep the data server-side.

#### How does express session work?
Until the cookie expires, every time you make a request, your browser will send the cookies back to the server.
A module like express-session will provide you with a nice API to work with sessions (letting you get & set data to the session), but under the hood, it will save and retrieve this data using a cookie.

#### "Security" options of express-session
* **cookie.httpOnly**: Specifies the **boolean** value for the **HttpOnly Set-Cookie** attribute.
When truthy, the HttpOnly attribute is set, otherwise, it is not.
**By default**, the HttpOnly attribute **is set**.

**Note**: Be careful when setting it to true, as compliant clients will not allow client-side JavaScript to see the cookie in document.cookie!

So if this attribute is set, it prevents cookies from being accessed by browser JS scripts.

* **cookie.secure**: Specifies the **boolean** value for the **Secure Set-Cookie** attribute.
When truthy, the Secure attribute is set, otherwise it is not.**By default**, the Secure attribute is **not** set.

**Note**: Be careful when setting this to true, as compliant clients will not send the cookie back to the server in the future if the browser does not have an **HTTPS** connection.

So if this attribute is set, cookies can only be configured over secure HTTPS connections.


## Further Reading
[link 1](https://www.npmjs.com/package/express-session)
[link 2](http://nodegoat.herokuapp.com/tutorial/a5)
