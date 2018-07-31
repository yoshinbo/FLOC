const crypto = require('crypto');
const secp256k1 = require('secp256k1');
const BN = require('bn.js');

var secretKey;
do {
  secretKey = crypto.randomBytes(32);
} while (!secp256k1.privateKeyVerify(secretKey))


var secretKeyBuffer = Buffer.from(secretKey, 'hex');
console.log(secretKeyBuffer);

let publicKeyCompressed = secp256k1.publicKeyCreate(secretKeyBuffer);
// compleressdとuncompressedの違いはx座標だけでなくy座標も含まれているどうか。
// 実際にはx座標をpubkeyとするのでy座標はいらない
let publicKeyUncompressed = secp256k1.publicKeyCreate(secretKeyBuffer, false);
let x = new BN(publicKeyUncompressed.slice(1, 33).toString('hex'), 16);
let y = new BN(publicKeyUncompressed.slice(34, 65).toString('hex'), 16);

console.log(publicKeyCompressed.toString('hex'));
console.log(publicKeyUncompressed.toString('hex'));
console.log(x.toString(10));
console.log(y.toString(10));

