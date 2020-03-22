/**
 * @fileoverview Rule to convert lodash map function to native JS
 * @author Egor_B
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",
        fixable: "code",
        schema: [], // no options
        messages: {
            usingLodash: "Using Lodash map function",
            changeToIf: "Change lodash function with if clause.",
            changeToTernary: "Change lodash function with ternary operator."
        }
    },
    create: function(context) {
        console.log('Launch rule');
        return {
            "CallExpression": (node) => {
                const {callee: {object, property}} = node;
                if (object.name === '_' && property.name === 'map') {
                    context.report({
                        node: node,
                        messageId: "usingLodash",
                        suggest: [
                            {
                                messageId: "changeToIf",
                                fix: function(fixer) {
                                    return fixer.replaceText(node, ";");
                                }
                            },
                            {
                                messageId: "changeToTernary",
                                fix: function(fixer) {
                                    return fixer.replaceText(node, ";");
                                }
                            }
                        ]
                    });
                }
            }
        };
    }
};