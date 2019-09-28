/**
 * @fileoverview Non literal regural expressions may cause possible attack
 * @author Gkouziik
 */
'use strict'

var rule = require('../../../lib/rules/non-literal-reg-expr')
var RuleTester = require('eslint').RuleTester
const ERROR_MSG = 'Found RegExp with non literal argument'
const valid = 'var regE = new RegExp("www");'
const invalid = 'var regE = new RegExp(foo);'
const invalidSecond = 'var regE = new RegExp(foo + "www");'
var ruleTester = new RuleTester()
ruleTester.run('non-literal-reg-expr', rule, {
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
