const crypto = require('crypto');
const base58check = require('bs58check');

function sha256(data) {
  return crypto.createHash("sha256").update(data).digest();
}

function ripemd160(data) {
  return crypto.createHash("ripemd160").update(data).digest();
}

const DATA = "FLOC"; 
const PUBKEY = Buffer.from(DATA, 'utf8');
const VERSION = Buffer.from('00', 'hex');

const PUBKEY_HASH = ripemd160(sha256(PUBKEY));

const ADDRESS = base58check.encode(Buffer.concat([VERSION, PUBKEY_HASH]));

console.log(ADDRESS);
