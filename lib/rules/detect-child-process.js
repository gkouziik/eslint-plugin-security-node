/**
 * @fileoverview detect option mulitpleStatements:true in createConnection method of mysql
 * @author Gkouziik
 */

'use strict'
const { getDocsUrl } = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    messages:
      {
        msgExec: 'detect exec of child_process with non Literal argument',
        msgShell: 'detect option shell:true in execFile or spawn of child_process'
      },
    docs: {
      description: 'detect exec with non Literal argument',
      category: 'possible errors',
      recommended: true,
      url: getDocsUrl('detect-child-process')
    },
    fixable: null
  },

  create: function (context) {
    var childProcessVar

    return {
      'VariableDeclaration': function (node) {
        if (node.declarations.length > 0) {
          if (node.declarations[0].init != null) {
            if (node.declarations[0].hasOwnProperty('init')) {
              if (node.declarations[0].init.hasOwnProperty('callee')) {
                if (node.declarations[0].init.callee.hasOwnProperty('name')) {
                  if (node.declarations[0].init.callee.name === 'require' &&
          node.declarations[0].init.arguments[0].type === 'Literal' &&
          node.declarations[0].init.arguments[0].value === 'child_process') {
                    childProcessVar = node.declarations[0].id.name
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
          var nodeType = node.callee.type
          if (nodeType === 'MemberExpression') {
            var objectName = node.callee.object.name
            var propertyName = node.callee.property.name
            if (objectName != undefined) {
              if ((objectName === childProcessVar || objectName === 'child_process') && propertyName === 'exec') {
                var nodeArgs = node.arguments
                if (nodeArgs.length > 0) {
                  if (nodeArgs[0].type !== 'Literal') {
                    context.report({
                      node: node,
                      messageId: 'msgExec',
                      loc: {
                        start: nodeArgs[0].loc.start,
                        end: nodeArgs[0].loc.end
                      }
                    })
                  }
                }
              } else if ((objectName === childProcessVar || objectName === 'child_process') && (propertyName === 'execFile' || propertyName === 'spawn')) {
                if (node.arguments.length > 0) {
                  for (var i in node.arguments) {
                    var nodeArgsType = node.arguments[i].type
                    if (nodeArgsType === 'ObjectExpression') {
                      var objectProperties = node.arguments[i].properties
                      for (var j in objectProperties) {
                        if (objectProperties[j].hasOwnProperty('key') && objectProperties[j].hasOwnProperty('value')) {
                          var propertiesName = objectProperties[j].key.name
                          var propertiesValue = objectProperties[j].value.raw
                          if (propertiesName === 'shell' && propertiesValue === 'true') {
                            context.report({
                              node: node,
                              messageId: 'msgShell',
                              loc: {
                                start: node.arguments[i].loc.start,
                                end: node.arguments[i].loc.end
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
      }
    }
  }
}
