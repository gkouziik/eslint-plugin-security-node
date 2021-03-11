/**
 * @fileoverview Detect html injection
 * @author Gkouziik
 */

'use strict'
const { getDocsUrl } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'detect document.write() with non Literal argument'
    },
    docs: {
      description: 'Detect html injection',
      category: 'Possible Errors',
      recommended: true,
      url: getDocsUrl('detect-html-injection')
    },
    fixable: null
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        if (node.callee.hasOwnProperty('object')) {
          if (node.callee.object.name === 'document') {
            if (node.callee.hasOwnProperty('property')) {
              if (node.callee.property.name === 'write') {
                if (node.arguments.length > 0 && node.arguments[0].type !== 'Literal') {
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
