/**
 * @fileoverview Non literal regural expressions may cause possible attack
 * @author Gkouziik
 */
'use strict'
module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'Found RegExp with non literal argument'
    },
    docs: {
      description: 'Non literal regural expressions may cause possible attack',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: null
  },

  create: function (context) {
    return {
      'NewExpression': function (node) {
        if (node.callee.name === 'RegExp') {
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
