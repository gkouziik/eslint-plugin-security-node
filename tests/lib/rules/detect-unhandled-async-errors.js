/**
 * @fileoverview detect missing error handler in asynchronous calls
 * @author PauMacasaet
 */
'use strict'

var rule = require('../../../lib/rules/detect-unhandled-async-errors')
var RuleTester = require('eslint').RuleTester

const ERROR_MSG = 'Unhandled errors detected in asynchronous function'

const validTryCatch = "async function testFunc(x){ try { let res = await x } catch (e) { alert('an error occurred') }}"
const invalidTryCatch = "async function testFuncTwo(x) { try { let res = await x } catch (nocatch) { alert('nothing caught') }}"
const validThrowTryCatch = "function thisThrows() {throw new Error('Thrown from thisThrows()');} function myFunctionThatCatches() {try {return thisThrows();} catch (e) {throw e;} finally {console.log('We do cleanup here');}}async function run() {try {await myFunctionThatCatches();} catch (e) {console.error(e);}} run();"
const validIfWithThrow = "async function run() {const success = await alert('do something'); if(!success) throw new Error('error')}"
const validIfWithThrowTwo = "async function run() {const success = await alert('do something'); if(err) throw new Error('error')}"
const validIfWithThrowThree = "async function run() {const success = await alert('do something'); if(userErr) throw new handleError('error')}"
const invalidIfWithThrow = "async function run() {const success = await alert('do something'); if(!success) console.error('error')}"
const invalidIfWithThrowTwo = "async function run() {const success = await alert('do something'); if(err) throw new handle('error')}"
const validCatch = "async function run(out) { await out.catch(error => alert('there is an error'))}"
const invalidCatch = "async function run(out) { await out }"

var ruleTester = new RuleTester({ 
	parserOptions: { ecmaVersion: 2018 }
})

ruleTester.run('detect-unhandled-async-errors', rule, {
	valid: [
		{ code: validTryCatch },
		{ code: validThrowTryCatch }
	],

	invalid: [
		{
			code: invalidTryCatch,
			errors: [{
				message: ERROR_MSG
			}]
		}
	]
})

ruleTester.run('detect-unhandled-async-errors', rule, {
	valid: [
		{ code: validIfWithThrow },
		{ code: validIfWithThrowTwo },
		{ code: validIfWithThrowThree }
	],

	invalid: [
		{
			code: invalidIfWithThrow,
			errors: [{
				message: ERROR_MSG
			}]
		},
		{
			code: invalidIfWithThrowTwo,
			errors: [{
				message: ERROR_MSG
			}]
		}
	]
})

ruleTester.run('detect-unhandled-async-errors', rule, {
	valid: [
		{ code: validCatch }
	],

	invalid: [
		{
			code: invalidCatch,
			errors: [{
				message: ERROR_MSG
			}]
		}
	]
})