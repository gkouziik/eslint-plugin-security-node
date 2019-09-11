/**
 * @fileoverview detect log forging attack
 * @author Gkouziik
 */
'use strict'

var rule = require('../../../lib/rules/detect-crlf')
var RuleTester = require('eslint').RuleTester

const ERROR_MSG = 'Detect console.log() with non Literal argument'
const validConsoleLog = 'console.log("Hello");'
const invalidConsoleLog = 'console.log("Hello" + foo);'
const invalidConsoleLogSecond = 'console.log("Hello",foo);'
const invalidConsoleLogThird = 'console.log(foo);'

var ruleTester = new RuleTester()
ruleTester.run('detect-crlf', rule, {

  valid: [
    {
      code: validConsoleLog
    }
  ],

  invalid: [
    {
      code: invalidConsoleLog,
      errors: [{
        message: ERROR_MSG
      }]
    },
    {
      code: invalidConsoleLogSecond,
      errors: [{
        message: ERROR_MSG
      }]
    },
    {
      code: invalidConsoleLogThird,
      errors: [{
        message: ERROR_MSG
      }]
    }
  ]
})
