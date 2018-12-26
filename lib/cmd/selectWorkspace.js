const twilio = require('twilio');
const inquirer = require('inquirer');
const _ = require('lodash');

const selectedWorkspace = require('../util/selectedWorkspace');
const clientUtil = require('../util/client');

module.exports = async () => {
  const client = clientUtil.getConfiguredClient();

  let choices = [];
  let workspaces = await client.taskrouter.workspaces.list()
    .then((workspaces) => {
      return workspaces;
    });

  _.each(workspaces, (workspace) => {
    choices.push({
      'name': workspace.friendlyName,
      'value': workspace.sid
    });
  });

  inquirer.prompt([
    {
      'type': 'list',
      'message': 'Please select a workspace to work in.',
      'choices': choices,
      'name': 'selectedWorkspace'
    }
  ])
  .then(answers => {
    let filteredChoice = _.first(_.filter(choices, (choice) => {
      return choice.value == answers.selectedWorkspace;
    }));

    answers.selectedWorkspaceFriendlyName = filteredChoice.name;

    selectedWorkspace.save(answers);
    console.log('Success! '+filteredChoice.name+' has been selected');
  });
};