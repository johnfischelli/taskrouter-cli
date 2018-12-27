const twilio = require('twilio');
const clientUtil = require('../util/client');
const selectedWorkspace = require('../util/selectedWorkspace');

module.exports = async (queueName) => {
  const client = clientUtil.getConfiguredClient();
  const workspaceSid = selectedWorkspace.get('selectedWorkspace');

  client.taskrouter.workspaces(workspaceSid).taskQueues.create({
     targetWorkers: "1==1",
     friendlyName: queueName
   })
  .then(task_queue => {
    console.log('Successfully created '+task_queue.friendlyName+'.');
  })
  .done();
};