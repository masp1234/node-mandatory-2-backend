import db from "./connection.js"

const isResetMode = process.argv.findIndex(argument => argument === "reset_mode") === -1 ? false : true

if (isResetMode) {
    db.exec('DROP TABLE IF EXISTS users;')
}

db.exec(
    `
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        username TEXT,
        password TEXT,
        role TEXT
    );  
    `
)

db.run('INSERT INTO users (email, username, password, role) VALUES ("bob@gmail.com", "bob", "123", "admin");')
