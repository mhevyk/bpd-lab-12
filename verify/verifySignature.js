const crypto = require("crypto");
const fs = require("fs");
const {
  INSTALLER_SIGNATURE_PATH,
  INSTALLER_PATH,
  PUBLIC_KEY_PATH,
} = require("./constants");

const publicKey = fs.readFileSync(PUBLIC_KEY_PATH, "utf8");
const installerSignature = fs.readFileSync(INSTALLER_SIGNATURE_PATH, "utf8");

function verifySignature(data, signature) {
  const verifier = crypto.createVerify("sha256");
  verifier.update(data);
  return verifier.verify(publicKey, signature, "hex");
}

const installerScript = fs.readFileSync(INSTALLER_PATH, "utf8");

if (verifySignature(installerScript, installerSignature)) {
  console.log("Installer script is verified.");
  execInstallerScript();
} else {
  console.error("Invalid installer signature. Exiting.");
}

function execInstallerScript() {
  require("child_process").execSync(
    `SET INSTALLATION_PROCESS=processing&& node "${INSTALLER_PATH}"`,
    { stdio: "inherit" }
  );
}
