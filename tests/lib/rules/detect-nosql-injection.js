/**
 * @fileoverview detect NOsql injection
 * @author Gkouziik
 */
'use strict'

var rule = require('../../../lib/rules/detect-nosql-injection')
var RuleTester = require('eslint').RuleTester
const ERROR_MSG = 'detect $where'
const invalid = 'db.collection("users").else({$where: "this.canceledOrders > " + req.body.canceled}).each(function(err, doc){console.log(doc);})'
var ruleTester = new RuleTester()
ruleTester.run('detect-nosql-injection', rule, {

  valid: [

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
