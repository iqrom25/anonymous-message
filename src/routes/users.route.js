import { Router } from "express";
import UsersController from "../controllers/users.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

const { create, login } = UsersController();

const UsersRoute = () => {

    router.post('/register', create);

    router.post('/login', login);


    return router;

}

export default UsersRoute();