class User {
    id;
    username;
    email;
    password;

    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

export default User;