const MessagesQuery = () => {
    const CREATE_MESSAGES = 'INSERT INTO messages (id, "to", "from", message ,date,time, conversations_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *';

    const FIND_BY_CONVERSATIONS_ID = 'SELECT * FROM messages WHERE conversations_id = $1';

    const FIND_USERNAME_EMAIL_BY_ID = 'SELECT username,email FROM users WHERE id=$1';

    return {
        CREATE_MESSAGES,
        FIND_BY_CONVERSATIONS_ID,
        FIND_USERNAME_EMAIL_BY_ID
    }
}

export default MessagesQuery();