const crypto = require('crypto');

function hash (algorithm, data) {
    return crypto.createHash(algorithm).update(data).digest('hex');
}

console.log('      md5: ' + hash('md5', 'Hello World!'));
console.log('     sha1: ' + hash('sha1', 'Hello World!'));
console.log('   sha256: ' + hash('sha256', 'Hello World!'));
console.log('   sha512: ' + hash('sha512', 'Hello World!'));
console.log('ripemd160: ' + hash('ripemd160', 'Hello World!'));
