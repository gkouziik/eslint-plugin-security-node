/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/**
 * @fileoverview detect instances of child_process.exec with or without string concatenation and shell:true option in chil_process functions
 * @author gkouziik
 */
'use strict'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'detect instances of child_process.exec with or without string concatenation and shell:true option in chil_process functions',
      category: 'Fill me in',
      recommended: true
    },
    fixable: null, // or "code" or "whitespace"c
    schema: [
      // fill in your schema
    ]
  },

  create: function (context) {
    var sourceCode = context.getSourceCode();

    return {
      'Program': function (node) {
      },
      'CallExpression': function (node) {
        // check if we have a child_process call
        const childProcess = isChildProcessCall(node)
        // eslint-disable-next-line no-useless-return
        const tokens = sourceCode.getTokens(node)
        // eslint-disable-next-line no-useless-return
        if (!childProcess) return
        else {
          // check if we have exec property
          const propertyName = node.callee.property.name
          if (propertyName === 'exec') {
            // we have exec
            const args = node.arguments[0]
            if (args.type !== 'Literal') {
              const position = findPositionOfToken(tokens);
              return context.report({
            	node: node,
                message: 'Found child_process.exec() with non Literal first argument',
                loc: position
              })
            }
          } else if (propertyName === 'execFile' || propertyName === 'spawn') {
            const position = findPositionOfToken(tokens);
            const args = node.arguments
            console.log(args)
            for (var i in args) {
            	if (args[i].type === 'ObjectExpression') {
                var properties = args[i].properties
                for (var j in properties) {
                  	// eslint-disable-next-line eqeqeq
                  	if (properties[j].key.name === 'shell' && properties[j].value.value == true) {
                    		return context.report({
                            	node: node,
                      message: 'Found child_process.execFile or child_process.spawn() with option shell:true',
                      loc: position
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

function isChildProcessCall (node) {
  	if (node.callee.type === 'MemberExpression' && node.callee.object.name === 'child_process') {
    return true
  } else return false
}

function findPositionOfToken (tokens) {
  for (var i in tokens) {
    	if (tokens[i].value === 'exec') {
      i++
      i++
      return tokens[i].loc
    } else if (tokens[i].value === 'shell') {
        	return tokens[i].loc
    }
  }
}
