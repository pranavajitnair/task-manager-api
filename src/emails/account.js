const sgMail=require('@sendgrid/mail');
const sendgridAPIKey=process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sendgridAPIKey);
const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from :'pranavn1008@gmail.com',
        subject:'Thanks for joining in!',
        text:`Welcome to the app,${name}. Let me know how you get along wiht thee app`
    })
}
module.exports={
    sendWelcomeEmail
}