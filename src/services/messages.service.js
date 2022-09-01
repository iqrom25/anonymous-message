import ConversationsRepository from "../repositories/conversations.repository.js";
import MessagesRepository from "../repositories/messages.repository.js";
import CryptoAES from 'crypto-js/aes.js';



const { create: createMessage, getConversationsMessages } = MessagesRepository();
const { create: createConversation, getById: conversationGetById } = ConversationsRepository();

const MessagesService = () => {

    const { SECRET_KEY: key } = process.env;

    const sendMessage = async (payload) => {
        try {

            
           
            
            const conversationPayload = {
                sender: payload.from,
                reciever: payload.to
            }
            
            const ciphertext = CryptoAES.encrypt(payload.message, key);
            
            payload.message = ciphertext.toString();
            
            const newConversations = await createConversation(conversationPayload);
            


            payload.conversationsId = newConversations.id;

            const newMessage = await createMessage(payload);

            return newMessage;


        } catch (err) {
            throw err;
        }
    };

    const sendReply = async (payload) => {
        try {

            const ciphertext = CryptoAES.encrypt(payload.message, key);

            payload.message = ciphertext.toString();

            const conversation = await conversationGetById(payload.conversationsId);

            payload.to = (conversation.sender === payload.from) ? conversation.reciever : conversation.sender;

            const newReply = await createMessage(payload);

            return newReply;


        } catch (err) {
            throw err;
        }
    };

    const findConversationsMessages = async (payload) => {
        try {

            const messages = await getConversationsMessages(payload);

            return messages;


        } catch (err) {
            throw err;
        }
    };

    return {
        sendMessage,
        sendReply,
        findConversationsMessages
    };

};

export default MessagesService;