const ConversationsDto = (conversation) => {

    return {
        id : conversation.id,
        sender : conversation.sender,
        reciever : conversation.reciever,
        status : conversation.status

    };
}

export default ConversationsDto;