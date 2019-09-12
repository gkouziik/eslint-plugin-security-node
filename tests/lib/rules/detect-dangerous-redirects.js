/**
 * @fileoverview detect dangerous redirects
 * @author Gkouziik
 */
'use strict'

var rule = require('../../../lib/rules/detect-dangerous-redirects')
var RuleTester = require('eslint').RuleTester
const ERROR_MSG = 'detect res.redirect() with non literal argument'
const valid = 'res.redirect("foo");'
const invalid = 'res.redirect(foo + "foo");'
const invalidSecond = 'res.redirect(foo);'
var ruleTester = new RuleTester()
ruleTester.run('detect-dangerous-redirects', rule, {

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
