const _ = require('lodash');
const clientUtil = require('../util/client');
const selectedWorkspace = require('../util/selectedWorkspace');

module.exports = async function() {
  const client = clientUtil.getConfiguredClient();
  const workspaceSid = selectedWorkspace.get('selectedWorkspace');

  let exportData = {
    'workspace': {},
    'taskQueues': [],
    'workers': [],
    'activities': [],
    'workflows': []
  };

  await client.taskrouter.workspaces(workspaceSid).fetch().then(workspace => {
    workspace = _.pick(workspace, [
      'accountSid', 'defaultActivityName', 'defaultActivitySid', 'eventCallbackUrl', 'eventsFilter',
      'multiTaskEnabled', 'timeoutActivityName', 'timeoutActivitySid', 'prioritizeQueueOrder'
    ]);
    exportData.workspace = workspace;
  });

  await client.taskrouter.workspaces(workspaceSid).taskQueues.list().then((taskQueues) => {
    for (var i = taskQueues.length - 1; i >= 0; i--) {
      exportData.taskQueues.push(_.pick(taskQueues[i], [
        'assignmentActivityName', 'friendlyName', 'maxReservedWorkers', 'reservationActivityName',
        'targetWorkers', 'taskOrder'
      ]));
    }
  });

  await client.taskrouter.workspaces(workspaceSid).workers.list().then((workers) => {
    for (var i = workers.length - 1; i >= 0; i--) {
      exportData.workers.push(_.pick(workers[i], [
        'friendlyName', 'attributes'
      ]));
    }
  });

  await client.taskrouter.workspaces(workspaceSid).activities.list().then((activities) => {
    for (var i = activities.length - 1; i >= 0; i--) {
      exportData.activities.push(_.pick(activities[i], [
        'friendlyName', 'available'
      ]));
    }
  });

  await client.taskrouter.workspaces(workspaceSid).workflows.list().then((workflows) => {
    for (var i = workflows.length - 1; i >= 0; i--) {
      exportData.workflows.push(_.pick(workflows[i], [
        'assignmentCallbackUrl', 'configuration', 'fallbackAssignmentCallbackUrl', 'friendlyName', 'taskReservationTimeout'
      ]));
    }
  });

  console.log(JSON.stringify(exportData, null, 2));
};