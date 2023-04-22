import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.urlencoded())
const PORT = process.env.PORT || 8080

app.post("/log-in", (req, res) => {
    console.log(req.body)
    res.send({data: req.body})
})

app.listen(PORT, error => {
    if (error) return console.log(error)

    console.log(`The server is listening on port: ${PORT}`)
})
