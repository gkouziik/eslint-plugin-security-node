/**
 * @fileoverview detect insecure randomness via Math.random()
 * @author Gkouziik
 */

'use strict'

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'detect Math.random()'
    },
    docs: {
      description: 'detect insecure randomness via Math.random()',
      category: 'Possible Errros',
      recommended: false
    },
    fixable: null
  },

  create: function (context) {
    return {
      'MemberExpression': function (node) {
        if (node.hasOwnProperty('object')) {
          if (node.object.name === 'Math') {
            if (node.hasOwnProperty('property')) {
              if (node.property.name === 'random') {
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
