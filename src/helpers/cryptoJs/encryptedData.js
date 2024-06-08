import CryptoJS from 'crypto-js';

const secretKey = 'Ahihihi';

function encryptedData(originalData) {
    const stringData = JSON.stringify(originalData);
    return CryptoJS.AES.encrypt(stringData, secretKey).toString();
}

export default encryptedData;
