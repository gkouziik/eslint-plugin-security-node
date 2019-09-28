/**
 * @fileoverview detect opion:unsafe in serialize method in serialize-javasript npm package
 * @author Gkouziik
 */
'use strict'

var rule = require('../../../lib/rules/detect-option-unsafe-in-serialize-javascript-npm-package')
var RuleTester = require('eslint').RuleTester
const ERROR_MSG = 'detect option:unsafe in serialize'
const valid = 'serialize({str: "string",  obj  : {foo: "foo"},arr  : [1, 2, 3],bool : true})'
const invalid = 'serialize(object,{unsafe:true})'

var ruleTester = new RuleTester()
ruleTester.run('detect-option-unsafe-in-serialize-javascript-npm-package', rule, {

  valid: [{

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
