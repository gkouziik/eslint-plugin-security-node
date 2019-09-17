/**
 * @fileoverview detect vm.runInThisContext() method in nodes vm
 * @author Gkouziik
 */
'use strict'

var rule = require('../../../lib/rules/detect-runinthiscontext-method-in-nodes-vm')

var RuleTester = require('eslint').RuleTester
const ERROR_MSG = 'detect runInThisContext() with non Literal argument'
const valid = 'vm.runInThisContext("foo");'
const invalid = 'vm.runInThisContext(foo);'

var ruleTester = new RuleTester()
ruleTester.run('detect-runinthiscontext-method-in-nodes-vm', rule, {

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
