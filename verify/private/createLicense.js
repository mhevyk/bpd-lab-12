const fs = require("fs");
const crypto = require("crypto");
const { PRIVATE_KEY_PATH, PUBLIC_KEY_PATH } = require("../constants");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

fs.writeFileSync(PRIVATE_KEY_PATH, privateKey);
fs.writeFileSync(PUBLIC_KEY_PATH, publicKey);
