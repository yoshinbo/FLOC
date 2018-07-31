const crypto = require('crypto');
const secp256k1 = require('secp256k1');
const BN = require('bn.js');

var secretKey;
do {
  secretKey = crypto.randomBytes(32);
} while (!secp256k1.privateKeyVerify(secretKey))


var secretKeyBuffer = Buffer.from(secretKey, 'hex');

// -----------> 

const data = 'FLOC';
const dataHash = crypto.createHash('sha256').update(data).digest();


let signObj = secp256k1.sign(dataHash, secretKeyBuffer);
let signature = signObj.signature;
let r = new BN(signature.slice(0, 32).toString('hex'), 16);
let s = new BN(signature.slice(33, 64).toString('hex'), 16);

console.log(signature.toString('hex'));
console.log(r.toString(10));
console.log(s.toString(10));

