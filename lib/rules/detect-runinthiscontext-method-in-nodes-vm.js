/**
 * @fileoverview detect vm.runInThisContext() method in nodes vm
 * @author Gkouziik
 */

'use strict'
const { getDocsUrl } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'detect runInThisContext() with non Literal argument'
    },
    docs: {
      description: 'detect vm.runInThisContext() method in nodes vm with non Literal argument',
      category: 'Possible Errors',
      recommended: false,
      url: getDocsUrl('detect-runinthiscontext-method-in-nodes-vm')
    },
    fixable: 'null'
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        if (node.callee.hasOwnProperty('property')) {
          if (node.callee.property.hasOwnProperty('name')) {
            if (node.callee.property.name === 'runInThisContext') {
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
