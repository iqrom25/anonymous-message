const UsersQuery = () => {
    const CREATE_USER = 'INSERT INTO users (id,username,email,password) VALUES ($1,$2,$3,$4) RETURNING *';
    const SEARCH_BY_USERNAME = 'SELECT * FROM users WHERE username = $1'
    return {
        CREATE_USER,
        SEARCH_BY_USERNAME
    }
}

export default UsersQuery();