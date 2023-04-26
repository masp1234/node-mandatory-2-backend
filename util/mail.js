import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: "test123987@outlook.dk",
        pass: 'masp123123'
    },
    tls: {
        rejectUnauthorized: false
    }
})




async function sendMail(recipientAddress, subject, text){
    const mail = {
        from: "test123987@outlook.dk",
        to: recipientAddress,
        subject: subject,
        text: text
    }

    transporter.sendMail(mail, (error) => {
    if (error) {
      console.log("Nodemailer has an error: " + error)
      return
    } else {
      console.log("Mail was succesfully sent")
      return
    }
  })

}

sendMail('masp987@gmail.com', 'subject', 'test')