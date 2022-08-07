/**
 * @fileoverview detect SQL injection
 * @author Gkouziik
 */
'use strict'

var rule = require('../../../lib/rules/detect-sql-injection')
var RuleTester = require('eslint').RuleTester

const ERROR_MSG = 'detect possible SQL injection'
const valid = 'var mysql = require("mysql"); var connection = mysql.createConnection({host: "localhost",user: "db_user",password: "secret",database: "node_app_db"});connection.connect(); connection.query("SELECT * FROM accounts WHERE username=? AND password=?", [username,passwordHash],function(err,rows,fields){});'
const validBacktickString = 'connection.connect(); connection.query(`SELECT * FROM accounts WHERE username=? AND password=?`, [username,passwordHash],function(err,rows,fields){});'
const inValidBacktickString = 'connection.query(`SELECT * FROM accounts WHERE username=${username} AND password=${passwordHash}`);'
const invalid = 'connection.query(foo,function(err, rows, fields) {console.log("Result = " + JSON.stringify(rows));});'
const invalidOtherName = 'myCustomVariable.query(foo,function(err, rows, fields) {console.log("Result = " + JSON.stringify(rows));});'
const invalidThis = 'this.query(foo,function(err, rows, fields) {console.log("Result = " + JSON.stringify(rows));});'
const invalidOtherMethod = 'connection.whyDidINameItThis(foo,function(err, rows, fields) {console.log("Result = " + JSON.stringify(rows));});'
var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } })
ruleTester.run('detect-sql-injection', rule, {

  valid: [
    {
      code: valid
    },
    {
      code: validBacktickString
    },
    {
      code: invalid,
      options: [{ objectNames: ["myCustomVariable"] }]
    },
    {
      code: invalidOtherName
    },
    {
      code: invalidThis
    },
    {
      code: invalidOtherMethod
    }
  ],

  invalid: [
    {
      code: invalid,
      errors: [{
        message: ERROR_MSG
      }]
    },
    {
      code: inValidBacktickString,
      errors: [{
        message: ERROR_MSG
      }]
    },
    {
      code: invalidOtherName,
      options: [{ objectNames: ["myCustomVariable"] }],
      errors: [{
        message: ERROR_MSG
      }]
    },
    {
      code: invalidThis,
      options: [{ objectNames: ["this"] }],
      errors: [{
        message: ERROR_MSG
      }]
    },
    {
      code: invalidOtherMethod,
      options: [{ methodNames: ["whyDidINameItThis"] }],
      errors: [{
        message: ERROR_MSG
      }]
    }
  ]
})
