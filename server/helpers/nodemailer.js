
const nodemailer = require('nodemailer')

module.exports = {
    Mailer: (Email) => {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_NODEMAILER,
                pass: process.env.PASSWORD_NODEMAILER
            }
        })

        let mailOption = {
            from:  process.env.EMAIL_NODEMAILER,
            to: Email.penerima,
            subject: Email.judul,
            text: Email.text
        }

        transporter.sendMail(mailOption, function (err, res) {
            if (err) {
                console.log('Error')
            } else {
                console.log('email send')
            }
        })
    }
}







