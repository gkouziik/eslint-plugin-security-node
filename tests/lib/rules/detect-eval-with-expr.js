/**
 * @fileoverview detect eval with string concatenation
 * @author Gkouziik
 */
'use strict'

var rule = require('../../../lib/rules/detect-eval-with-expr')
var RuleTester = require('eslint').RuleTester
var ruleTester = new RuleTester()
const ERROR_MSG = 'detect eval() with non Literal argument'
const valid = 'eval("foo");'
const invalid = 'eval("foo." + property);'
const invalidSecond = 'eval(foo);'
ruleTester.run('detect-eval-with-expr', rule, {

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
