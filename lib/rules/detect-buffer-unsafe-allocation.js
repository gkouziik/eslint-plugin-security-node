/**
 * @fileoverview Buffer.allocUnsafe(size) is not safe and should not be used
 * @author Gkouziik
 */

'use strict'
const { getDocsUrl } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'detect Buffer.allocUnsafe()'
    },
    docs: {
      description: 'Buffer.allocUnsafe(size) is not safe and should not be used',
      category: 'Possible Errors',
      recommended: false,
      url: getDocsUrl('detect-buffer-unsafe-allocation')
    },
    fixable: 'null'
  },

  create: function (context) {
    return {
      'MemberExpression': function (node) {
        if (node.hasOwnProperty('object')) {
          if (node.object.name === 'Buffer') {
            if (node.hasOwnProperty('property')) {
              if (node.property.name === 'allocUnsafe') {
                context.report({
                  node: node,
                  messageId: 'msg',
                  loc: {
                    start: node.property.loc.start,
                    end: node.property.loc.end
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
