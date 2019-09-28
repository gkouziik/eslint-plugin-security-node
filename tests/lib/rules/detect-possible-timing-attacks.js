/**
 * @fileoverview detect possible timing attacks
 * @author gkouziik
 */
'use strict'

var rule = require('../../../lib/rules/detect-possible-timing-attacks')
var RuleTester = require('eslint').RuleTester
var valid = 'if(foo == 5){};'
var invalidLeft = 'if(password === "mypass"){};'
var invalidRight = 'if("mypass" === password){};'

var ruleTester = new RuleTester()
ruleTester.run('detect-possible-timing-attacks', rule, {

  valid: [
    {
      code: valid
    }
  ],

  invalid: [
    {
      code: invalidLeft,
      errors: [{
        messageId: 'msgLeft'
      }]
    }
  ]
})

ruleTester.run('detect-possible-timing-attacks', rule, {
  valid: [
    {
      code: valid
    }
  ],
  invalid: [
    {
      code: invalidRight,
      errors: [{
        messageId: 'msgRight'
      }]
    }
  ]
})
