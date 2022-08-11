import { AwsProfile } from "./utils/profile";

async function main() {
  const profile = new AwsProfile({
    profileName: "default",
    awsAccessKey: "AKIAIOSFODNN7EXAMPLE",
    awsSecretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    region: "us-east-1",
    output: "json",
  });

  try {
    await profile.createProfile();
  } catch (err) {
    console.log("Error: ", err);
  }
}

main();
