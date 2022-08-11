const profile = require("./utils/profile");

async function main() {
  try {
    await profile.saveProfileCredentials({
      profileName: "default",
      awsAccessKey: "AKIAIOSFODNN7EXAMPLE",
      awsSecretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    });
  } catch (err) {
    console.log("Error: ", err);
  }
}

main();
