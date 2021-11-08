# detect improper exception handling (detect-improper-exception-handling)

Node.js has the process global object, which is an EventEmitter object that in this case emits uncaught exceptions and brought up to the main event loop. In the event that an uncaught exception is thrown while your application is executing, it will result to it crashing. Thus, it is essential to make a listener for uncaught exceptions uwing the process object. There is no need for importing the process core module as it is nautomatically injected with Node.js. 

It is worth noting that this way of exception handling is intended as a last resort. Moreover, this type of event signals that the application is in an undefined state, and resuming the application is strongly discouraged and can cause greater issues. 

To not miss any uncaught exception and correctly use it is to do synchronous cleanup of allocated resources such as using handlers, file descriptors, custom loggers and similar before exiting the process with a non-zero exit code. Be aware that in displaying error messages it is recommended to log the necessary details but not as far as leaking detailed information such as stack traces to the user.

### Example
```javascript
process.on("uncaughtException", function(err) {
    // clean up allocated resources
    // log necessary error details to log files
    process.exit(1); // exit the process to avoid unknown state
});
```

[link 1](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#handle-uncaughtexception)
[link 2](https://nodejs.org/dist/latest-v16.x/docs/api/process.html#event-uncaughtexception)
[link 3](https://nodejs.dev/learn/error-handling-in-nodejs#catching-uncaught-exceptions)