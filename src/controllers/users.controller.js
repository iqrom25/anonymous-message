import UsersService from "../services/users.service.js"
import Response from '../utils/response.util.js'

const { userRegister, userLogin } = UsersService();


const UsersController = () => {

    const create = async (req, res) => {
        try {

            const newUser = await userRegister(req.body);

            return res.send(Response.successMessage(res.statusCode, 'new user successfully created', newUser))

        } catch (err) {
            return res.status(400).send(Response.errorMessage(400, err));
        }
    };

    const login = async (req, res) => {
        try {

            const token = await userLogin(req.body);

            return res.status(200).send({token})

        } catch (err) {

            return res.status(400).send({ message: err });
        }
    }

    return {
        create,
        login
    }


}

export default UsersController;