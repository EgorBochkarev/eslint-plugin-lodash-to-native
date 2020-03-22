"use strict";

const rule = require("../../../lib/rules/map"),
    RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

const error = [{ message: "Using Lodash map function"}];

ruleTester.run("map", rule, {
    valid: [
        {
            code: 
                `var a = [ 1, 2, 3];
                a.map(fn);`
        }
    ],

    invalid: [
        {
            code: 
                `var a = [ 1, 2, 3];
                var b = _.map(a, fn);`,
            errors: error
        },
        {
            code: 
                `var fnc = function(){
                    var a = [ 1, 2, 3];
                    return _.map(a, fn);
                }`,
            errors: error
        },
        {
            code: 
                `var a = [1, 2, 3];
                [1, 2, 3, 4].concat(_.map(a, fn))`,
            errors: error
        }
    ]
});