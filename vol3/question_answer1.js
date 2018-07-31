const crypto = require('crypto');
const secp256k1 = require('secp256k1');

var secretKey;
do {
  secretKey = crypto.randomBytes(32);
} while (!secp256k1.privateKeyVerify(secretKey))

console.log(secretKey.toString('hex'));
