/**
 * @fileoverview detect SQL injection
 * @author Gkouziik
 */
'use strict'

var rule = require('../../../lib/rules/detect-sql-injection')
var RuleTester = require('eslint').RuleTester

const ERROR_MSG = 'detect possible SQL injection'
const valid = 'var mysql = require("mysql"); var connection = mysql.createConnection({host: "localhost",user: "db_user",password: "secret",database: "node_app_db"});connection.connect(); connection.query("SELECT * FROM accounts WHERE username=? AND password=?", [username,passwordHash],function(err,rows,fields){});'
const invalid = 'connection.query(foo,function(err, rows, fields) {console.log("Result = " + JSON.stringify(rows));});'
var ruleTester = new RuleTester()
ruleTester.run('detect-sql-injection', rule, {

  valid: [
    {
      code: valid
    }
  ],

  invalid: [
    {
      code: invalid,
      errors: [{
        message: ERROR_MSG
      }]
    }
  ]
})
