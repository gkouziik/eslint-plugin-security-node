/**
 * @fileoverview detect instances of child_process.exec with or without string concatenation and shell:true option in chil_process functions
 * @author gkouziik
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
const rule = require('../../../lib/rules/detect-child-process')
const RuleTester = require('eslint').RuleTester

// import rule from '../../../lib/rules/detect-child-process'
// import { RuleTester } from 'eslint'

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ERROR_MSG_EXEC = 'detect exec of child_process with non Literal argument'
const ERROR_MSG_EXECFILE_SPAWN = 'detect option shell:true in execFile or spawn of child_process'
var ruleTester = new RuleTester()
var validExec = 'child_process.exec("ls", function (err, data) {})'
var invalidExec = 'var path = "user input"; child_process.exec("ls -l" + path, function (err, data) {})'
var validExecFile = 'child_process.execFile("node",["--version"],{cwd:"..."},function(error,stdout,stderr){if(error){throw error}})'
var invalidExecFile = 'child_process.execFile("node",["--version"],{shell:true},function(error,stdout,stderr){if(error){throw error}})'
var validSpawn = 'child_process.spawn("ls-la",["--version"],{cwd:"..."})'
var invalidSpawn = 'child_process.spawn("ls-la",["--version"],{shell:true})'

ruleTester.run('detect-child-process', rule, {

  valid: [
    {
      code: validExec
    }
  ],

  invalid: [
    {
      code: invalidExec,
      errors: [{
        message: ERROR_MSG_EXEC
      }]
    }
  ]
})

ruleTester.run('detect-child-process', rule, {

  valid: [
    {
      code: validExecFile
    }
  ],

  invalid: [
    {
      code: invalidExecFile,
      errors: [{
        message: ERROR_MSG_EXECFILE_SPAWN
      }]
    }
  ]
})

ruleTester.run('detect-child-process', rule, {

  valid: [
    {
      code: validSpawn
    }
  ],

  invalid: [
    {
      code: invalidSpawn,
      errors: [{
        message: ERROR_MSG_EXECFILE_SPAWN
      }]
    }
  ]
})