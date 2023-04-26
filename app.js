import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRouter from './routers/user-router.js'
import loginRouter from './routers/login-router.js'
import mailRouter from './routers/mail-router.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: true
}))
const PORT = process.env.PORT || 8080

app.use("/api/users", userRouter)
app.use("/api", loginRouter)
app.use("/api/mail", mailRouter)

app.listen(PORT, error => {
    if (error) return console.log(error)

    console.log(`The server is listening on port: ${PORT}`)
})
