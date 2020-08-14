const crypto = require('crypto');
var AES_conf = {
    key: 'abcdabcdabcdabcd', //密钥
    iv: '1012132405963708', //偏移向量
    // padding: 'PKCS7Padding' //补全值
  }

function decrypToken(data: any){
    let key = AES_conf.key;
    let iv = AES_conf.iv;
    // let padding = AES_conf.padding;
  
    var cipherChunks = [];
    var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(data, 'base64', 'utf8'));
    cipherChunks.push(decipher.final('utf8'));
    return cipherChunks.join('');
}

export function getTokenUserId(data: any) {
    return  decrypToken(data).split("#")[0]
}

export function generateQrcode(params: any) {
    const qr = require('qr-image');
    const qr_png = qr.imageSync(params, { type: 'png' });
    const qrcodeBase64 = new Buffer(qr_png).toString('base64');
    return qrcodeBase64
}

/**
 * AES加密的配置 
 * 1.密钥 
 * 2.偏移向量 
 * 3.算法模式CBC 
 * 4.补全值
 */

/**
 * AES_128_CBC 加密 
 * 128位 
 * return base64
 */
// function encryption(data: string) {
//   let key = AES_conf.key;
//   let iv = AES_conf.iv;
//   // let padding = AES_conf.padding;

//   var cipherChunks = [];
//   var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
//   cipher.setAutoPadding(true);
//   cipherChunks.push(cipher.update(data, 'utf8', 'base64'));
//   cipherChunks.push(cipher.final('base64'));
//   return cipherChunks.join('');
// }


/**
 * 解密
 * return utf8
 */
// function decryption(data: any){

//   let key = AES_conf.key;
//   let iv = AES_conf.iv;
//   // let padding = AES_conf.padding;

//   var cipherChunks = [];
//   var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
//   decipher.setAutoPadding(true);
//   cipherChunks.push(decipher.update(data, 'base64', 'utf8'));
//   cipherChunks.push(decipher.final('utf8'));
//   return cipherChunks.join('');
// }


// const timestamp=new Date().getTime()
// console.log('log encryption', encryption(`1#${timestamp}`)); 
// console.log('log decryption', decryption('toT4RDQPB5Lp+VYuu4LtWwcUuXgP8Agq+rpEmO3OtDc='));


