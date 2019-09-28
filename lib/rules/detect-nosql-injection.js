/**
 * @fileoverview detect NOsql injection
 * @author Gkouziik
 */

'use strict'

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'detect $where'
    },
    docs: {
      description: 'detect NOsql injection',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: null

  },

  create: function (context) {
    return {
      'Identifier': function (node) {
        if (node.name === '$where') {
          context.report({
            node: node,
            messageId: 'msg'
          })
        }
      }
    }
  }
}
