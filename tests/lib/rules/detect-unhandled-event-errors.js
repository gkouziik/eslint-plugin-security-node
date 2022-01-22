/**
 * @fileoverview detect unhandled event errors
 * @author PauMacasaet
 */
'use strict'

var rule = require('../../../lib/rules/detect-unhandled-event-errors')

var RuleTester = require('eslint').RuleTester

const ERROR_MSG_LISTENER = 'Missing callback function on error listener'
const ERROR_MSG_EMIT = 'Missing callback function on error emitter'
const ERROR_MSG_NO_FUNC_BODY = 'Detect empty function body'
const ERROR_MSG_IMPROPER_FUNC_BODY = 'Detect inappropriate function body content'
const validListener = "myEmitter.on('error', function(err) { console.error('whoops! there was an error') } );"
const validListenerSecond = "myEmitter.on('error', function(err) { console.log('whoops! there was an error'); console.error('whoops! there was an error'); } );"
const validListenerThird = "function someHandle(err) {console.error(err)}; myEmitter.on('error', someHandle(err))"
const invalidListener = "myEmitter.on('error');"
const validEmitter = "myEmitter.emit('error', new Error('whoops!'));"
const invalidEmitter = "myEmitter.emit('error');"
const invalidListenerNoBody = "myEmitter.on('error', function(err) { });"
const invalidListenerFuncBodyContent = "myEmitter.on('error', function(err) {console.log()});"

var ruleTester = new RuleTester()

ruleTester.run('detect-unhandled-event-errors', rule, {
  valid: [
    {
      code: validListener
    },
    {
      code: validListenerSecond
    },
    {
      code: validListenerThird
    }
  ],
  invalid: [
    {
      code: invalidListener,
      errors: [{
        message: ERROR_MSG_LISTENER
      }]
    },
    {
      code: invalidListenerNoBody,
      errors: [
        {
          message: ERROR_MSG_NO_FUNC_BODY
        }
      ]
    },
    {
      code: invalidListenerFuncBodyContent,
      errors: [{
        message: ERROR_MSG_IMPROPER_FUNC_BODY
      }]
    }
  ]
})

ruleTester.run('detect-unhandled-event-errors', rule, {
  valid: [
    {
      code: validEmitter
    }
  ],
  invalid: [
    {
      code: invalidEmitter,
      errors: [{
        message: ERROR_MSG_EMIT
      }]
    }
  ]
})
