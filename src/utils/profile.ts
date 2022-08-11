import os from "os";
import fs from "fs/promises";
import { AWSProfile } from "./types";

export class AwsProfile {
  private awsDir: string;
  private profiles: any;

  constructor(private profile: AWSProfile) {
    this.awsDir = "";
    this.profiles = {};
  }

  async createProfile() {
    await this.createAWSDirIfNotExists();
    await this.readProfilesFromDisk();

    if (this.isProfileExists(this.profile.profileName)) {
      return;
    }

    await this.createCredentialsProfile();
    await this.addAWSCredentialsToProfile();
  }

  private async createAWSDirIfNotExists(): Promise<void> {
    this.awsDir = os.homedir() + "/.aws";

    try {
      await fs.mkdir(this.awsDir);
    } catch (_) {}
  }

  private async readProfilesFromDisk(): Promise<void> {
    const filePath = this.awsDir + "/profiles.json";

    try {
      const content = await fs.readFile(filePath);
      this.profiles = JSON.parse(content.toString());
    } catch (err) {
      await fs.writeFile(filePath, JSON.stringify({}));
      this.profiles = {};
    }
  }

  private isProfileExists(profileName: string): boolean {
    if (this.profiles[profileName]) return true;
    return false;
  }

  private async createCredentialsProfile() {
    const { profileName, awsAccessKey, awsSecretKey } = this.profile;

    const credentialsFilePath = this.awsDir + "/credentials";
    const profileContent = `
        [${profileName}]
        aws_access_key_id=${awsAccessKey}
        aws_secret_access_key=${awsSecretKey}
    `;

    try {
      await fs.appendFile(credentialsFilePath, profileContent);
    } catch (err) {
      throw err;
    }
  }

  private async addAWSCredentialsToProfile(): Promise<void> {
    const filePath = this.awsDir + "/profiles.json";

    try {
      const content = await fs.readFile(filePath);
      let profiles = JSON.parse(content.toString());

      profiles = { ...profiles, [this.profile.profileName]: this.profile };
      console.log("profiles: ", profiles);
      await fs.writeFile(filePath, JSON.stringify(profiles));
    } catch (err) {
      throw err;
    }
  }
}
