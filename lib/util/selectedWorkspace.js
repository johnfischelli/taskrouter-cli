const fs   = require('fs');
const path = require('path');
const os   = require('os');
const file = require('./file');

const filePath = path.resolve(os.homedir(), '.twilio/taskrouter');
const fileName = 'selectedWorkspace.json';
const fullPath = path.join(filePath, fileName);

module.exports = {
  save : async (data) => {
    // ensure directory exists
    file.ensureDirExists(filePath, 0744, function(err) {
      if (err)
        console.log(err);
    });

    if (!file.ensureFileExists(fullPath)) {
      // trick to simply create a file that doesn't exist
      await fs.closeSync(await fs.openSync(fullPath, 'wx'));
    }

    // actually write to the file
    await fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
    return true;
  },

  get : (property) => {
    let data = JSON.parse(fs.readFileSync(fullPath));
    if (data.hasOwnProperty(property)) {
      return data[property];
    }
    return null;
  }
};
