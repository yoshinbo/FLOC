const BN = require('bn.js')

const CP = new BN('115792089237316195423570985008687907853269984665640564039457584007908834671663')
const CN = new BN('115792089237316195423570985008687907852837564279074904382605163141518161494337')
const CA = new BN(0)
const CB = new BN(7)

const GX = new BN('55066263022277343669578718895168534326250603453777594175500187360389116729240')
const GY = new BN('32670510020758816978083085130507043184471273380659243275938904335757337482424')
const GPT = [GX, GY]

function ecAdd (P, Q, Pcur) {
  Pcur = Pcur || CP

  let Lambda = Q[1].sub(P[1]).mul(Q[0].sub(P[0]).invm(Pcur)).umod(Pcur)
  // modにおける割り算をする場合にはinvm(x)をしてからmodをしないと計算できないので割り算
  // Lambda = y2 - y1 / x2 - x1 mod P
  let x = Lambda.pow(new BN(2)).sub(P[0]).sub(Q[0]).umod(Pcur)
  // x = Lambda^2 - x1 - x2 mod P
  let y = Lambda.mul(P[0].sub(x)).sub(P[1]).umod(Pcur)
  // y = Lambda * (x1 - x) - y1 mod P
  return [x, y]
}

function ecDouble (P, Acur, Pcur) {
  Acur = Acur || CA
  Pcur = Pcur || CP

  let Lambda = P[0].pow(new BN(2)).mul(new BN(3)).add(Acur).mul(P[1].mul(new BN(2)).invm(Pcur)).umod(Pcur)
  // Lambda = (3x1^2 + A) / 2y1 mod P
  let x = Lambda.pow(new BN(2)).sub(P[0].mul(new BN(2))).umod(Pcur)
  // x = Lambda^2 * (2x1) mod P
  let y = Lambda.mul(P[0].sub(x)).sub(P[1]).umod(Pcur)
  // y = Lambda * (x1 - x) - y1 mod P
  return [x, y]
}

function ecMult(Scalar, Pt) {
  Pt = Pt || GPT
  if (Scalar.isZero() || Scalar.gte(CN)) {
    // private key = [[1, N - 1]]
    throw new Error('無効な秘密鍵')
  }
  let ScalarB = Scalar.toString(2)
  // 2進法に変換
  let Q = Pt

  // 2進法から数字を計算する近道
  // 1010101
  // 2桁目から始め、
  // 0の場合は x2、
  // 1の場合は x2 +1、
  // 1010101 = ((((((1x2)x2 +1)x2)x2 +1)x2)x2 +1)
  //         1        0    1   0    1   0    1
  // = 85
  for (let i = 1; i < ScalarB.length; i++) {
    Q = ecDouble(Q) // x2
    if (ScalarB.charAt(i) === '1') {
      Q = ecAdd(Q, Pt) // +1
    }
  }
  return Q
}

function pointToBuffer (point, compressed) {
  if (compressed === undefined) compressed = true
  if (compressed) {
    let header = point[1].isOdd() ? '03' : '02'
    return Buffer.concat([
      Buffer.from(header, 'hex'),
      point[0].toBuffer(null, 32)
    ])
  } else {
    return Buffer.concat([
      Buffer.from('04', 'hex'),
      point[0].toBuffer(null, 32),
      point[1].toBuffer(null, 32)
    ])
  }
}

function privateBufferToBN (privateBuffer) {
  return new BN(privateBuffer.toString('hex'), 16)
}

module.exports = {
  ecAdd: ecAdd,
  ecDouble: ecDouble,
  ecMult: ecMult,
  pointToBuffer: pointToBuffer,
  privateBufferToBN: privateBufferToBN,
  n: CN
}
