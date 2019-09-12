/**
 * @fileoverview detect dangerous redirects
 * @author Gkouziik
 */

'use strict'

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'detect res.redirect() with non literal argument'
    },
    docs: {
      description: 'detect dangerous redirects',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: null
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        if (node.callee.hasOwnProperty('object')) {
          if (node.callee.object.name === 'res') {
            if (node.callee.hasOwnProperty('property')) {
              if (node.callee.property.name === 'redirect') {
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
