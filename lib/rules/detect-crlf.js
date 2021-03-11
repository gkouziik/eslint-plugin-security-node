/**
 * @fileoverview detect log forging attack
 * @author Gkouziik
 */
'use strict'
const { getDocsUrl } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'Detect console.log() with non Literal argument'
    },
    docs: {
      description: 'detect log forging attack ',
      category: 'Possible Errors',
      recommended: false,
      url: getDocsUrl('detect-crlf')
    },
    fixable: null
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        if (node.callee.type === 'MemberExpression' && node.callee.hasOwnProperty('object')) {
          if (node.callee.object.name === 'console') {
            if (node.callee.hasOwnProperty('property') && node.callee.property.name === 'log') {
              if (node.arguments.length > 0) {
                var flag = false
                var start
                var end
                for (var i in node.arguments) {
                  if (node.arguments[i].type !== 'Literal') {
                    flag = true
                    start = node.arguments[i].loc.start
                    end = node.arguments[i].loc.end
                    break
                  }
                }
                // eslint-disable-next-line eqeqeq
                if (flag == true) {
                  context.report({
                    node: node,
                    messageId: 'msg',
                    loc: {
                      start: start,
                      end: end
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
