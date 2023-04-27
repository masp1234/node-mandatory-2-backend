import jwt from 'jsonwebtoken'
import { getUserByUsername } from '../services/user-service.js'

async function authorize(req, res, next) {
    const token = req.cookies['jwt']

    if (token) {
        const claims = jwt.verify(token, process.env.TOKEN_KEY)
        console.log(claims)
        if (claims) {
            const user = await getUserByUsername(claims)
            console.log(user)
            if (user && user.role === 'admin') {
                return next()
            }
            
        }
    }
    res.status(401).send({ message: 'You are unauthorized.'})
}

export {
    authorize
}
