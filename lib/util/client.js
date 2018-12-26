const twilio = require('twilio');
const fs = require('fs');
const path = require('path');
const file = require('./file');
const _ = require('lodash');
const os   = require('os');

const filePath = path.resolve(os.homedir(), '.twilio/taskrouter');
const fileName = 'selectedWorkspace.json';
const configPath = path.resolve(os.homedir(), '.twilio/config.json');

module.exports = {
  getConfiguredClient: () => {
    try {
      if (file.ensureFileExists(configPath)) {
        let config = module.exports.getDefaultConfig();
        return new twilio(config.accountSID, config.authToken);
      }
    } catch (err) {
      throw err;
    }
  },

  getDefaultConfig: () => {
    // load existing config
    let allConfig = JSON.parse(fs.readFileSync(configPath));

    // search out default config
    return _.first(_.filter(allConfig, (config) => {
      return config['profileName'] === "default";
    }));
  }
};
