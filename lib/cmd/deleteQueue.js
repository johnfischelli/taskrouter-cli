const twilio = require('twilio');
const clientUtil = require('../util/client');
const selectedWorkspace = require('../util/selectedWorkspace');

module.exports = async (queueName) => {
  const client = clientUtil.getConfiguredClient();
  const workspaceSid = selectedWorkspace.get('selectedWorkspace');
  let queueSid = null;

  client.taskrouter.workspaces(workspaceSid).taskQueues.each({
    friendlyName: queueName
  }, task_queue => {
    client.taskrouter.workspaces(workspaceSid)
     .taskQueues(task_queue.sid)
     .remove()
     .then(deletedTaskQueue => console.log("Successfully deleted queue: "+ task_queue.friendlyName+"."))
     .done();
  });
};