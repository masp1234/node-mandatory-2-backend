import db from "./connection.js"

const isResetMode = process.argv.findIndex(argument => argument === "reset_mode") === -1 ? false : true

if (isResetMode) {
    db.exec('DROP TABLE IF EXISTS users;')
}

db.exec(
    `
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
    );  
    `
)
