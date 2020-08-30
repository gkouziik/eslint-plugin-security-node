# detect NOsql injection (detect-nosql-injection)
### The $where operator attack
The **$where** operator has a vary dangerous feature: it allows you to pass a string that will be evaluated inside your server.

To reproduce the problem, suppose that you have an online store and want to find out which users have more than X canceled orders.
You could query as the following:
```javascript
var query = {
    $where: "this.canceledOrders > " + req.body.canceled
}
db.collection('users').find(query).each(function(err, doc){
    console.log(doc);
})
```

In this case,mongo-sanitize will not help you if the input string **'0; return true'**.
Your $where clause will be evaluated aas **this.canceledOrders > 0; return true** and all users would be returned.

Or you could receive **'0; while(true){}'** as input and suffer a DoS attack.

It also works for string inputs,like:
```javascript
var query = {
    $where: "this.name === '" + req.body.name + "'"
}
```

The attack could be the string **'\'; return \'\' == \''** and the where clause would be evaluated to **this.name === ''; return '' == ''**,that results in returning all users instead of only those who matches the clause.

The solution here is to never use the $where operator.
Why? I list it here:

* Performance: since you can run arbitrary JavaScript code, the $where operator is not optimized. That means: indexes will be ignored.

* Scope is not accessible: the solution to avoid the code injection would be to add the where clause inside a function, like the following:

```javascript
var query = {
    $where : function() {
        return.this.canceledOrders > threshold
    }
}
```

However, it won't work.
The local variable value is not passed to Mongo and it returns the following error if executed in a shell

```javascript
Error: error: {
    "$err" : "ReferenceError: threshold is not defined\n at _funcs2(_funcs2:1:45) near 's.canceledOrders > threshold }'",
    "code" : 16722
}
```

* There is always a better solution. In this case, you would use te operators **$eq** or **$gt**.


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
