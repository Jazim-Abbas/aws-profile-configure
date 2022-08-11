const os = require("os");
const fs = require("fs/promises");

module.exports = {
  getAWSDir: async () => {
    const awsDirPath = os.homedir() + "/.aws";

    try {
      await fs.mkdir(awsDirPath);
    } catch (_) {
    } finally {
      return awsDirPath;
    }
  },
};
