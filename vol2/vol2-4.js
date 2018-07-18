const crypto = require('crypto');

const BLOCK = '01000000000000000000000000000000000000000000000000000000000000' +
              '00000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9f' +
              'b8aa4b1e5e4a29ab5f49ffff001d1dac2b7c';

const TRANSACTION = '02000000019803e51c6e704caf8a663da8b9c10c4ded1ca121bcd7ea' +
                    '236c072c1fcf0ef210000000006a47304402202e72be937676e2afee' +
                    'db8ddbf870ca4f978a55211b20ff705b4ed22c22b4fe3f02203bf4ca' +
                    'eda8196104d1cea48dd811395a50d4ecc981f95d24fb0a59cc7cd3ab' +
                    '9a012103bfa3e9d1fec0a0409a4858dacbb8de82ff19629fde67d01c' +
                    'a82d68c115a229dbffffffff03afc3d8e9000000001976a914ad4634' +
                    'b16781f8f6fc1f862d841d49ebf452f3a588acb0a1cc1d0000000019' +
                    '76a9145c207108f6fef887cdb5e465cb0621095113e25688ac509d2a' +
                    '01000000001976a914e3797ed58382af8596c68d467973e51427c498' +
                    '1a88ac00000000';

const BLOCK_BUF = Buffer.from(BLOCK, 'hex');
const TRANSACTION_BUF = Buffer.from(TRANSACTION, 'hex');

function hash (algorithm, data, isHex) {
    return crypto.createHash(algorithm).update(data).digest(isHex ? 'hex' : null);
}

function doubleHash (algorithm1, algorithm2, data, isHex) {
    return hash(algorithm2, hash(algorithm1, data), isHex);
}

console.log('      sha256sha256(BLOCK): ' +
    doubleHash('sha256', 'sha256', BLOCK_BUF).reverse().toString('hex')
);

console.log('sha256sha256(TRANSACTION): ' +
    doubleHash('sha256', 'sha256', TRANSACTION_BUF).reverse().toString('hex')
);
