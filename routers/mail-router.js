import { Router } from 'express'
import { sendMail } from '../util/mail.js'
import dotenv from 'dotenv'
dotenv.config()

const router = Router()

router.post('/', async (req, res, next) => {
    const { email, subject, text } = req.body
    console.log(req.query)
    console.log(req.body)

    switch(req.query.type) {
        case 'contact':
            try {
                const supportMail = await sendMail(process.env.SUPPORT_MAIL, subject, text)
                console.log(supportMail)
            }
            catch(error) {
                console.log(error)

            }

            break
        case 'sign-up':
            break
        case 'forgot-password':
            break
    
      }

      res.status(200).send({message: 'Mail was sent'})
})

export default router
