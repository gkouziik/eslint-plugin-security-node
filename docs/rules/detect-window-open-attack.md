# Detects window.open() attack (detect-window-open-attack)
People using 
```javascript 
target ='_blank' 
``` 
links usually have no idea about this curious fact:

**The page we're linking to gains partial access to the linking page via the window.opener object.**

The newly opened tab can the change the window.opener.location to some phising page.Users trust the page that is already opened,they won't get suspicious.

**Example attack scenario**
* Create a fake "viral" page with cute cat pictures,jokes or whatever,get it shared on Facebook(which is known for opening links via _blank).
* Create a "phising" website at 'https://fakewebsite/facebook.com/page.html';
which redirects the Facebook tab to your phising page,asking the user to re-enter his Facebook password.

### How to Fix
Add this to your outgoing links.
```javascript
rel="opener"
```
Update:FF doesn not suport "noopener" so add this.
```javascript
rel="noopener noreferer"
```

Remeber,that every time you open a new window via window.open(); you're also vulnerable to this,so always reset the "opener" property
```javascript
var newWnd = window.open();
newWnd.opener = null;
```
## Rule Details


Examples of **incorrect** code for this rule:

```js
var newWnd = window.open();
// ......
```

Examples of **correct** code for this rule:

```js
var newWnd = window.open();
newWnd.opener = null;
```
