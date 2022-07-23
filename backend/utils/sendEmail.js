const nodeMailer= require('nodemailer');

const sendEmail = async(options)=>{

    const transporter = nodeMailer.createTransport({
        // host: process.env.SMPT_HOST,
        // port: process.env.SMPT_PORT,
        // service: process.env.SMPT_SERVICE,
        // auth:{
        //     user: process.env.SMPT_MAIL,
        //     pass: process.env.SMPT_PASSWORD
        // }
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: "imap.gmail.com",
        auth:{
            user: "rk8820697@gmail.com",
            pass: "Raja1234567890"
        }
    })

    console.log("Akki:",transporter);

    const mailOptions={
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions)
}

module.exports= sendEmail;