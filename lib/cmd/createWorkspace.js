const twilio = require('twilio');
const clientUtil = require('../util/client');
const selectedWorkspace = require('../util/selectedWorkspace');

module.exports = async (workspaceName) => {
  const client = clientUtil.getConfiguredClient();

  client.taskrouter.workspaces.create({
    template: 'FIFO',
    friendlyName: workspaceName
  })
  .then(workspace => {
    selectedWorkspace.save({
      'selectedWorkspace': workspace.sid,
      'selectedWorkspaceFriendlyName': workspace.friendlyName
    });
    console.log('Successfully created workspace: '+workspace.friendlyName+'. It has been set as your selected workspace.');
  })
  .done();
};