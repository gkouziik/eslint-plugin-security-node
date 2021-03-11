/**
 * @fileoverview Detect the absence of name option in express session
 * @author Gkouziik
 */
'use strict'
const { getDocsUrl } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'detect absence of option:name in express-session'
    },
    docs: {
      description: 'Detect the absence of name option in express session',
      category: 'Possible Errors',
      recommended: true,
      url: getDocsUrl('detect-absence-of-name-option-in-exrpress-session')
    },
    fixable: null
  },

  create: function (context) {
    var expressSessionVar
    return {
      'VariableDeclaration': function (node) {
        if (node.declarations.length > 0) {
          if (node.declarations[0].init != null) {
            if (node.declarations[0].hasOwnProperty('init')) {
              if (node.declarations[0].init.hasOwnProperty('callee')) {
                if (node.declarations[0].init.callee.hasOwnProperty('name')) {
                  if (node.declarations[0].init.callee.name === 'require' &&
          node.declarations[0].init.arguments[0].type === 'Literal' &&
          node.declarations[0].init.arguments[0].value === 'express-session') {
                    expressSessionVar = node.declarations[0].id.name
                  }
                }
              }
            }
          }
        }
      },
      'CallExpression': function (node) {
        var flag = false
        if (node.callee.hasOwnProperty('object') && node.callee.type === 'MemberExpression' && expressSessionVar != undefined) {
          if (node.callee.object.name === 'app' && node.callee.property.name === 'use') {
            if (node.arguments[0].hasOwnProperty('callee')) {
              if (node.arguments[0].callee.name === expressSessionVar || node.arguments[0].callee.name === 'express-session') {
                if (node.arguments[0].arguments[0].type === 'ObjectExpression') {
                  for (var i in node.arguments[0].arguments[0].properties) {
                    if (node.arguments[0].arguments[0].properties[i].key.name === 'name') {
                      flag = true
                      break
                    }
                  }
                  if (flag === false) {
                    context.report({
                      node: node,
                      messageId: 'msg',
                      loc: {
                        start: node.arguments[0].arguments[0].loc.start,
                        end: node.arguments[0].arguments[0].loc.end
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
