# detect SQL injection (detect-sql-injection)

### Database Injection
With a successful database injection, an attacker can execute malicious commands on a database to steal sensitive data, tamper with stored data, execute database administration operations, access contents of files present on the database filesystem, and, in some cases, issue commands to the host operating system.

### SQL Injection Attack Mechanics
Dynamic database queries that include user-supplied inputs are the primary target behind the SQL injection attack.
When malicious data is concatenated to a SQL query, the SQL interpreter fails to distinguish between the intended command and input data, resulting in the execution of the malicious data as SQL commands.

Let's consider a vulnerable SQL query, as shown in the example, that authenticates a user.

```javascript
connection.query(
    'SELSECT * FROM accounts WHERE username = "'
    + req.body.username + '" AND password = "' + passwordHash + '"',
    function(err, rows, fields) {
        console.log("Result = " + JSON.stringify(rows));
    });
```

The above example illustrates code that dynamically constructs a SQL query by appending the user-supplied request parameter username.
To exploit this query, an attacker can enter admin' -- as a username, which ultimately results in executing the SQL query, as shown in the following Example

```javascript
SELECT * FROM accounts WHERE username = 'admin'
```

The malicious user input eliminated the need for an attacker to submit a correct password because the part after -- in a SQL query is interpreted a comment, thus skipping the password comparison.

Another more destructive, variation of SQL injection is possible with databases that support batch execution of multiple statements when those statements are followed by a semicolon.

For example, if an attacker enters the string admin'; DELETE FROM accounts; --as username, the resultant query is equivalent to two statements, as shown in the following example,

Example: Resultant query containing multiple SQL injection
```javascript
SELECT * FROM accounts WHERE username = 'admin';
DELETE FROM accounts;
```

This query results in removing all user accounts from the database.

An attacker can use a wide variety of malicious inputs for concluding injection, such as the following:

* 1' OR '1'='1 or its equivalent URL-encoded text 1%27%200R%20%271%27%20%3D%20%271 to get all records and ignore-the latter part of the WHERE clause

* %in user input to match any substring or _ to match any character

### Preventing SQL Injection
The good news is that SQL injection is easy to prevent by using a few simple measures.

### Use Pramaterized Queries To Bind All User-Supplied Data
A parameterized query is considered a silver bullet for preventing the dreaded SQL injection.
Parameterized queries prevent an attacker from changing the intent of a query, and enable the SQL interpreter to distinguish clearly between code and data.
Hence, as shown in the following example, always bind all user inputs to the query with parameters.

Example:
```javascript
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

//Prepare query parameters
var username = req.body.username;
var passwordHash = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync());

//Make connection to the MySQL database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'db_user',
    password: 'secret',
    database: 'node_app_db'
});
connection.connect();
//Execute prepared statement with parameterized uesr inputs
var query = 'SELECT * FROM accounts WHERE username=? AND password=?';
connection.query(query, [username,passwordHash],
function(err,rows,fields){
    console.log("Results = " JSON.stringify(rows));
});
connection.end();
```

If an attacker enters the username as admin' --, the resultant query from the code in the above example would explicitly look for a username that matches the exact string admin' -- instead of admin, thus foiling the SQL injection attack.

So what you can do?

**You can use prepared Statements: For SQL calls, use prepared statements instead of building dynamic queries using string concatenation**

That's exactly what this rule does! It checks for dynamic queries using string concatenation!


## Further Reading
[link 1](http://nodegoat.herokuapp.com/tutorial/a1)
[link 2](https://www.oreilly.com/library/view/securing-node-applications/9781491982426)
