"use strict";

const rule = require("../../../lib/rules/map"),
    RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

const createError = (ifOutput, ternatyOutput) => {
    return [{
        messageId: "usingLodash",
        suggestions: [{
            messageId: "changeToIf",
            output: ifOutput
        }, {
            messageId: "changeToTernary",
            output: ternatyOutput
        }]
    }]
}

ruleTester.run("map", rule, {
    valid: [
        {
            code: `var test = [ 1, 2, 3]; a.map(fn);`
        },
        {
            code: `map(fn);`
        },
        {
            code: `map();`
        },
        {
            code: `_ = { map: function(){ return []; } }; var b = _.map(a, fn);`
        },
        {
            code: `_.map({a: 1, b: 2}, fn)`
        }
    ],

    invalid: [
        {
            code: `var a = [ 1, 2, 3]; var b = _.map(a, fn);`,
            errors: createError(
                `var a = [ 1, 2, 3]; var b; if (Array.isArray(a)){ b = a.map(fn); } else { b = _.map(a, fn); }`, 
                `var a = [ 1, 2, 3]; var b = Array.isArray(a) ? a.map(fn) : _.map(a, fn);`
            )
        },
        {
            code: `var b = _.map(a, function(test){return test});`,
            errors: createError(
                `var b; if (Array.isArray(a)){ b = a.map(function(test){return test}); } else { b = _.map(a, function(test){return test}); }`,
                `var b = Array.isArray(a) ? a.map(function(test){return test}) : _.map(a, function(test){return test});`
            )
        },
        {
            code: `var b = _.map([1, 2, 3], fn);`,
            errors: [{
                messageId: "usingLodash",
                suggestions: [{
                    messageId: "changeToNative",
                    output: `var b = [1, 2, 3].map(fn);`
                }]
            }]
        },
        {
            code: `var fnc = function(){ var a = [ 1, 2, 3]; return _.map(a, fn); }`,
            errors: createError(
                `var fnc = function(){ var a = [ 1, 2, 3]; if (Array.isArray(a)){ return a.map(fn); } else { return _.map(a, fn); } }`,
                `var fnc = function(){ var a = [ 1, 2, 3]; return Array.isArray(a) ? a.map(fn) : _.map(a, fn); }`
            )
        },
        {
            code: `var a = [1, 2, 3]; var b = [1, 2, 3, 4].concat(_.map(a, fn))`,
            errors: [{
                messageId: "usingLodash",
                suggestions: [{
                    messageId: "changeToTernary",
                    output: `var a = [1, 2, 3]; var b = [1, 2, 3, 4].concat(Array.isArray(a) ? a.map(fn) : _.map(a, fn))`
                }]
            }]
        }
    ]
});