const fs = require("fs/promises");
const dir = require("./aws-dir");

module.exports = {
  /**
   * @param {{
   *   profileName: string
   *   awsSecretKey: string
   *   awsAccessKey: string
   * }} params
   */
  saveProfileCredentials: async (params) => {
    const { profileName, awsSecretKey, awsAccessKey } = params;

    const awsDir = await dir.getAWSDir();
    const isProfileFound = await isProfileExists({ profileName, awsDirPath: awsDir });

    console.log("is profile exists: ", isProfileFound);
  },
};

/**
 * @param {{
 *  profileName: string
 *  awsDirPath: string
 * }} params
 */
async function isProfileExists(params) {
  const { profileName, awsDirPath } = params;

  let isProfileFound = false;
  const filePath = awsDirPath + "/profiles.json";

  try {
    const content = await fs.readFile(filePath);
    const parsedContent = JSON.parse(content.toString());
    isProfileFound = parsedContent && parsedContent[profileName] !== null;
  } catch (err) {
    isProfileFound = false;
  } finally {
    return isProfileFound;
  }
}
