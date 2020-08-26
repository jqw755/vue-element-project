import CryptoJS from 'crypto-js'

// 生成 8位 数字字母组合的字符串
function toRandomStr() {
  const chartArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  let resStr = '';
  for (let i = 0; i < 8; i++) {
    let r = Math.round(Math.random() * (chartArr.length - 1) + 1);
    resStr += chartArr[r];
  }
  return resStr;
}

const randomStr = toRandomStr();
const key = CryptoJS.enc.Utf8.parse(randomStr);

/**
 * 加密（需要先加载lib/aes/aes.min.js文件）
 */
const encrypt = (word) => {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.DES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();

};
/**
 * 解密
 */
const decrypt = (word) => {
  const decrypt = CryptoJS.DES.decrypt(
    {ciphertext: CryptoJS.enc.Base64.parse(word)},
    key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();

};
export {randomStr, encrypt, decrypt, CryptoJS};
