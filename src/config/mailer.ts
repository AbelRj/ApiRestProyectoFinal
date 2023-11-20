import nodemailer = require('nodemailer');
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user:'abel.250.96@gmail.com',
        //fdra svzu lbsw dqgn
        pass:'fdra svzu lbsw dqgn',
},
tls:{
    rejectUnauthorized:false}
});
transporter.verify().then(()=>{
    console.log("ready to send email");
});