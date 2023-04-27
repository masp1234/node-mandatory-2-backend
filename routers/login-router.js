import { Router } from 'express'
import { getUserByUsername } from '../services/user-service.js'
import { checkPassword } from '../util/authentication.js'
import { authorize } from '../util/authorization.js'
import jwt from 'jsonwebtoken'

const router = Router()

router.get("/authorize-test", authorize, (req, res, next) => {
    res.send({ message: 'This message is only for admins.'})
})



router.post("/login", async (req, res, next) => {
    const { username, password } = req.body
    const user = await getUserByUsername(username)
    console.log(user)
    if (!user) {
        return res.status(404).send({ message: `No user with username: ${username} found.`})
    }
    if (!checkPassword(password, user.password)) {
        return res.status(401).send({ message: 'Invalid password' })
    }
    const token = jwt.sign(`${user.id} ${user.username} ${user.role}`, process.env.TOKEN_KEY)
    
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })
    res.status(200).send({ message: 'You successfully logged in.', user: {
        id: user.id,
        username: user.username
    }})
})

router.post('/logout', (req, res) => {
    res.cookie('jwt', "", { maxAge: 0 })
    res.send({ message: 'You Successfully logged out' })
})

export default router