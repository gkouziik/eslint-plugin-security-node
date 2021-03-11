/**
 * @fileoverview process.env.NODE_TLS_REJECT_UNAUTHORIZED='0' disables SSL across node server!
 * @author Gkouziik
 */
'use strict'
const { getDocsUrl } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'detect process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"'
    },
    docs: {
      description: "process.env.NODE_TLS_REJECT_UNAUTHORIZED='0' disables SSL across node server!",
      category: 'Possible Errors',
      recommended: true,
      url: getDocsUrl('disable-ssl-across-node-server')
    },
    fixable: null
  },

  create: function (context) {
    return {
      'ExpressionStatement': function (node) {
        if (node.expression.type === 'AssignmentExpression') {
          if (node.expression.left.type === 'MemberExpression' && node.expression.left.hasOwnProperty('object')) {
            if (node.expression.left.object.hasOwnProperty('object') && node.expression.left.object.hasOwnProperty('property')) {
              if (node.expression.left.object.object.name === 'process' && node.expression.left.object.property.name === 'env') {
                if (node.expression.left.object.hasOwnProperty('property')) {
                  if (node.expression.left.property.name === 'NODE_TLS_REJECT_UNAUTHORIZED') {
                    if (node.expression.right.value === '0') {
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
  }
}
