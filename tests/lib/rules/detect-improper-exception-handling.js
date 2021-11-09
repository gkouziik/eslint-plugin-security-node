/**
 * @fileoverview detect missing error handler in asynchronous calls
 * @author PauMacasaet
 */
'use strict'

var rule = require('../../../lib/rules/detect-improper-exception-handling')

var RuleTester = require('eslint').RuleTester

const ERROR_MSG = 'Detect missing callback on unhandled exception'
const ERR_MSG_NO_FUNC_BODY = 'Detect empty function body'
const ERR_MSG_NO_PROCESS_EXIT = 'Detect missing process.exit()'
const validHandler = "process.on('uncaughtException', function(err) { alert('something went wrong'); process.exit(1); });"
const validHandlerSecond = "function dummyError(err) {alert('something went wrong')}; process.on('uncaughtException', dummyError(err))"
const invalidHandlerNoCallback = "process.on('uncaughtException');"
const invalidHandlerNoFuncBody = "process.on('uncaughtException', function (err) {})"
const invalidHandlerNoProcessExit = "process.on('uncaughtException', function (err) { console.error(err) })"
const invalidHandlerNoExitCode = "process.on('uncaughtException', function(err) { alert('something went wrong'); process.exit(); });"

var ruleTester = new RuleTester()

ruleTester.run('detect-improper-exception-handling', rule, {
	valid: [
		{ code: validHandler },
		{ code: validHandlerSecond }
	],

	invalid: [
		{
			code: invalidHandlerNoCallback,
			errors: [{
				message: ERROR_MSG
			}]
		},
		{
			code: invalidHandlerNoFuncBody,
			errors: [{
				message: ERR_MSG_NO_FUNC_BODY
			}]
		},
		{
			code: invalidHandlerNoProcessExit,
			errors: [{
				message: ERR_MSG_NO_PROCESS_EXIT
			}]
		},
		{
			code: invalidHandlerNoExitCode,
			errors: [{
				message: ERR_MSG_NO_PROCESS_EXIT
			}]
		}
	]
})