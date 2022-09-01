import 'dotenv/config';
import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import conversationsRoute from '../routes/conversations.route.js';
import messagesRoute from '../routes/messages.route.js';
import UsersRoute from '../routes/users.route.js';

const app = express();
const { APP_PORT: port, APP_HOST: host, SESSION_SECRET: key } = process.env;

const Server = () => {

    app.use(express.json());
    
    app.use('/api/users', UsersRoute);

    app.use('/api/messages', AuthMiddleware ,messagesRoute);

    app.use('/api/conversations', AuthMiddleware ,conversationsRoute);


    app.listen(port, host, () => {
        console.log(`Server running at http://${host}:${port}`);
    })


}

export default Server;