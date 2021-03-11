/**
 * @fileoverview detect possible timing attacks
 * @author gkouziik
 */
'use strict'
const { getDocsUrl } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msgLeft: 'Potential timing attack, left side: {{identifier}}',
      msgRight: 'Potential timing attack, right side: {{identifier}}'
    },
    docs: {
      description: 'detect possible timing attacks',
      category: 'Possible Errors',
      recommended: true,
      url: getDocsUrl('detect-possible-timing-attacks')
    },
    fixable: null

  },

  create: function (context) {
    var keywords = '((' + [
      'password',
      'secret',
      'api',
      'apiKey',
      'token',
      'auth',
      'pass',
      'hash'
    ].join(')|(') + '))'

    var re = new RegExp('^' + keywords + '$', 'im')

    function containsKeyword (node) {
      if (node.type === 'Identifier') {
        if (re.test(node.name)) { return true }
      }
    }

    return {
      'IfStatement': function (node) {
        if (node.test && node.test.type === 'BinaryExpression') {
          if (node.test.operator === '==' || node.test.operator === '===' || node.test.operator === '!=' || node.test.operator === '!==') {
            if (node.test.left) {
              var left = containsKeyword(node.test.left)
              if (left) {
                return context.report({
                  node: node,
                  messageId: 'msgLeft',
                  data: {
                    identifier: node.test.left.name
                  }
                })
              }
            }

            if (node.test.right) {
              var right = containsKeyword(node.test.right)
              if (right) {
                return context.report({
                  node: node,
                  messageId: 'msgRight',
                  data: {
                    identifier: node.test.right.name
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
