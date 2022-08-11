const profile = require("./utils/profile");

async function main() {
  await profile.saveProfileCredentials({ profileName: "default" });
}

main();
