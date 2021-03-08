/**
 * @fileoverview detect instances of child_process.exec with or without string concatenation and shell:true option in chil_process functions
 * @author gkouziik
 */
'use strict'
const { getDocsUrl } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      avoidNonLiteral: 'Found require with non-literal argument'
    },
    docs: {
      description: 'Non literal require calls may cause an attack',
      category: 'Possible Errors',
      recommended: true,
      url: getDocsUrl('detect-non-literal-require-calls')
    },
    fixable: null
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        if (node.callee.name === 'require') {
          var args = node.arguments
          if (args.length > 0 && (args[0].type !== 'Literal' && args[0].type !== 'TemplateLiteral')) {
            if (args[0].type === 'BinaryExpression') {
              if (args[0].hasOwnProperty('left') && args[0].hasOwnProperty('right')) {
                if (args[0].left.type === 'Identifier' && (args[0].right.type === 'Literal' || args[0].right.type === 'TemplateLiteral')) {
                  if (args[0].left.name !== '__dirname') {
                    context.report({
                      node: node,
                      messageId: 'avoidNonLiteral',
                      loc: {
                        start: args[0].loc.start,
                        end: args[0].loc.end
                      }
                    })
                  }
                } else {
                  context.report({
                    node: node,
                    messageId: 'avoidNonLiteral',
                    start: args[0].loc.start,
                    end: args[0].loc.end
                  })
                }
              }
            } else {
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
}
