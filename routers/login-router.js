import { Router } from 'express'
import { getUserByUsername } from '../services/user-service.js'
import { checkPassword } from '../util/authentication.js'

const router = Router()

router.post("/", async (req, res, next) => {
    const { username, password } = req.body
    const user = await getUserByUsername(username)
    if (!user) {
        return res.status(404).send({ message: `No user with username: ${username} found.`})
    }
    if (!checkPassword(password, user.password)) {
        return res.status(401).send({ message: 'Invalid password' })
    }
    res.send({ message: 'You successfully logged in.'})
})

export default router