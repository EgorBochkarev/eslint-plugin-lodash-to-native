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
        schema: [] // no options
    },
    create: function(context) {
        console.log('Test:');
        console.log(context);
        return {

        };
    }
};