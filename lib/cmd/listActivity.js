const twilio = require('twilio');
const clientUtil = require('../util/client');
const selectedWorkspace = require('../util/selectedWorkspace');

module.exports = async () => {
  const client = clientUtil.getConfiguredClient();
  const workspaceSid = selectedWorkspace.get('selectedWorkspace');

  client.taskrouter.workspaces(workspaceSid).activities
  .each(activity => {
    console.log(activity.friendlyName+" - "+activity.sid+" - available: "+activity.available);
  });
};