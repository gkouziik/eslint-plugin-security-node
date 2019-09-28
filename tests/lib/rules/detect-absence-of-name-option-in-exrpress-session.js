/**
 * @fileoverview Detect the absence of name option in express session
 * @author Gkouziik
 */
'use strict'

// eslint-disable-next-line one-var
var rule = require('../../../lib/rules/detect-absence-of-name-option-in-exrpress-session')
var RuleTester = require('eslint').RuleTester

const ERROR_MSG = 'detect absence of option:name in express-session'
const validProperty = 'var session = require("express-session"); app.use(session({secret: "keyboard cat",name: "something",resave: false,saveUninitialized: true,cookie: { secure: true }}));'
const invalidProperty = 'var session = require("express-session"); app.use(session({secret: "keyboard cat",resave: false,saveUninitialized: true,cookie: { secure: true }}));'
var ruleTester = new RuleTester()
ruleTester.run('detect-absence-of-name-option-in-exrpress-session', rule, {

  valid: [
    {
      code: validProperty
    }
  ],

  invalid: [
    {
      code: invalidProperty,
      errors: [{
        message: ERROR_MSG
      }]
    }
  ]
})

