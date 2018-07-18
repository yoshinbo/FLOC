const crypto = require('crypto');

function hash (algorithm, data, isHex) {
    return crypto.createHash(algorithm).update(data).digest(isHex ? 'hex' : null);
}

function multiHash (algorithm, iterations, salt, data, isHex) {
    let saltHash = hash(algorithm, salt);
    let dataHash = hash(algorithm, data);
    let result = Buffer.from('');
    while (iterations > 0) {
        result = hash(algorithm,
            Buffer.concat([
                result,
                saltHash,
                dataHash
            ])
        );
        iterations--;
    }
    return isHex ? result.toString('hex') : result;
}

console.log('sha256 x 1,000,000: ' +
    multiHash('sha256', 1000000, 'user@example.com', 's3cr3tp4ssw0rd', true)
);
