const crypto = require('crypto');

const DATA = 'example data to be hashed';

function hash (algorithm, data, isHex) {
    return crypto.createHash(algorithm).update(data).digest(isHex ? 'hex' : null);
}

function doubleHash (algorithm1, algorithm2, data, isHex) {
    return hash(algorithm2, hash(algorithm1, data), isHex);
}

console.log('           sha1: ' + hash('sha1', DATA, true));
console.log('         sha256: ' + hash('sha256', DATA, true));
console.log('         sha512: ' + hash('sha512', DATA, true));
console.log('   sha256sha256: ' + doubleHash('sha256', 'sha256', DATA, true));
console.log('      ripemd160: ' + hash('ripemd160', DATA, true));
console.log('sha256ripemd160: ' + doubleHash('sha256', 'ripemd160', DATA, true));
