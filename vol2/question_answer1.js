const crypto = require('crypto');

function sha1(data) {
  // digest()はbiteの配列、つまりBufferを返す関数
  return crypto.createHash("sha1").update(data).digest();
}

function sha256(data) {
  return crypto.createHash("sha256").update(data).digest();
}

function ripemd160(data) {
  return crypto.createHash("ripemd160").update(data).digest();
}

const DATA = "FLOC"; 
const RESULT = ripemd160(sha256(sha1(DATA)));

console.log(RESULT.toString('hex'));
