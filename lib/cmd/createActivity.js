const twilio = require('twilio');
const clientUtil = require('../util/client');
const selectedWorkspace = require('../util/selectedWorkspace');

module.exports = async (activityName, options) => {
  const client = clientUtil.getConfiguredClient();
  const workspaceSid = selectedWorkspace.get('selectedWorkspace');
  let availability = false;

  if (options.hasOwnProperty('availability')) {
    availability = options.availability;
  }

  client.taskrouter.workspaces(workspaceSid).activities.create({
     available: availability,
     friendlyName: activityName
   })
  .then(activity => {
    console.log('Successfully created activity: '+activity.friendlyName+'.');
  })
  .done();
};