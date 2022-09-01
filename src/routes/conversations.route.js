import { Router } from "express";
import ConversationsController from "../controllers/conversations.controller.js";

const router = Router();

const { getSenderConversation, getRecieverConversation, updateStatus } = ConversationsController();

const MessagesRoute = () => {


    router.get('/send', getSenderConversation);
    router.get('/recieve', getRecieverConversation);
    router.post('/purchase', updateStatus)


    return router;

}

export default MessagesRoute();