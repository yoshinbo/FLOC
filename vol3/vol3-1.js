const ECDSA = require('secp256k1')
const BN = require('bn.js')
const base58Check = require('bs58check')

const privateInt = new BN('79166932645790398746161737314012976057631666974820812284863365219350761232064')
const privateBuffer = privateInt.toBuffer(null, 32) // 32バイトで固定

const decodedWIF = base58Check.decode('L35wVgKWPyfeMzNUWQR3D2MtjCUzMyrvFpN9R44NTZbhcCea6kyS')
                              .slice(1,33) // バージョン＋圧縮バイトとる

console.log(decodedWIF.equals(privateBuffer))
// true

const publicKeyCompressed = ECDSA.publicKeyCreate(privateBuffer)
const publicKeyUncompressed = ECDSA.publicKeyCreate(privateBuffer, false)
const x = new BN(publicKeyUncompressed.slice(1,33).toString('hex'), 16)
const y = new BN(publicKeyUncompressed.slice(33,65).toString('hex'), 16)

console.log(x.toString(10))
// 14940432162225245106778043682370687268864377313694688834137709913105567990260
console.log(y.toString(10))
// 22312549033088701518791571940340055302090435747572883935510928095745029494859
console.log(publicKeyCompressed.toString('hex'))
// 032107fc24b3569f2feda301c7efc07f56fc8ab6870e61f03dcd93dbd9088a41f4
