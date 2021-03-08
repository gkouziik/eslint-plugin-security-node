/**
 * @fileoverview detect option rejectUnauthorized:false in Nodejs https request method
 * @author Gkouziik
 */
'use strict'
const { getDocsUrl } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'detect option rejectUnauthorized:true'
    },
    docs: {
      description: 'detect option rejectUnauthorized:false in Nodejs https request method',
      category: 'possible errors',
      recommended: true,
      url: getDocsUrl('detect-option-rejectunauthorized-in-nodejs-httpsrequest')
    },
    fixable: null
  },

  create: function (context) {
    var httpsVar
    return {
      'VariableDeclaration': function (node) {
        if (node.declarations.length > 0) {
          if (node.declarations[0].init != null) {
            if (node.declarations[0].hasOwnProperty('init')) {
              if (node.declarations[0].init.hasOwnProperty('callee')) {
                if (node.declarations[0].init.callee.hasOwnProperty('name')) {
                  if (node.declarations[0].init.callee.name === 'require' &&
          node.declarations[0].init.arguments[0].type === 'Literal' &&
          node.declarations[0].init.arguments[0].value === 'https') {
                    httpsVar = node.declarations[0].id.name
                  }
                }
              }
            }
          }
        }
      },
      'CallExpression': function (node) {
        var nodeCallee = node.callee
        if (nodeCallee.hasOwnProperty('object') && nodeCallee.hasOwnProperty('property')) {
          var nodeCalleeType = node.callee.type
          if (nodeCalleeType === 'MemberExpression') {
            var nodeObjectName = node.callee.object.name
            var nodePropertyName = node.callee.property.name
            if ((nodeObjectName === httpsVar || nodeObjectName === 'https') && nodePropertyName === 'request') {
              var nodeArgs = node.arguments
              if (nodeArgs.length > 0 && nodeArgs[0].type === 'ObjectExpression') {
                if (nodeArgs[0].hasOwnProperty('properties')) {
                  var found = false
                  var nodeProps = nodeArgs[0].properties
                  for (var i in nodeProps) {
                    if (nodeProps[i].hasOwnProperty('key') && nodeProps[i].hasOwnProperty('value')) {
                      var keyName = nodeProps[i].key.name
                      var valueRaw = nodeProps[i].value.raw
                      if (keyName === 'rejectUnauthorized' && valueRaw === 'true') {
                        found = true
                        break
                      }
                    }
                  }
                  if (found == true) {
                    context.report({
                      node: node,
                      messageId: 'msg',
                      loc: {
                        start: nodeArgs[0].loc.start,
                        end: nodeArgs[0].loc.end
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
