import db from '../configs/database/db.js'
import ConversationsQuery from '../configs/queries/conversations.query.js';
import ConversationsDto from '../models/dto/conversations.dto.js'
import { v4 as uuid } from 'uuid';
import conversationsQuery from '../configs/queries/conversations.query.js';


const ConversationsRepository = () => {

    const create = async (payload) => {

        try {

            const result = await db.query(ConversationsQuery.CREATE_CONVERSATION, [
                uuid(),
                payload.sender,
                payload.reciever,
                false
            ]);

            const conversation = ConversationsDto(result.rows[0]);

            return conversation;


        } catch (err) {
            throw err.message;
        }
    };

    const getById = async (id) => {

        const conversation = await db.query(conversationsQuery.FIND_BY_ID, [id]);

        return ConversationsDto(conversation.rows[0]);
    };

    const getAllSenderId = async (id) => {

        const conversation = await db.query(conversationsQuery.FIND_ALL_SENDER_ID, [id]);

        return conversation.rows;
    };

    const getAllRecieverId = async (id) => {

        const conversation = await db.query(conversationsQuery.FIND_ALL_RECIEVER_ID, [id]);

        return conversation.rows;
    };


    const updateStatus = async (id) => {

        try {

            const conversations = await db.query(ConversationsQuery.CHANGE_STATUS, [true, id]);

            console.log(conversations);
            return ConversationsDto(conversations.rows[0]);

        } catch (err) {
            throw err;
        }
    };


    return {
        create,
        getById,
        getAllSenderId,
        getAllRecieverId,
        updateStatus
    }

}

export default ConversationsRepository;