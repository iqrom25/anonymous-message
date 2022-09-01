import ConversationsRepository from "../repositories/conversations.repository.js";
import MessagesRepository from "../repositories/messages.repository.js";


const ConversationsService = () => {

    const { getConversationsMessages, getUsernameEmailById } = MessagesRepository();
    const { create, getAllSenderId, getById, getAllRecieverId, updateStatus } = ConversationsRepository();

    const addNewConversation = async (payload) => {
        try {

            const newConversation = await create(payload)

            return newConversation;

        } catch (err) {
            throw err;
        }
    };

    const findSenderConversation = async (id) => {
        try {

            const listId = await getAllSenderId(id);

            if (listId.length === 0) return listId;

            const listMessage = await getConversationsMessages(listId);

            listMessage.forEach(message => {

                message.map(m => {
                    m.to = m.to === listId[0].id ? listId[0].username : 'you';
                    m.from === listId[0].id ? listId[0].username : 'you';


                    return m;
                });
                return message;
            })

            return listMessage;

        } catch (err) {
            throw err;
        }
    };

    const findRecieverConversation = async (id) => {
        try {
            const listId = await getAllRecieverId(id);

            const listMessage = await getConversationsMessages(listId);

            for (let i = 0; i < listMessage.length; i++) {

                await Promise.all(listMessage[i].map(async (e) => {

                    e.to = e.to === id ? 'you' : `Anonymous ${i + 1}`;
                    
                    const conversation = await getById(e.conversationsId);

                    if (conversation.status) {
                        const user = await getUsernameEmailById(e.from);

                        e.from = e.from === id ? 'you' : {
                            username: user.username,
                            email: user.email
                        };
                    } else {

                        e.from = e.from === id ? 'you' : `Anonymous ${i + 1}`;

                    }

                    return e;


                }));

            }


            return listMessage;

        } catch (err) {
            throw err;
        }
    };

    const findById = async (id) => {
        try {

            const conversation = await getById(id)

            return conversation;

        } catch (err) {
            throw err;
        }
    };


    const findAllId = async () => {
        try {

            const listId = await getAllId()

            return listId;

        } catch (err) {
            throw err;
        }
    };

    const purchaseConversation = async (id) => {
        try {

            const purchasedConversation = await updateStatus(id);

            return purchasedConversation;

        } catch (err) {
            throw err;
        }
    };


    return {
        addNewConversation,
        findAllId,
        findSenderConversation,
        findById,
        findRecieverConversation,
        purchaseConversation
    };

};

export default ConversationsService;