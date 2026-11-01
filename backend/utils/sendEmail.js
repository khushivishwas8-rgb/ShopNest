const nodeMailer = require('nodeMiler');

const sendEmail = async (to, subject,text) =>{
    try{
        consttransporter = nodeMailer.crteateTransport({
            service: 'gmail',
            auth:{
                user: process.env.Email_USER,
                pass: process.env.Email_PASS
            }
        });
        const mailOptions = {
            from: process.env.Email_USER,
            to,
            subject,
            text
        };
         await WebTransport.sendMail(mailOptions);

    }catch(error){
       console.log('Erroe sending email:', error);
    }
}