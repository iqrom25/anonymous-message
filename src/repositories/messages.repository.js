import db from '../configs/database/db.js'
import MessagesQuery from '../configs/queries/messages.query.js';
import MessagesDto from '../models/dto/messages.dto.js'
import { v4 as uuid } from 'uuid';


const MessagesRepository = () => {

    const create = async (payload) => {

        try {

            const date = new Date();
            const time = `${date.getHours()}:${date.getMinutes()}`;

            const result = await db.query(MessagesQuery.CREATE_MESSAGES, [
                uuid(),
                payload.to,
                payload.from,
                payload.message,
                date,
                time,
                payload.conversationsId
            ]);


            return MessagesDto(result.rows[0]);


        } catch (err) {
            throw err.message;
        }
    };

    const getConversationsMessages = async (listConversationsId) => {
        try {

            const messagesList = [];

            let i = 0;
            for (const conversation of listConversationsId) {
                messagesList[i] = [];
                const messages = await db.query(MessagesQuery.FIND_BY_CONVERSATIONS_ID, [conversation.id]);

                for (const message of messages.rows) {
                    messagesList[i].push(MessagesDto(message))
                }
                i++;
            }

            return messagesList;


        } catch (err) {
            throw err;
        }
    };

    const getUsernameEmailById = async (id) => {

        try {

            const result = await db.query(MessagesQuery.FIND_USERNAME_EMAIL_BY_ID, [id]);

            return result.rows[0];

        } catch (err) {
            throw err;
        }
    };



    return {
        getUsernameEmailById,
        create,
        getConversationsMessages
    }

}

export default MessagesRepository;