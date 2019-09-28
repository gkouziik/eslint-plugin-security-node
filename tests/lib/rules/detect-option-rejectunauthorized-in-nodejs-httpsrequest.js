/**
 * @fileoverview detect option rejectUnauthorized:false in Nodejs https request method
 * @author Gkouziik
 */
'use strict'

var rule = require('../../../lib/rules/detect-option-rejectunauthorized-in-nodejs-httpsrequest')
var RuleTester = require('eslint').RuleTester
const ERROR_MSG = 'detect option rejectUnauthorized:true'
const valid = 'var https = require("https"); var request = https.request({hostname: "example.com",port: 443,path: "/",method: "GET"}, function() {});'
const invalid = 'var https = require("https"); var request = https.request({hostname: "example.com",port: 443,path: "/",method: "GET", rejectUnauthorized:true}, function() {});'

var ruleTester = new RuleTester()
ruleTester.run('detect-option-rejectunauthorized-in-nodejs-httpsrequest', rule, {

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
