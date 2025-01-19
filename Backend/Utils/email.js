const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendEmail = async (to,subject,html) => {

    try{
        const transporter = await nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        console.log(`Transporter ${transporter}`);

        await transporter.sendMail({
            from:"DigitalFlake <akashbadki57@gmail.com>",
            to,
            subject,
            html,
        })
        console.log(`Email sent to ${to}`);

    } catch(err) {
        console.log("Error sending email:", err);
        console.error(err)
    }
}