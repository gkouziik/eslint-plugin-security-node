# Detect the absence of name option in express session (detect-absence-of-name-option-in-exrpress-session)

### Anonymize the sessionID Used
The first step for an attacker targeting a system is reconnaissance. 
The attacker researches the environment and narrows possible attack vectors to optimize the attack. 
As the defender, we want them to waste as much time as possible, so keeping the intruder guessing is a good move.
The default implementation of session in express and connect uses connect.sid as the sessionID token in the cookie. 
It’s not hard to understand what technologies are in use based on that. 
To make it harder for possible attackers to gain information about the application’s underlying systems, we need to use a more generic name for the session ID:

```js
app.use(express.session({
name: 'id', // <-- a generic name for the session id
secret: 'this is a nice secret',
resave: false,
saveUninitialized: true
}));
```
With this configuration option, we can stop declaring to the world our session-handling mechanism and force the attacker to spend more time using different attacks that don’t impact our setup.

