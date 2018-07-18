const crypto = require('crypto');
const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const BASE = ALPHABET.length;
const LEADER = ALPHABET.charAt(0);

function hash (algorithm, data, isHex) {
    return crypto.createHash(algorithm).update(data).digest(isHex ? 'hex' : null);
}

function zeroPadding(NUM, LEN){
    return ( Array(LEN).join('0') + NUM ).slice( -LEN );
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

function base58CheckEncode (data) {
    let _data = Buffer.from(data, 'hex');
    let checksum = hash('sha256', hash('sha256', _data));
    let payload = Buffer.concat([_data, checksum.slice(0, 4)]);
    return encode(payload);
}

function multiHash (data) {
  let data_1 = hash('sha1', data, true);
  let data_2 = hash('sha256', data_1, true);
  let data_3 = hash('ripemd160', data_2, true);
  
  if (data_3.slice(0, 2) == "00") {
    console.log(base58CheckEncode(data_3));    
  } else {
    index++;
    let _data = DATA + zeroPadding(index, 4);
    console.log(_data);
    multiHash(Buffer.from(_data, 'utf8'));
  }
}

let DATA = 'FLOC';
var index = 0;
multiHash(Buffer.from(DATA, 'utf8'));


