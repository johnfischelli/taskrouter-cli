const selectedWorkspace = require('../util/selectedWorkspace');

module.exports = async () => {
  console.log(selectedWorkspace.get('selectedWorkspaceFriendlyName'))
};