const fs = require("fs");
const crypto = require("crypto");
const {
  PRIVATE_KEY_PATH,
  INSTALLER_PATH,
  INSTALLER_SIGNATURE_PATH,
} = require("../constants");

const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");
const installerScript = fs.readFileSync(INSTALLER_PATH, "utf8");

const signer = crypto.createSign("sha256");
signer.update(installerScript);

const signature = signer.sign(privateKey, "hex");
fs.writeFileSync(INSTALLER_SIGNATURE_PATH, signature);
