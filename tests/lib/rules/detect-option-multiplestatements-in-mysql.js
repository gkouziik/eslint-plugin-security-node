/**
 * @fileoverview detect option mulitpleStatements:true in createConnection method of mysql
 * @author Gkouziik
 */
'use strict'

var rule = require('../../../lib/rules/detect-option-multiplestatements-in-mysql')
var RuleTester = require('eslint').RuleTester
const ERROR_MSG = 'detect option multipleStatements:true'
const valid = 'var mysql = require("mysql"); var connection = mysql.createConnection({host: "localhost",user: "db_user",password: "secret",database: "node_app_db"});'
const invalid = 'var mysql = require("mysql"); var connection = mysql.createConnection({host: "localhost", multipleStatements: true})'

var ruleTester = new RuleTester()
ruleTester.run('detect-option-multiplestatements-in-mysql', rule, {

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
