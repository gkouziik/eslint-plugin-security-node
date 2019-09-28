/**
 * @fileoverview Non literal require calls may cause an attack
 * @author Gkouziik
 */
'use strict'

var rule = require('../../../lib/rules/detect-non-literal-require-calls')

var RuleTester = require('eslint').RuleTester

const ERROR_MSG = 'Found require with non-literal argument'
const valid = 'var req = require("a")'
const invalid = 'var req = require(a)'

var ruleTester = new RuleTester()
ruleTester.run('detect-non-literal-require-calls', rule, {

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
