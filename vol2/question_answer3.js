const base58 = require('bs58');
const base58check = require('bs58check');

const DATA = "FLOC"; 

console.log(base58.encode(Buffer.from(DATA, 'utf8')));
console.log(base58check.encode(Buffer.from(DATA, 'utf8')));
