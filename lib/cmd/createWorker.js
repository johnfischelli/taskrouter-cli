const twilio = require('twilio');
const clientUtil = require('../util/client');
const selectedWorkspace = require('../util/selectedWorkspace');

module.exports = async (workerName) => {
  const client = clientUtil.getConfiguredClient();
  const workspaceSid = selectedWorkspace.get('selectedWorkspace');

  client.taskrouter.workspaces(workspaceSid).workers.create({
    friendlyName: workerName
  })
  .then(worker => {
    console.log('Successfully created '+worker.friendlyName+'.');
  })
  .done();
};