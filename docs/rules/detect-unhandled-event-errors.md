# detect unhandled error events (detect-unhandled-error-events)

When using the EventEmitter, it cannot be denied that errors can occur anywhere in the chain. 

Given this code below:
```javascript
const EventEmitter = require('events')
const myEmitter = new EventEmitter()

myEmitter.emit('error', new Error('whoops!'))
// Throws and crashes Node.js
```
Since there is no error event listener called, the error will be thrown and will be treated as an uncaughtException. Once an error is emitted and unhandled, the Node.js application will crash. 

There should always be listeners for events at the least. This of course does not count out error events.

```javascript
const EventEmitter = require('events')
const myEmitter = new EventEmitter()
// MUST: include error listener
myEmitter.on('error', (err) => {
    console.error('An error occurred')
}) 
myEmitter.emit('error', new Error('whoops!'))
// Prints: An error occurred
```


[link 1](https://nodejs.org/dist/latest-v16.x/docs/api/events.html#error-events)
[link 2](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#listen-to-errors-when-using-eventemitter)