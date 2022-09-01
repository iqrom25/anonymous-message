import db from '../configs/database/db.js'
import usersQuery from '../configs/queries/users.query.js';
import UserDto from '../models/dto/user.dto.js'
import { v4 as uuid } from 'uuid';
import { comparePassword, hashPassword } from '../utils/password.util.js'


const UsersRepository = () => {

    const create = async (payload) => {

        try {
            const hashedPassword = await hashPassword(payload.password);

            const result = await db.query(usersQuery.CREATE_USER, [
                uuid(),
                payload.username,
                payload.email,
                hashedPassword
            ]);

            const user = result.rows[0];

            return UserDto(user);

        } catch (err) {
            throw err;
        }
    };

    const getByLogin = async (username, password) => {

        try {

            const result = await db.query(usersQuery.SEARCH_BY_USERNAME, [username]);

            const user = result.rows[0];

            if (!user) throw 'invalid username';

            const validPassword = await comparePassword(password, user.password);

            if (!validPassword) throw 'invalid password';

            return UserDto(user);

        } catch (err) {

            throw err;
        }
    };



    return {
        create,
        getByLogin
    }

}

export default UsersRepository;