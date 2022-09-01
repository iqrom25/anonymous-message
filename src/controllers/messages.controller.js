import ConversationsService from "../services/conversations.service.js";
import MessagesService from "../services/messages.service.js"
import Response from '../utils/response.util.js'

const { sendMessage, sendReply } = MessagesService();


const MessagesController = () => {

    const create = async (req, res) => {
        try {
     
            const payload = {
                to: req.query.message_to,
                from: req.id,
                message: req.body.message
            }


            const message = await sendMessage(payload);
            return res.send(Response.successMessage(res.statusCode, 'message successfully send', message));

        } catch (err) {
            return res.status(400).send(Response.errorMessage(400, err));
        }
    };

    const reply = async (req, res) => {
        try {

            const payload = {
                from: req.id,
                conversationsId: req.query.reply_to,
                message: req.body.message
            }


            const message = await sendReply(payload);
            return res.send(Response.successMessage(res.statusCode, 'message successfully send', message));

        } catch (err) {
            return res.status(400).send(Response.errorMessage(400, err));
        }
    };





    return {

        create,
        reply
    }


}

export default MessagesController;