/**
 * @fileoverview Buffer.allocUnsafe(size) is not safe and should not be used
 * @author Gkouziik
 */

'use strict'

var rule = require('../../../lib/rules/detect-buffer-unsafe-allocation')

var RuleTester = require('eslint').RuleTester
var ruleTester = new RuleTester()
const ERROR_MSG = 'detect Buffer.allocUnsafe()'
const valid = 'Buffer.alloc(5)'
const invalid = 'Buffer.allocUnsafe(5)'

ruleTester.run('detect-buffer-unsafe-allocation', rule, {

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
