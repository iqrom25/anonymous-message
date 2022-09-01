const ConversationsQuery = () => {
    const CREATE_CONVERSATION = 'INSERT INTO conversations (id, sender, reciever, status) VALUES ($1,$2,$3,$4) RETURNING *';

    const FIND_BY_ID = 'SELECT * FROM conversations WHERE id=$1';

    const FIND_ALL_SENDER_ID = 'SELECT c.id, u.username FROM conversations c  JOIN users u ON c.reciever = u.id WHERE c.sender = $1';

    const FIND_ALL_RECIEVER_ID = 'SELECT id FROM conversations WHERE reciever = $1';

    const CHANGE_STATUS = 'UPDATE conversations SET status=$1 WHERE id=$2 RETURNING *';

    return {
        CREATE_CONVERSATION,
        FIND_BY_ID,
        FIND_ALL_SENDER_ID,
        FIND_ALL_RECIEVER_ID,
        CHANGE_STATUS
    }
}

export default ConversationsQuery();