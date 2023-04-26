import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

export async function sendMail(recipientAddress, subject, text){
    const mail = {
        from: process.env.MAIL_USER,
        to: recipientAddress,
        subject: subject,
        text: text
    }

    return await transporter.sendMail(mail)

}
