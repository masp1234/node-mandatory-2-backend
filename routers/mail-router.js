import { Router } from 'express'
import { sendMail } from '../util/mail.js'

const router = Router()

router.post('/', async (req, res) => {
    const { email, subject, text } = req.body

    switch(req.query.type) {
        case 'contact':
            try {
                await sendMail(process.env.SUPPORT_MAIL, subject, text)
                await sendMail(email, 'Thanks for contacting us', 'We have received your email and will be answering shortly.')
                console.log(supportMail)
            }
            catch(error) {
                console.log(error)
            }
            break
        case 'sign-up':
            await sendMail(email, 'Thanks for creating an account', 'Congratulations on your new account.')
            break
        case 'forgot-password':
            await sendMail(email, 'Forgotten password', 'Try to remember your password')
            break
      }

      res.status(200).send({message: 'Mail was sent'})
})

export default router
