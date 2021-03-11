/**
 * @fileoverview detect security missconfiguration in express cookie
 * @author Gkouziik
 */

'use strict'
const { getDocsUrl } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'detect absence of option cookie:secure in cookie express-session'
    },
    docs: {
      description: 'detect security missconfiguration in express cookie',
      category: 'Possible Errors',
      recommended: true,
      url: getDocsUrl('detect-security-missconfiguration-cookie')
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
                  if (
                    node.declarations[0].init.callee.name === 'require' &&
          node.declarations[0].init.arguments[0].type === 'Literal' &&
          node.declarations[0].init.arguments[0].value === 'express-session'
                  ) {
                    expressSessionVar = node.declarations[0].id.name
                  }
                }
              }
            }
          }
        }
      },
      'CallExpression': function (node) {
        if (
          node.callee.hasOwnProperty('object') &&
          node.callee.type === 'MemberExpression' &&
          node.callee.hasOwnProperty('property')
        ) {
          if (node.callee.object.name === 'app' && node.callee.property.name === 'use') {
            if (node.arguments[0].hasOwnProperty('callee')) {
              if (
                node.arguments[0].callee.name === expressSessionVar ||
              node.arguments[0].callee.name === 'express-session'
              ) {
                if (node.arguments[0].hasOwnProperty('arguments')) {
                  if (node.arguments[0].arguments.length > 0) {
                    if (node.arguments[0].arguments[0].type === 'ObjectExpression') {
                      for (var i in node.arguments[0].arguments[0].properties) {
                        if (node.arguments[0].arguments[0].properties[i].key.name === 'cookie') {
                          var flag = false
                          for (var j in node.arguments[0].arguments[0].properties[i].value.properties) {
                            if (node.arguments[0].arguments[0].properties[i].value.properties[j].key.name === 'secure') {
                              if (node.arguments[0].arguments[0].properties[i].value.properties[j].value.raw === 'true') {
                                flag = true
                                break
                              }
                            }
                          }
                          // eslint-disable-next-line eqeqeq
                          if (flag == false) {
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
      }
    }
  }
}
