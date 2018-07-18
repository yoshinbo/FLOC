const crypto = require('crypto');

const DATA1 = 'example data to be hashed';
const DATA2 = 'example data to be hasher';
const DATA3 = 'ezample data to be hashed';
const DATA4 = 'example data to be hashed ';

function hash (algorithm, data, isHex) {
    return crypto.createHash(algorithm).update(data).digest(isHex ? 'hex' : null);
}

console.log('sha256: ' + hash('sha256', DATA1, true));
console.log('sha256: ' + hash('sha256', DATA2, true));
console.log('sha256: ' + hash('sha256', DATA3, true));
console.log('sha256: ' + hash('sha256', DATA4, true));
