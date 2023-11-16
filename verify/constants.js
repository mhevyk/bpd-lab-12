const path = require("path");

const PRIVATE_KEY_PATH = path.resolve(__dirname, "private", "privateKey.pem");
const PUBLIC_KEY_PATH = path.resolve(__dirname, "publicKey.pem");
const INSTALLER_PATH = path.resolve(__dirname, "..", "server", "server.js");
const INSTALLER_SIGNATURE_PATH = path.resolve(__dirname, "installerSignature");

module.exports = {
  PRIVATE_KEY_PATH,
  PUBLIC_KEY_PATH,
  INSTALLER_PATH,
  INSTALLER_SIGNATURE_PATH,
};
