# detect unhandled async errors (detect-unhandled-async-errors)

It is impossible to have no errors in your program, even those of the best programmers have one way or another. There are some ways to handle errors in order to find and fix them. 

### try-catch method
```javascript
async function userProfile() {
  try {
    let user = await getUser();
    let friendsOfUser = await getFriendsOfUser(userId);
    let posts = await getUsersPosts(userId);

    showUserProfilePage(user, friendsOfUser, posts);
  } catch(e) {
    console.log(e);
  }
}
```
Your code won't look too good having multiple request handlers each with a try/catch statement. 

### .catch method
The .catch method can be used if we want to know which error comes from which async request.

```javascript
async function userProfile() {
    let user = await getUser().catch(err => console.error('an error occurred'));
    let friendsOfUser = await getFriendsOfUser(userId).catch(err => console.error('an error occurred'));
    let posts = await getUsersPosts(userId).catch(err => console.error('an error occurred'));

    showUserProfilePage(user, friendsOfUser, posts);
}
```

### using a separate error handling function (Recommended)
With error handler functions. Lessening the need for try-catch blocks and .catch methods.

```javascript
const handle = (promise) => {
    return promise
        .then(data => ([data, undefined]))
        .catch(error => Promise.resolve([undefined, error]));
}

async function userProfile() {
    let [user, userErr] = await handle(getUser());

    if(userErr) throw new Error('Could not fetch user details');

    let [friendsOfUser, friendErr] = await handle(
        getFriendsOfUser(userId)
    );

    if(friendErr) throw new Error('Could not fetch user\'s friends');

    let [posts, postErr] = await handle(getUsersPosts(userId));

    if(postErr) throw new Error('Could not fetch user\'s posts');

    showUserProfilePage(user, friendsOfUser, posts);
}
```

[link 1](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#handle-errors-in-asynchronous-calls)
[link 2](https://dev.to/sobiodarlington/better-error-handling-with-async-await-2e5m)