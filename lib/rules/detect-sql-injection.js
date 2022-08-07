/**
 * @fileoverview detect SQL injection
 * @author Gkouziik
 */
'use strict'
const { getDocsUrl } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'detect possible SQL injection'
    },
    docs: {
      description: 'detect SQL injection',
      category: 'Possible Errors',
      recommended: false,
      url: getDocsUrl('detect-sql-injection')
    },
    fixable: null,
    schema: [
      {
        "type": "object",
        "properties": {
          "objectNames": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "minItems": 1,
            "uniqueItems": true
          },
          "methodNames": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "minItems": 1,
            "uniqueItems": true
          }
        },
        "additionalProperties": false
      }
    ]
  },

  create: function (context) {
    var objectNames = (context.options[0] ? context.options[0].objectNames : null) || ['connection', 'connect', 'conn'];
    var checkThis = objectNames.indexOf("this") !== -1;
    var methodNames = (context.options[0] ? context.options[0].methodNames : null) || ['query'];
    return {
      'CallExpression': function (node) {
        if (node.callee.type === 'MemberExpression') {
          if (node.callee.hasOwnProperty('object')) {
            var objectName = node.callee.object.name
            var objectType = node.callee.object.type
            if (objectNames.indexOf(objectName) !== -1 || (checkThis && objectType === "ThisExpression")) {
              if (node.callee.hasOwnProperty('property')) {
                var propertyName = node.callee.property.name
                if (methodNames.indexOf(propertyName) !== -1) {
                  if (node.arguments[0].type !== 'Literal' && (node.arguments[0].type !== 'TemplateLiteral' || node.arguments[0].expressions.length)) {
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
}
