import nodemailer from 'nodemailer'

async function sendEmail() {
    try {
      let testAccount = await nodemailer.createTestAccount();
    
      let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
              user: testAccount.user,
              pass: testAccount.pass
          },
          tls: {
              rejectUnauthorized: false
          }
      });
    
      let info = await transporter.sendMail({
          from: 'Dude',
          to: 'masp1234567@yahoo.com',
          subject: 'test',
          text: 'Hello world?',
          html: '<b>Hello world?</b>'
      }, (error, info) => {
        if (error) console.log(error)
        console.log(info)
      });
    
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
    } catch (error) {
      console.log(error);
    }
  }
  
  sendEmail();