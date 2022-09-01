import { decode } from "jsonwebtoken";
import { verifyToken } from "../utils/token.util.js";

const AuthMiddleware = (req, res, next) => {

    try {

        const authHeader = req.headers['authorization'];

        if (!authHeader)
            return res.status(401).send({ message: 'You must login first !' });

        const token = authHeader.replace('Bearer ', '');

        const { SECRET_KEY: key} = process.env;

        const tokenIsValid = verifyToken(token, key);

        if (!tokenIsValid)
            return res.status(401).send({ message: 'invalid token' });

        const id = decode(token).id;
        
        req.id = id;

        next();


    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export default AuthMiddleware;