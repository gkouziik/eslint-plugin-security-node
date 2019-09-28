/**
 * @fileoverview detect insecure randomness via Math.random()
 * @author Gkouziik
 */
'use strict'

var rule = require('../../../lib/rules/detect-insecure-randomness')
var RuleTester = require('eslint').RuleTester
const invalid = 'Math.random();'
const ERROR_MSG = 'detect Math.random()'
var ruleTester = new RuleTester()
ruleTester.run('detect-insecure-randomness', rule, {

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
