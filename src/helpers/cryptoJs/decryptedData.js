import CryptoJS from 'crypto-js';

const secretKey = 'Ahihihi';

function decryptedData(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export default decryptedData;
