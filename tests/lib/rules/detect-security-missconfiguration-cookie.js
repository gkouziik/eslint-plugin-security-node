/**
 * @fileoverview detect security missconfiguration in express cookie
 * @author Gkouziik
 */
'use strict'

var rule = require('../../../lib/rules/detect-security-missconfiguration-cookie')
var RuleTester = require('eslint').RuleTester

const ERROR_MSG = 'detect absence of option cookie:secure in cookie express-session'
const validWithCookie = 'var session = require("express-session"); app.use(session({store: new RedisStore({host: "localhost",port: 6379,db: 2,pass: "funky password here",ttl: (20 * 60)}),key: "id",secret: "this is a nice secret",resave: false,saveUninitialized: true,cookie: {domain: "secure.example.com", secure: true, path: "/",httpOnly: true, maxAge: null}}));'
const invalidWithSecureFalse = 'var session = require("express-session");  app.use(session({store: new RedisStore({host: "localhost",port: 6379,db: 2,pass: "funky password here",ttl: (20 * 60)}),key: "id",secret: "this is a nice secret",resave: false,saveUninitialized: true,cookie: {domain: "secure.example.com", secure: false, path: "/",httpOnly: true, maxAge: null}}));'
const validWithoutCookie = 'var session = require("express-session"); app.use(session({store: new RedisStore({host: "localhost",port: 6379,db: 2,pass: "funky password here",ttl: (20 * 60)}),key: "id",secret: "this is a nice secret",resave: false,saveUninitialized: true,}));'
const invalidWithoutSecureOption = 'var session = require("express-session"); app.use(session({store: new RedisStore({host: "localhost",port: 6379,db: 2,pass: "funky password here",ttl: (20 * 60)}),key: "id",secret: "this is a nice secret",resave: false,saveUninitialized: true,cookie: {domain: "secure.example.com",path: "/",httpOnly: true,maxAge: null}}));'
var ruleTester = new RuleTester()
ruleTester.run('detect-security-missconfiguration-cookie', rule, {

  valid: [
    { code: validWithCookie },
    { code: validWithoutCookie }
  ],

  invalid: [
    {
      code: invalidWithSecureFalse,
      errors: [{
        message: ERROR_MSG
      }]
    },
    {
      code: invalidWithoutSecureOption,
      errors: [{
        message: ERROR_MSG
      }]
    }
  ]
})
