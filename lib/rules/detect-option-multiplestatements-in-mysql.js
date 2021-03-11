/**
 * @fileoverview detect option mulitpleStatements:true in createConnection method of mysql
 * @author Gkouziik
 */
'use strict'
const { getDocsUrl } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'detect option multipleStatements:true'
    },
    docs: {
      description: 'detect option mulitpleStatements:true in createConnection method of mysql',
      category: 'Possible Errors',
      recommended: true,
      url: getDocsUrl('detect-option-multiplestatements-in-mysql')
    },
    fixable: null
  },

  create: function (context) {
    var mysqlVar
    return {
      'VariableDeclaration': function (node) {
        if (node.declarations.length > 0) {
          if (node.declarations[0].init != null) {
            if (node.declarations[0].hasOwnProperty('init')) {
              if (node.declarations[0].init.hasOwnProperty('callee')) {
                if (node.declarations[0].init.callee.hasOwnProperty('name')) {
                  if (node.declarations[0].init.callee.name === 'require' &&
          node.declarations[0].init.arguments[0].type === 'Literal' &&
          node.declarations[0].init.arguments[0].value === 'mysql') {
                    mysqlVar = node.declarations[0].id.name
                  }
                }
              }
            }
          }
        }
      },
      'CallExpression': function (node) {
        if (node.callee.hasOwnProperty('object') && node.callee.hasOwnProperty('property')) {
          if (node.callee.type === 'MemberExpression') {
            if ((node.callee.object.name === mysqlVar || node.callee.object.name === 'mysql') && node.callee.property.name === 'createConnection') {
              if (node.arguments.length > 0 && node.arguments[0].type === 'ObjectExpression') {
                if (node.arguments[0].hasOwnProperty('properties')) {
                  var found = false
                  for (var i in node.arguments[0].properties) {
                    if (node.arguments[0].properties[i].hasOwnProperty('key') && node.arguments[0].properties[i].hasOwnProperty('value')) {
                      if (node.arguments[0].properties[i].key.name === 'multipleStatements' && node.arguments[0].properties[i].value.raw === 'true') {
                        found = true
                      }
                    }
                  }
                  if (found == true) {
                    context.report({
                      node: node,
                      messageId: 'msg',
                      loc: {
                        start: node.arguments[0].loc.start,
                        end: node.arguments[0].loc.end
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
