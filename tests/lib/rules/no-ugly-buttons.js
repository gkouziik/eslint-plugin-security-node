/**
 * @fileoverview Buttons must have some styling
 * @author gkouziik
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-ugly-buttons"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-ugly-buttons", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "<button><button>",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
