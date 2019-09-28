/**
 * @fileoverview detect helmet() middleware without noCache()
 * @author Gkouziik
 */
'use strict'

const rule = require('../../../lib/rules/detect-helmet-without-nocache')
const RuleTester = require('eslint').RuleTester
const ERROR_MSG = 'found helmet middleware without noCache()'
var valid1 = 'app.use(helmet()); app.use(noCache());'
var valid2 = 'app.use(helmet()); app.use(helmet.noCache());'
var invalid = 'app.use(helmet()); var a = 2;'
var ruleTester = new RuleTester()
ruleTester.run('detect-helmet-without-nocache', rule, {

  valid: [
    {
      code: valid1
    }
  ],

  invalid: [
  ]
})
ruleTester.run('detect-helmet-without-nocache', rule, {

  valid: [
    {
      code: valid2
    }
  ],

  invalid: [
  ]
})
