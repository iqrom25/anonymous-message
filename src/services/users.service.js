import usersRepository from "../repositories/users.repository.js"
import { generateToken } from "../utils/token.util.js";

const { create, getByLogin } = usersRepository();

const UsersService = () => {

    const userRegister = async (payload) => {
        try {

            payload.username = payload.username.toLowerCase();

            const newUser = await create(payload);
            return newUser;

        } catch (err) {
            throw err;
        }
    };


    const userLogin = async (payload) => {

        try {

            payload.username = payload.username.toLowerCase();

            const { SECRET_KEY: key, TOKEN_ALGORITHM: algorithm, TOKEN_EXPIRED: expiresIn } = process.env;

            const user = await getByLogin(payload.username, payload.password);

            const token = generateToken(user, key, expiresIn, algorithm);

            return token;

        } catch (err) {

            throw err;
        }
    }


    return {
        userRegister,
        userLogin
    };

};

export default UsersService;