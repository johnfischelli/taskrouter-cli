#!/usr/bin/env node

/**
 * Module dependencies.
 */

const program = require('commander');
const selectWorkspace = require('../lib/cmd/selectWorkspace');
const displaySelectedWorkspace = require('../lib/cmd/displaySelectedWorkspace');
const createWorkspace = require('../lib/cmd/createWorkspace');
const createQueue = require('../lib/cmd/createQueue');
const deleteQueue = require('../lib/cmd/deleteQueue');
const createWorker = require('../lib/cmd/createWorker');
const deleteWorker = require('../lib/cmd/deleteWorker');
const exportCmd = require('../lib/cmd/export');

program.version('0.0.1');

program.command('selectWorkspace').alias('sws')
        .description('Lists workspaces and allows you to specify which workspace to select for other commands to be run against.')
        .action(function() {
          selectWorkspace();
        });

program.command('displaySelectedWorkspace').alias('dws')
        .description('Tells you which workspace is currently selected for commands to be run against.')
        .action(function() {
          displaySelectedWorkspace();
        });

program.command('createWorkspace [name]').alias('cws')
        .description('Creates a Workspace (assumes default profile)')
        .action(function(name) {
          createWorkspace(name);
        });

program.command('createQueue [name]').alias('cq')
        .description('Creates a Queue (assumes default profile, and selected workspace)')
        .action(function(name) {
          createQueue(name);
        });

program.command('deleteQueue [name]').alias('dq')
        .description('Deletes a Queue by friendly name (assumes default profile, and selected workspace)')
        .action(function(name) {
          deleteQueue(name);
        });

program.command('createWorker [name]').alias('cw')
        .description('Creates a Worker (assumes default profile, and selected workspace)')
        .action(function(name) {
          createWorker(name);
        });

program.command('deleteWorker [name]').alias('dw')
        .description('Deletes a Worker by friendly name (assumes default profile, and selected workspace)')
        .action(function(name) {
          deleteWorker(name);
        });

program.command('export')
        .description('Export an entire Workspace and all sub-resources')
        .action(function() {
          exportCmd();
        });

program.parse(process.argv);