import CryptoENC from 'crypto-js/enc-utf8.js';
import CryptoAES from 'crypto-js/aes.js';

const MessagesDto = (message) => {

    const { SECRET_KEY: key } = process.env;

    const date = message.date.toLocaleDateString();

    const decrypt = CryptoAES.decrypt(message.message, key);
    const messageDecrypt = decrypt.toString(CryptoENC);

    return {
        id: message.id,
        to: message.to,
        from: message.from,
        message: messageDecrypt,
        date,
        time: message.time,
        conversationsId: message.conversations_id


    };
}

export default MessagesDto;