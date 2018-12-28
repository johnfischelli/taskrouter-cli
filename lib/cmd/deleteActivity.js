const twilio = require('twilio');
const clientUtil = require('../util/client');
const selectedWorkspace = require('../util/selectedWorkspace');

module.exports = async (activityName) => {
  const client = clientUtil.getConfiguredClient();
  const workspaceSid = selectedWorkspace.get('selectedWorkspace');
  let activitySid = null;

  client.taskrouter.workspaces(workspaceSid).activities.each({
    friendlyName: activityName
  }, activity => {
    client.taskrouter.workspaces(workspaceSid)
     .activities(activity.sid)
     .remove()
     .then(deletedActivity => console.log("Successfully deleted activity: "+ activity.friendlyName+"."))
     .done();
  });
};