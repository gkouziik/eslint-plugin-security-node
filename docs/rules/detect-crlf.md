# detect log forging attack  (detect-crlf)
So what about **CRLF** (Carriage Return Line Feed) aka log injection?
Applications typically use log files to store a history of events or transactions for later review, statistics gathering or debugging.
Depending on the nature of the application, the task of reviewing log files may be performed manually on an as-needed basis or automated with a tool that automatically culls logs for important events or trending information.

Writing unvalidated user input to log files can allow an attacker to forge log entries or inject malicious content into the logs. This is called log injection.

Log injection vulnerabilities occur when:

* Data enters an application from an untrusted source.

* The data is written to an application or system log file.

Successful log injection attacks can cause:

* Injection of new/bogus log events (log forging via log injection)

* Injection of XSS attacks, hoping that the malicious log event is viewed in a vulnerable web application

But le's see some action!

### Attack Mechanics
An attacker may craft a malicious request that may deliberately fail, which the application will log, and when the attacker's user input is unsanitized, the payload is sent as-is to the logging facility.
Vulnerabilities may vary depending on the logging facility:

* Log Forging (CRLF)
Let's consider an example where an application logs a failed attempt to login to the system.
A vary common example for this is as follows:

```javascript
var userName = ewq.body.userName;
console.log('Error: attempt to login with invalid user:', userName);
```
When user input is sanitized and the output mechanism is an ordinary terminal sdtout facility then the application will be vulnerable to CRLF injection, where an attacker can create a malicious payload as follows:

```javascript
curl http://localhost:4000/login -X POST --data 'userName=vyva%0aError: alex moldovan failed $1,000,000 transaction&password=Admin_123&_csrf='
```
Where the **userName** parameter is encoding in the request the LF symbol which will result in a new line to begin.
Resulting log output will look as follows:
```javascript
Error:attempt to login with invalid user: vyva
Error:alex moldovan failed $1,000,000 transaction
```

### Log injection Escalation
An attacker may craft malicious input in hope of an escalated attack where the target isn't the logs themselves, but rather the actual logging system.
For example, if an application has a back-office web app that manages viewing and tracking the logs, then an attacker may send an XSS payload into the log, which may not result in log forging on the log itself, but when viewed by a system administrator on the log viewing web app then it may compromise it and result in XSS injection that if the logs app is vulnerable!

### How DO I Prevent it?
As always when dealing with user input:
* Do not allow user input into logs
* Encode to proper context,or sanitize user input


## Further Reading

[link 1](http://nodegoat.herokuapp.com/tutorial/a1)
[link 2](https://www.owasp.org/index.php/Log_Injection)
