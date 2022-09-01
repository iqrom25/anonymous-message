import { Router } from "express";
import MessagesController from "../controllers/messages.controller.js";

const router = Router();

const { create, reply } = MessagesController();

const MessagesRoute = () => {


    router.post('/send', create);

    router.post('/reply', reply);

    return router;

}

export default MessagesRoute();