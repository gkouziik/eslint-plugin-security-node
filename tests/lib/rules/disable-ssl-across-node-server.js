/**
 * @fileoverview process.env.NODE_TLS_REJECT_UNAUTHORIZED=&#39;0&#39; disables SSL across node server!
 * @author Gkouziik
 */
'use strict';

var rule = require('../../../lib/rules/disable-ssl-across-node-server');
var RuleTester = require('eslint').RuleTester
const ERROR_MSG = 'detect process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"'
const invalid = 'process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";'

var ruleTester = new RuleTester()
ruleTester.run('disable-ssl-across-node-server', rule, {

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
