const twilio = require('twilio');
const clientUtil = require('../util/client');
const selectedWorkspace = require('../util/selectedWorkspace');

module.exports = async (queueName, options) => {
  const client = clientUtil.getConfiguredClient();
  const workspaceSid = selectedWorkspace.get('selectedWorkspace');
  let targetWorkerExpression = "1==1";

  if (options.hasOwnProperty('targetWorkerExpression')) {
    targetWorkerExpression = options.targetWorkerExpression;
  }

  client.taskrouter.workspaces(workspaceSid).taskQueues.create({
     targetWorkers: targetWorkerExpression,
     friendlyName: queueName
   })
  .then(task_queue => {
    console.log('Successfully created '+task_queue.friendlyName+'.');
  })
  .done();
};