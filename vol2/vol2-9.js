const crypto = require('crypto');
const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const ALPHABET_MAP = {};
const BASE = ALPHABET.length;
const LEADER = ALPHABET.charAt(0);

for (var z = 0; z < ALPHABET.length; z++) {
    var x = ALPHABET.charAt(z);
    
    if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous');
    ALPHABET_MAP[x] = z;
}

function encode (source) {
    if (source.length === 0) return '';

    var digits = [0];
    for (var i = 0; i < source.length; ++i) {
      for (var j = 0, carry = source[i]; j < digits.length; ++j) {
        carry += digits[j] << 8;
        digits[j] = carry % BASE;
        carry = (carry / BASE) | 0;
      }

      while (carry > 0) {
        digits.push(carry % BASE);
        carry = (carry / BASE) | 0;
      }
    }

    var string = '';

    for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) string += LEADER;

    for (var q = digits.length - 1; q >= 0; --q) string += ALPHABET[digits[q]];

    return string;
  }

function hash (algorithm, data, isHex) {
    return crypto.createHash(algorithm).update(data).digest(isHex ? 'hex' : null);
}

function base58CheckEncode (data) {
    let checksum = hash('sha256', hash('sha256', data));
    let payload = Buffer.concat([data, checksum.slice(0, 4)]);
    return encode(payload);
}

const PUBKEY = Buffer.from('03ff2177e270d216092f8353f63700a58c13d8e85c1d3461b56c05edf2d8d9e7f5', 'hex');
const PRIVKEY =  Buffer.from('5de8b5a187fca75796e222e19c80229e2850cbf7c2e4c1ae69585c844c345266', 'hex');

function privkeyToWIF (privkey) {
    let payload = Buffer.concat([
        Buffer.from('80','hex'), // WIF version
        privkey,
        Buffer.from('01','hex') // 圧縮バイト
    ]);

    return base58CheckEncode(payload);
}

function pubkeyToAddress (pubkey) {
    let pubkeyHash = hash('ripemd160', hash('sha256', pubkey));
    let payload = Buffer.concat([
        Buffer.from('00','hex'), // P2PKH address version
        pubkeyHash
    ]);

    return base58CheckEncode(payload);
}

console.log('Example     WIF: ' + privkeyToWIF(PRIVKEY));
console.log('Example Address: ' + pubkeyToAddress(PUBKEY));
