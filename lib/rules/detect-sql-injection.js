/**
 * @fileoverview detect SQL injection
 * @author Gkouziik
 */
'use strict'
const { getDocsUrl } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'detect possible SQL injection'
    },
    docs: {
      description: 'detect SQL injection',
      category: 'Possible Errors',
      recommended: false,
      url: getDocsUrl('detect-sql-injection')
    },
    fixable: null
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        if (node.callee.type === 'MemberExpression') {
          if (node.callee.hasOwnProperty('object')) {
            var objectName = node.callee.object.name
            if (objectName === 'connection' || objectName === 'connect' || objectName === 'conn') {
              if (node.callee.hasOwnProperty('property')) {
                var propertyName = node.callee.property.name
                if (propertyName === 'query') {
                  if (node.arguments[0].type !== 'Literal') {
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
