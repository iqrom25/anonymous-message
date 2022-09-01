class Messages {
    id;
    to;
    from;
    message;
    date;
    conversationId;

    constructor(id, to, from, message, date, conversationId) {
        this.id = id;
        this.to = to;
        this.from = from;
        this.message = message;
        this.date = date;
        this.conversationId = conversationId;
    }

}

export default Messages;