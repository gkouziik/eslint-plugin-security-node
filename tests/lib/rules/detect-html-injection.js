/**
 * @fileoverview Detect html injection
 * @author Gkouziik
 */

'use strict'

var rule = require('../../../lib/rules/detect-html-injection')
var RuleTester = require('eslint').RuleTester
const ERROR_MSG = 'detect document.write() with non Literal argument'
const valid = 'document.write("foo");'
const invalid = 'var name = document.URL.indexof("name=") + 5; document.write("Welcome " + document.URL.substring(name, document.URL.length));'
const invalidSecond = 'var foo = url; document.write(foo);'
var ruleTester = new RuleTester()
ruleTester.run('detect-html-injection', rule, {

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
    },
    {
      code: invalidSecond,
      errors: [{
        message: ERROR_MSG
      }]
    }
  ]
})
