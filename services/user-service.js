import db from '../database/connection.js'

async function getUserByUsername(username) {
    return await db.get('SELECT * FROM users WHERE username = ?', [username])
}

async function createUser(user) {
    return await db.run('INSERT INTO users (email, username, password) VALUES (?, ?, ?);', [user.email, user.username, user.hashedPassword])
}


export {
    getUserByUsername,
    createUser
}