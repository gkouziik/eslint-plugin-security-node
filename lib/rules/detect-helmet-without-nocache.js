/**
 * @fileoverview detect helmet() middleware without noCache()
 * @author Gkouziik
 */

'use strict'

module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      msg: 'found helmet middleware without noCache()'
    },
    docs: {
      description: 'detect helmet() middleware without noCache()',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: null

  },

  create: function (context) {
    var foundHelmet = false
    var foundCash = false
    var holdPosition
    return {
      'Program': function (node) {
        var bodyP = node.body
        for (var i in bodyP) {
          var nodeType = bodyP[i].type
          if (nodeType === 'ExpressionStatement') {
            if (bodyP[i].expression.hasOwnProperty('callee')) {
              var nodeCallee = bodyP[i].expression.callee
              if (nodeCallee.hasOwnProperty('object') && nodeCallee.hasOwnProperty('property')) {
                var objectName = nodeCallee.object.name
                var propertyName = nodeCallee.property.name
                if (objectName === 'app' && propertyName === 'use') {
                  var nodeArgs = bodyP[i].expression.arguments
                  if (nodeArgs.length > 0) {
                    if (nodeArgs[0].hasOwnProperty('callee')) {
                      if (nodeArgs[0].callee.name === 'helmet') {
                        foundHelmet = true
                        holdPosition = i
                        break
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (foundHelmet == true) {
          for (var j in bodyP) {
            var nodeTypeC = bodyP[j].type
            if (nodeTypeC === 'ExpressionStatement') {
              if (bodyP[j].expression.hasOwnProperty('callee')) {
                var nodeCalleeC = bodyP[j].expression.callee
                if (nodeCalleeC.hasOwnProperty('object') && nodeCalleeC.hasOwnProperty('property')) {
                  var objectNameC = nodeCalleeC.object.name
                  var propertyNameC = nodeCalleeC.property.name
                  if (objectNameC === 'app' && propertyNameC === 'use') {
                    var nodeArgsC = bodyP[j].expression.arguments
                    if (nodeArgsC.length > 0) {
                      if (nodeArgsC[0].hasOwnProperty('callee')) {
                        if (nodeArgsC[0].callee.hasOwnProperty('name')) {
                          if (nodeArgsC[0].callee.name === 'noCache') {
                            foundCash = true
                          }
                        } else if (nodeArgsC[0].callee.hasOwnProperty('object') && nodeArgsC[0].callee.hasOwnProperty('property')) {
                          if (nodeArgsC[0].callee.object.name === 'helmet' && nodeArgsC[0].callee.property.name === 'noCache') {
                            foundCash = true
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
        if (foundHelmet == true && foundCash == false) {
          context.report({
            node: node,
            messageId: 'msg',
            loc: {
              start: bodyP[holdPosition].loc.start,
              end: bodyP[holdPosition].loc.end
            }
          })
        }
      }
    }
  }
}
