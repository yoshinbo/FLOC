const ecdsa = require('./vol3-2.js')
const crypto = require('crypto')
const rng = crypto.randomBytes

function sign(privateKeyBN, msgHash) {
  let k, z, R, r, s
  do {
    k = ecdsa.privateBufferToBN(rng(32))
    z = ecdsa.privateBufferToBN(msgHash)
    while (false /* k is in [1, n-1] */) {
      /* 再び乱数取る */
    }
    R = ecdsa.ecMult(k)
    r = R[0].umod(ecdsa.n)
    s = k.invm(ecdsa.n)
      .mul(z.add(r.mul(privateKeyBN)))
      .umod(ecdsa.n)
  } while (false /* r and s not 0 etc. */)
  
  return [r, s]
}

function verify(pubKeyPt, sig, msgHash) {
  let z = ecdsa.privateBufferToBN(msgHash)
  let r = sig[0]
  let s = sig[1]
  const w = s.invm(ecdsa.n)
  const u1 = z.mul(w).umod(ecdsa.n)
  const u2 = r.mul(w).umod(ecdsa.n)
  const result = ecdsa.ecAdd(
    ecdsa.ecMult(u1),
    ecdsa.ecMult(u2, pubKeyPt)
  )
  return result[0].umod(ecdsa.n).eq(r)
  // r == result x軸 value mod n
}

const text = "Hello World!"
// 32 byte が n と同じ長さなので使いやすい
const textHash = crypto.createHash('sha256').update(text).digest()
const privateKeyBN = ecdsa.privateBufferToBN(rng(32))
const pubKeyPt = ecdsa.ecMult(privateKeyBN)

const sig = sign(privateKeyBN, textHash)

console.log(verify(pubKeyPt, sig, textHash))
// true
