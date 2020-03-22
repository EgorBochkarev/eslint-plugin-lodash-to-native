/**
 * @fileoverview Rules to convert lodash to native JS
 * @author Egor_B
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
const test = requireIndex(__dirname + "/lib/rules");
console.log(test);
module.exports.rules = requireIndex(__dirname + "/lib/rules");



// import processors
module.exports.processors = {

    // add your processors here
};