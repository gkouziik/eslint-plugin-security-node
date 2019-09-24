/**
 * @fileoverview Rule to disallow non literal require calls that may cause an attack
 * @author Gkouziik
 */
'use strict'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      avoidNonLiteral: 'Found require with non-literal argument'
    },
    docs: {
      description: 'Non literal require calls may cause an attack',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: null
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        if (node.callee.name === 'require') {
          var args = node.arguments
          if (args.length > 0 && (args[0].type !== 'Literal' && args[0].type !== 'TemplateLiteral')) {
            context.report({
              node: node,
              messageId: 'avoidNonLiteral',
              loc: {
                start: args[0].loc.start,
                end: args[0].loc.end
              }
            })
          }
        }
      }
    }
  }
}
