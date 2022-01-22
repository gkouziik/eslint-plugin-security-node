/**
 * @fileoverview detect improper exception handling
 * @author PauMacasaet
 */
'use strict'
const { getDocsUrl } = require('../utils')

function isErrCallbackFunc (calleeArg) {
	const functionRegEx = /^(ArrowFunctionExpression|FunctionExpression)$/.test(calleeArg.type)
	return functionRegEx
}

module.exports = {
  meta: {
		type: 'suggestion',
		messages: {
			msg: 'Detect missing callback on unhandled exception',
			msg_no_func_body: 'Detect empty function body',
			msg_no_process_exit: 'Detect missing process.exit()',
			msg_zero_exit_code: 'Detect missing non-zero exit code'
		},
		docs: {
			description: 'rule that detects improper exception handling',
			category: 'Possible Errors',
			recommended: true,
			url: getDocsUrl('detect-improper-exception-handling')
    },
		fixable: null
	},
	create: function (context) {
		return {
			'CallExpression': function (node) {
				let nodeCallee = node.callee
				if (nodeCallee.hasOwnProperty('object') &&
					nodeCallee.hasOwnProperty('property') &&
					nodeCallee.type === 'MemberExpression') {
					let objectName = nodeCallee.object.name
					let propertyName = nodeCallee.property.name
					if (objectName === 'process' && propertyName === 'on') {
						if (node.arguments.length > 0) {
							if (node.arguments[0].type === 'Literal' &&
								node.arguments[0].value === 'uncaughtException')
							{
								if (node.arguments.length > 1) {
									let calleeArgs = node.arguments
									let callbacks = []
									for (let arg = 1; arg < calleeArgs.length; arg++) {
										if (calleeArgs[arg].type === 'CallExpression') {
											callbacks.push(calleeArgs[arg].type)
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
															let hasArguments = functionBody[i].expression.arguments.length > 0
															if (objectName === 'process' && propertyName === 'exit' && hasArguments) {
																let exitCode = functionBody[i].expression.arguments[0].value
																if (exitCode === 1) {
																	callbacks.push(calleeArgs[arg].type)
																}
															}
														}
													}
												} 
												if (callbacks.length === 0) {
													context.report({
														node: node,
														messageId: 'msg_no_process_exit',
														loc: {
															start: calleeArgs[arg].body.loc.start,
															end: calleeArgs[arg].body.loc.end
														}
													})
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
											}
										} 
									}
								} else {
									context.report({
										node: node,
										messageId: 'msg'
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