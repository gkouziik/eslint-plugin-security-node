/**
 * @fileoverview detect missing error handler in asynchronous calls
 * @author PauMacasaet
 */

'use strict'
const { getDocsUrl } = require('../utils')

function isAwaitCatchProperty (bodyArg) {
  if (bodyArg.type === 'ExpressionStatement') {
    if (bodyArg.expression.type === 'AwaitExpression') {
      if (bodyArg.expression.argument.hasOwnProperty('callee')) {
        if (bodyArg.expression.argument.callee.hasOwnProperty('property')) {
          if (bodyArg.expression.argument.callee.property.name === 'catch') return true
        }
      }
    }
  }
}

function isIfWithThrow (bodyArg) {
  return bodyArg.type === 'IfStatement' &&
    (/^.*(e|E)rr/.test(bodyArg.test.name) || bodyArg.test.type === 'UnaryExpression') &&
    (bodyArg.consequent.type === 'ThrowStatement' &&
      bodyArg.consequent.argument.type === 'NewExpression' &&
      /^.*(e|E)rr/.test(bodyArg.consequent.argument.callee.name))
}

function isTryCatchStatement (bodyArg) {
  return bodyArg.type === 'TryStatement' &&
    bodyArg.handler.type === 'CatchClause' &&
    /^(e|err|error|Error|anySpecificError)$/.test(bodyArg.handler.param.name)
}

function isReturnStatement (bodyArg) {
  return bodyArg.type === 'ReturnStatement'
}

function isResponseExpression (bodyArg) {
  if (bodyArg.type === 'ExpressionStatement') {
    if (bodyArg.expression.type === 'AssignmentExpression') {
      if (bodyArg.expression.left.type === 'MemberExpression') {
        if (bodyArg.expression.left.hasOwnProperty('object')) {
          if (/^(ctx|res|response)$/.test(bodyArg.expression.left.object.name)) {
            return true
          }
        }
      }
    }
  }
}

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'Unhandled errors detected in asynchronous function'
    },
    docs: {
      description: 'Handle errors in asynchronous calls',
      category: 'Possible Errors',
      recommended: true,
      url: getDocsUrl('detect-unhandled-async-errors')
    },
    fixable: null
  },
  create: function (context) {
    return {
      'FunctionDeclaration': function (node) {
        if (node.async === true) {
          let functionBody = node.body.body
          if (functionBody.length > 0) {
            let errorHandlers = []
            for (var i in functionBody) {
              if (isTryCatchStatement(functionBody[i]) ||
                isAwaitCatchProperty(functionBody[i]) ||
                isIfWithThrow(functionBody[i]) ||
                isReturnStatement(functionBody[i]) ||
                isResponseExpression(functionBody[i])) {
                errorHandlers.push(functionBody[i].type)
              }
            }
            if (errorHandlers.length === 0) {
              context.report({
                node: node,
                messageId: 'msg',
                loc: {
                  start: functionBody[i].loc.start,
                  end: functionBody[i].loc.end
                }
              })
            }
          }
        }
      }
    }
  }
}
