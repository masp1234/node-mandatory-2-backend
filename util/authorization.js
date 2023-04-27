import jwt from 'jsonwebtoken'
import { getUserByUsername } from '../services/user-service.js'

const userLevels = new Map()
userLevels.set('user', 3)
userLevels.set('admin', 10)

function authorize(role) {
    return async (req, res, next) => {
        const token = req.cookies['jwt']
        if (token) {
            const claims = jwt.verify(token, process.env.TOKEN_KEY)
            console.log(claims)
            if (claims) {
                const claimValues = claims.split(' ')
                const user = await getUserByUsername(claimValues[1])
                if (user && userLevels.get(user.role) >= userLevels.get(role)) {
                    return next()
                }
            }
        }
        res.status(401).send({ message: `You are unauthorized. You must be role '${role}' or higher.`})
        }     
}

export {
    authorize
}
