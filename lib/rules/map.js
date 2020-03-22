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
            changeToTernary: "Change lodash function with ternary operator.",
            changeToNative: "Change lodash function."
        }
    },
    create: function(context) {
        let wasOverrided = false;
        return {
            'CallExpression[callee.object.name="_"][callee.property.name="map"]': (node) => {
                if (!wasOverrided) {
                    const source = context.getSourceCode();
                    const [collectionNode, fnNode] = node.arguments;
                    const collection = source.getText(collectionNode);
                    const fn = source.getText(fnNode);
                    const sugest = [];
                    if (collectionNode.type === "ObjectExpression") {
                        return;
                    }
                    if (collectionNode.type === 'ArrayExpression') {
                        sugest.push({
                            messageId: "changeToNative",
                            fix: function(fixer) {
                                return fixer.replaceText(node, `${collection}.map(${fn})`);
                            }
                        });
                    } else {
                        if (node.parent.type !== "CallExpression") {
                            sugest.push({
                                messageId: "changeToIf",
                                fix: function(fixer) {
                                    source;
                                    if (node.parent.type === "ReturnStatement"){
                                        return fixer.replaceText(node.parent, `if (Array.isArray(${collection})){ return ${collection}.map(${fn}); } else { return _.map(${collection}, ${fn}); }`);
                                    } else if (node.parent.type === "VariableDeclarator" && node.parent.parent.type === "VariableDeclaration"){
                                        const varName = node.parent.id.name;
                                        return fixer.replaceText(node.parent.parent, `${node.parent.parent.kind} ${varName}; if (Array.isArray(${collection})){ ${varName} = ${collection}.map(${fn}); } else { ${varName} = _.map(${collection}, ${fn}); }`);
                                    } else if (node.parent.type === "VariableDeclarator"){
                                        const varName = node.parent.id.name;
                                        return fixer.replaceText(node.parent, `if (Array.isArray(${collection})){ ${varName} = ${collection}.map(${fn}); } else { ${varName} = _.map(${collection}, ${fn}); }`);
                                    };
                                    return fixer.replaceText(node, ";");
                                }
                            });
                        }
                        sugest.push({
                            messageId: "changeToTernary",
                            fix: function(fixer) {
                                return fixer.replaceText(node, `Array.isArray(${collection}) ? ${collection}.map(${fn}) : _.map(${collection}, ${fn})`);
                            }
                        });
                    }
                    context.report({
                        node: node,
                        messageId: "usingLodash",
                        suggest: sugest
                    });
                }
            },
            'AssignmentExpression[operator="="][left.name="_"]': (node) => {
                wasOverrided = true;
            }
        };
    }
};