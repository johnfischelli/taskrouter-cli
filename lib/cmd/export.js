const clientUtil = require('../util/client');
const selectedWorkspace = require('../util/selectedWorkspace');

module.exports = function() {
  const client = clientUtil.getConfiguredClient();
  const workspaceSid = selectedWorkspace.get('selectedWorkspace');

  client.taskrouter.workspaces(workspaceSid).fetch()
    .then(workspace => {
      console.log(JSON.stringify(workspace, null, 2))
    }).done();
};