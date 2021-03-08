/**
 * @fileoverview detect NOsql injection
 * @author Gkouziik
 */

'use strict'
const { getDocsUrl } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'detect $where'
    },
    docs: {
      description: 'detect NOsql injection',
      category: 'Possible Errors',
      recommended: true,
      url: getDocsUrl('detect-nosql-injection')
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
