import { Router } from 'express'
import { validatePassword, hashPassword } from '../util/authentication.js'
import { getUserByUsername, createUser } from '../services/user-service.js'

const router = Router()

router.post("/", async (req, res, next) => {
    const { email, username, password, repeatPassword } = req.body
    if (!validatePassword(password, repeatPassword)) {
        return res.status(422).send({ message: 'Password and repeat password do not match'})
    }
    console.log(username, password)
    const user = await getUserByUsername(username)
    if (user) {
        return res.status(409).send({ message: `A user with the username: ${username} already exits. Choose a different username`})
    }
    const hashedPassword = await hashPassword(password)
    console.log(hashedPassword)
    await createUser({
        email: email,
        username: username,
        hashedPassword: hashedPassword,
        role: 'user'
    })

    
    res.status(201).send({ message: `You successfully created a user with username: ${username}. If it's a valid email address, you should recieve an email soon.` })
})

export default router