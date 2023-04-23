import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routers/user-router.js'
import cors from 'cors'
import loginRouter from './routers/login-router.js'

dotenv.config()

// TJEK OM DER ER BRUG FOR CORS FOR AT KUNNE LAVE REQUEST FRA FRONTEND

const app = express()

app.use(express.json())

app.use(cors({
    credentials: true,
    origin: true
}))
const PORT = process.env.PORT || 8080


app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

app.listen(PORT, error => {
    if (error) return console.log(error)

    console.log(`The server is listening on port: ${PORT}`)
})
