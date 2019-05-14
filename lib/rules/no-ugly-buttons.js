/**
 * @fileoverview Buttons must have some styling
 * @author gkouziik
 */
const ERROR_MSG_NOT_STYLED = 'Buttons must be styled with a btn class at least.'
module.exports = function (context) {
  return {
    JSXOpeningElement: function (node) {
      const nodeType = node.name.name
      if (nodeType !== 'button') {
        return
      }
      const legalClassNameAttributes = node.attributes.filter((attr) => {
        const isClassName = attr.type === 'JSXAttribute' && attr.name.name === 'className'
        return isClassName && (attr.value.type !== 'Literal' || attr.value.value.includes('btn'))
      })
      if (!legalClassNameAttributes.length) {
        context.report({
          node: node,
          message: ERROR_MSG_NOT_STYLED
        })
      }
    }
  }
}
// 'use strict'
//
// // ------------------------------------------------------------------------------
// // Rule Definition
// // ------------------------------------------------------------------------------
//
// module.exports = {
//   meta: {
//     docs: {
//       description: 'Buttons must have some styling',
//       category: 'Error',
//       recommended: false
//     },
//     fixable: null, // or "code" or "whitespace"
//     schema: [
//       // fill in your schema
//     ]
//   },
//
//   // create:function
//   create: function (context) {
//     // variables should be defined here
//
//     // ----------------------------------------------------------------------
//     // Helpers
//     // ----------------------------------------------------------------------
//
//     // any helper functions should go here or else delete this section
//
//     // ----------------------------------------------------------------------
//     // Public
//     // ----------------------------------------------------------------------
//
//     return {
//       JSXOpeningElement: function (node) {
//         const nodeType = node.name.name
//         if (nodeType !== 'button') {
//           return
//         }
//         const ERROR_MSG_NOT_STYLED = 'Buttons must be styled with a btn class at least.'
//         const legalClassNameAttributes = node.attributes.filter((attr) => {
//           const isClassName = attr.type === 'JSXAttribute' && attr.name.name === 'className'
//           return isClassName && (attr.value.type !== 'Literal' || attr.value.value.includes('btn'))
//         })
//         if (!legalClassNameAttributes.length) {
//           context.report({
//             node: node,
//             message: ERROR_MSG_NOT_STYLED
//           })
//         }
//       }
//       // give me methods
//
//     }
//   }
// }
