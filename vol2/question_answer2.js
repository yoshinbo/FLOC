const crypto = require('crypto');

function sha1(data) {
  // digest()はbiteの配列、つまりBufferを返す関数
  return crypto.createHash("sha1").update(data).digest();
}

function numberToString(number) {
  return ('000' + number).slice(-4);
}

const DATA = "FLOC"; 
var number = 0;

var result = sha1(DATA + numberToString(number));

while(result[0] != 0) {
  number++;
  result = sha1(DATA + numberToString(number));
}

console.log(number);
console.log(result.toString('hex'));
