const twilio = require('twilio');
const clientUtil = require('../util/client');
const selectedWorkspace = require('../util/selectedWorkspace');

module.exports = async (workerName) => {
  const client = clientUtil.getConfiguredClient();
  const workspaceSid = selectedWorkspace.get('selectedWorkspace');
  let workerSid = null;

  client.taskrouter.workspaces(workspaceSid).workers.each({
    friendlyName: workerName
  }, worker => {
    client.taskrouter.workspaces(workspaceSid)
     .workers(worker.sid)
     .remove()
     .then(deletedWorker => console.log("Successfully deleted worker: "+ worker.friendlyName+"."))
     .done();
  });
};