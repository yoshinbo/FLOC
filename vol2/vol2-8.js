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

console.log('  example data: ' + base58CheckEncode(Buffer.from('example data', 'utf8')));
console.log('example data 2: ' + base58CheckEncode(Buffer.from('example data 2', 'utf8')));
console.log('example data 3: ' + base58CheckEncode(Buffer.from('example data 3', 'utf8')));
