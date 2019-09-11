/**
 * @fileoverview detect eval with string concatenation
 * @author Gkouziik
 */
'use strict'

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'detect eval() with non Literal argument'
    },
    docs: {
      description: 'detect eval with string concatenation',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: null
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        if (node.callee.name === 'eval') {
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
