import CryptoJS from "crypto-js";

const key = "periquitoPERIQUITO"; //Clave de encriptamiento

//Encriptar un string utilizando la palabra clave
export const encrypt = (text) => {
    const hash = CryptoJS.SHA256(key);
    const ciphertext = CryptoJS.AES.encrypt(text, hash, {
        mode: CryptoJS.mode.ECB,
    });
    return ciphertext.toString();
};
//Desencriptar un string utilizando la palabra clave
export const decrypt = (ciphertext) => {
    const hash = CryptoJS.SHA256(key);
    const bytes = CryptoJS.AES.decrypt(ciphertext, hash, {
        mode: CryptoJS.mode.ECB,
    });
    return bytes.toString(CryptoJS.enc.Utf8);
};