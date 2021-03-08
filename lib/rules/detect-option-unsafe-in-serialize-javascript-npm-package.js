/**
 * @fileoverview detect opion:unsafe in serialize method in serialize-javasript npm package
 * @author Gkouziik
 */
'use strict'
const { getDocsUrl } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'detect option:unsafe in serialize'
    },
    docs: {
      description: 'detect opion:unsafe in serialize method in serialize-javasript npm package',
      category: 'Possible errors',
      recommended: true,
      url: getDocsUrl('detect-option-unsafe-in-serialize-javascript-npm-package')
    },
    fixable: null
  },

  create: function (context) {
    var serializeVar

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
          node.declarations[0].init.arguments[0].value === 'serialize-javascript'
                  ) {
                    serializeVar = node.declarations[0].id.name
                  }
                }
              }
            }
          }
        }
      },
      'CallExpression': function (node) {
        if (node.callee.type === 'Identifier') {
          if (node.callee.name === serializeVar || node.callee.name === 'serialize') {
            if (node.arguments.length > 0 && node.arguments[1] != undefined) {
              if (node.arguments[1].type === 'ObjectExpression') {
                var flag = false
                for (var i in node.arguments[1].properties) {
                  if (node.arguments[1].properties[i].key.name === 'unsafe') {
                    if (node.arguments[1].properties[i].value.raw === 'true') {
                      flag = true
                      break
                    }
                  }
                }
                if (flag == true) {
                  context.report({
                    node: node,
                    messageId: 'msg',
                    loc: {
                      start: node.arguments[1].loc.start,
                      end: node.arguments[1].loc.end
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
