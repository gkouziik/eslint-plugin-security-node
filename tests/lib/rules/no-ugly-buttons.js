/**
 * @fileoverview Buttons must have some styling
 * @author gkouziik
 */
'use strict'

const rule = require('../../../lib/rules/no-ugly-buttons')
const RuleTester = require('eslint').RuleTester

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true
    }
  }
})

const ERROR_MSG_NOT_STYLED = 'Buttons must be styled with a btn class at least.'

const ruleTester = new RuleTester()
ruleTester.run('no-ugly-buttons', rule, {

  valid: [{
    code: '<button className="btn"></button>'
  }],

  invalid: [{
    code: '<button></button>',
    errors: [{
      message: ERROR_MSG_NOT_STYLED,
      type: 'JSXOpeningElement'
    }]
  }]
})
// 'use strict'
//
// var rule = require('../../../lib/rules/no-ugly-buttons')
// var RuleTester = require('eslint').RuleTester
//
// var ruleTester = new RuleTester()
// ruleTester.run('no-ugly-buttons', rule, {
//
//   valid: [
//     "var $ = require('jquery');",
//     "var filter = require('lodash/fp/filter')"
//   ],
//
//   invalid: [
//     {
//       code: "var _ = require('your favorite fp library');",
//       errors: [{
//         message: 'Prefer importing single functions over a full FP library',
//         type: 'VariableDeclaration'
//       }]
//     }
//   ]
// })
