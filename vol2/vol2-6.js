const crypto = require('crypto');

function hash (algorithm, data, isHex) {
    return crypto.createHash(algorithm).update(data).digest(isHex ? 'hex' : null);
}

function doubleSha256 (data) {
    return hash('sha256', hash('sha256', data));
}

function toUint32(num) {
    if ((!(num instanceof Number) && typeof num != "number") || num > 0xffffffff || num < 0 || Math.floor(num) != num) {
        throw "Error: Must be unsigned integer between 0 and 0xffffffff";
    }
    
    function littleEnd(hex) {
        if ((!(hex instanceof String) && typeof hex != "string") || !hex.match(/^[0-9a-fA-F]+$/) || hex.length % 2 !== 0) {
            throw "Error: Must be even length hex string representing bytes";
        }
        var ret = "";
        for (var i = 0; i < hex.length / 2; i++) {
            ret = hex.slice(i * 2, (i * 2) + 2) + ret;
        }
        return ret;
    }
    
    return littleEnd(("00000000" + num.toString(16)).slice(-8));
}

function mineBlock (headerText, startNonce, zeroBytes) {
    
    let nonce = startNonce;
    let result, fullHeader;
    do {
        nonce++;
        if ((nonce - startNonce) % 100000 == 0) console.log('回数: ' + (nonce - startNonce));
        fullHeader = Buffer.from(headerText + toUint32(nonce), 'hex');
        result = doubleSha256(fullHeader);
    } while (result.slice(-zeroBytes).toString('hex').replace(/0/g, '') !== '');

    return {
        nonce,
        fullHeader: fullHeader.toString('hex'),
        result: result.reverse().toString('hex')
    };
}

const HEADERTEXT = '01000000000000000000000000000000000000000000000000000000000000' +
                   '00000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9f' +
                   'b8aa4b1e5e4a29ab5f49ffff001d';

console.log('Mining results: ' +
    JSON.stringify(
        mineBlock(HEADERTEXT, 2082000000, 5), // 予め 2083236893 の正解を知っているのでスタート地点近い
    null, 2)
);
