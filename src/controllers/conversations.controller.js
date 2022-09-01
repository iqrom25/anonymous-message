import ConversationsService from "../services/conversations.service.js";
import Response from '../utils/response.util.js'



const { findSenderConversation, findRecieverConversation, purchaseConversation } = ConversationsService();


const ConversationsController = () => {

    const getSenderConversation = async (req, res) => {
        try {

            const conversations = await findSenderConversation(req.id);

            return res.send(Response.successMessage(res.statusCode, 'success', conversations));

        } catch (err) {
            return res.status(400).send(Response.errorMessage(400, err));
        }
    }

    const getRecieverConversation = async (req, res) => {
        try {

            const conversations = await findRecieverConversation(req.id);

            return res.send(Response.successMessage(res.statusCode, 'success', conversations));

        } catch (err) {
            return res.status(400).send(Response.errorMessage(400, err));
        }
    };

    const updateStatus = async (req, res) => {
        try {
            const {id}= req.body;
            const updatedConversation = await purchaseConversation(id);
            return res.send(Response.successMessage(res.statusCode, 'success', updatedConversation));

        } catch (err) {
            return res.status(400).send(Response.errorMessage(400, err));
        }
    }


    return {
        getSenderConversation,
        getRecieverConversation,
        updateStatus
    }


}

export default ConversationsController;