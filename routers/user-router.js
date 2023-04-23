import { Router } from 'express'
import db from '../database/connection.js'
import validatePassword from '../util/validate-password.js'

const router = Router()

router.get("/:username", async (req, res, next) => {
    const { username } = req.params
    const user = await db.get('SELECT * FROM users WHERE username = ?', [username])
    console.log(user)
    if (!user) {
        return res.status(404).send({ message: `No user with username: ${username} found.`})
    }
    res.status(200).send({ data: user })
})

router.post("/", async (req, res, next) => {
    const { username, password, repeatPassword } = req.body
    if (!validatePassword(password, repeatPassword)) {
        return res.status(422).send({ message: 'Password and repeat password do not match'})
    }
    console.log(username, password)
    const user = await db.get('SELECT * FROM users where username=?;', [username])
    if (user) {
        return res.status(409).send({ message: `A user with the username: ${username} already exits. Choose a different username`})
    }
    const { lastID } = await db.run('INSERT INTO users (username, password) VALUES (?, ?);', [username, password])
    
    res.status(201).send({ message: `You successfully created a user with username: ${username}, ID: ${lastID}` })
})

export default router