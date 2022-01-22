/**
 * @fileoverview detect unhandled event errors
 * @author PauMacasaet
 */
'use strict'
const { getDocsUrl } = require('../utils')

function isErrCallbackFunc (calleeArg) {
	const functionRegEx = /^(ArrowFunctionExpression|FunctionExpression)$/.test(calleeArg.type)
	return functionRegEx
}

function isNewExpressionErrHandler (calleeArg) {
	const errorHandlerRegex = calleeArg.callee.name === 'Error' // update this
	return calleeArg.type === 'NewExpression' && errorHandlerRegex
}

module.exports = {
	meta: {
		type: 'suggestion',
		messages: {
			msg: 'Detect unhandled event error',
			msg_listener_callback: 'Missing callback function on error listener',
			msg_emit_callback: 'Missing callback function on error emitter',
			msg_no_func_body: 'Detect empty function body',
			msg_improper_func_body: 'Detect inappropriate function body content'
		},
		docs: {
			description: 'Require listening to errors when using EventEmitter',
			category: 'Possible Errors',
			recommended: true,
			url: getDocsUrl('detect-unhandled-event-errors')
		},
		fixable: null
	},
	create: function (context) {
		let eventVar
		let listenerVar
		return {
			'VariableDeclaration': function (node) {
				if (node.declarations.length > 0) {
					if (node.declarations[0].hasOwnProperty('init')) {
						if (node.declarations[0].init != null) {
							if (node.declarations[0].init.hasOwnProperty('callee')) {
								if (node.declarations[0].init.callee.hasOwnProperty('name')) {
									if (node.declarations[0].init.callee.name === 'require' 
										&& node.declarations[0].init.arguments[0].type === 'Literal'
										&& node.declarations[0].init.arguments[0].value === 'events') 
									{
										eventVar = node.declarations[0].id.name
									}
								}
							}
						}
					}
				}
			},
			'VariableDeclaration': function (node) {
				if (node.declarations.length > 0) {
					if (node.declarations[0].hasOwnProperty('init')) {
						if (node.declarations[0].init != null) {
							if (node.declarations[0].init.type === 'NewExpression') {
								if (node.declarations[0].init.hasOwnProperty('callee')) {
									let eventModule = node.declarations[0].init.callee.name
									if (eventModule === eventVar || eventModule === 'EventEmitter') {
										listenerVar = node.declarations[0].id.name
									}
								}
							}
						}
					}
				}
			},
			'CallExpression': function (node) {
				let nodeCallee = node.callee
				if (nodeCallee.hasOwnProperty('object') 
					&& nodeCallee.hasOwnProperty('property') 
					&& nodeCallee.type === 'MemberExpression') {
					let objectName = nodeCallee.object.name
					let propertyName = nodeCallee.property.name
					if (objectName === listenerVar || objectName === 'myEmitter') {
						if (propertyName === 'on') {
							if (node.arguments.length > 0) {
								if (node.arguments[0].type === 'Literal' 
									&& node.arguments[0].value === 'error') 
								{
									if (node.arguments.length > 1) {
										let calleeArgs = node.arguments
										let errorHandlers = []
										for (let arg = 1; arg < calleeArgs.length; arg++) {
											if (calleeArgs[arg].type === 'CallExpression') {
												errorHandlers.push(calleeArgs[arg].type)
											}
											if (isErrCallbackFunc(calleeArgs[arg])) {
												if (calleeArgs[arg].body.body.length > 0) {
													let functionBody = calleeArgs[arg].body.body
													for (let i in functionBody) {
														if (functionBody[i].type === 'ExpressionStatement') {
															if (functionBody[i].expression.callee.hasOwnProperty('object') 
																&& functionBody[i].expression.callee.hasOwnProperty('property')) {
																let objectName = functionBody[i].expression.callee.object.name
																let propertyName = functionBody[i].expression.callee.property.name
																// IF CONSOLE.ERROR
																if (objectName === 'console' && propertyName === 'error') {
																	errorHandlers.push(calleeArgs[arg].type)
																} 
															}
															if (functionBody[i].expression.callee.hasOwnProperty('name')) {
																if (functionBody[i].expression.callee.name === 'reject') {
																	errorHandlers.push(calleeArgs[arg].type)
																}
															}

														} 
													} 
												} else {
													context.report({
														node: node,
														messageId: 'msg_no_func_body',
														loc: {
															start: calleeArgs[arg].body.loc.start,
															end: calleeArgs[arg].body.loc.end
														}
													})
													break
												}
											}
											if (errorHandlers.length === 0) {
												context.report({
													node: node,
													messageId: 'msg_improper_func_body',
													loc: {
														start: calleeArgs[arg].body.loc.start,
														end: calleeArgs[arg].body.loc.end
													}
												})
											}
										}
									} else {
										context.report({
											node: node,
											messageId: 'msg_listener_callback'
										})
									}
								} 
							}
						}
						if (propertyName === 'emit') {
							if (node.arguments.length > 0) {
								if (node.arguments[0].type === 'Literal' && node.arguments[0].value === 'error') {
									let calleeArgs = node.arguments
									let errorHandlers = []
									for (let arg = 1; arg < calleeArgs.length; arg++) {
										if (isErrCallbackFunc(calleeArgs[arg])
											|| isNewExpressionErrHandler(calleeArgs[arg])
										) {
											errorHandlers.push(calleeArgs[arg].type)
										}
									}
									if (errorHandlers.length === 0) {
										context.report({
											node: node,
											messageId: 'msg_emit_callback',
											loc: {
												start: nodeCallee.loc.start,
												end: nodeCallee.loc.end
											}
										})
									}
								}
							}
						}
					}
				}
			}
		}
	}
}