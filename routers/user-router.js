import { Router } from 'express'
import { validatePassword, hashPassword } from '../util/authentication.js'
import { getUserByUsername, createUser, getAllUsers } from '../services/user-service.js'
import { authorize } from '../util/authorization.js'

const router = Router()

router.get('/', authorize('admin'), async (req, res) => {
    const users = await getAllUsers()
    res.status(200).send({ data: users })
})

router.get("/:username", async (req, res) => {
    const { username } = req.params
    const user = await getUserByUsername(username)
    if (!user) {
        return res.status(404).send({ message: `No user with username: ${username} found.`})
    }
    res.status(200).send({ data: user })
})

router.post("/", async (req, res) => {
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