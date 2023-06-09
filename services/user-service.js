import db from '../database/connection.js'

async function getAllUsers() {
    return await db.all('SELECT id, email, username, role FROM users')
}

async function getUserByUsername(username) {
    return await db.get('SELECT * FROM users WHERE username = ?', [username])
}

async function createUser(user) {
    return await db.run('INSERT INTO users (email, username, password, role) VALUES (?, ?, ?, ?);', [user.email, user.username, user.hashedPassword, user.role])
}


export {
    getAllUsers,
    getUserByUsername,
    createUser
}