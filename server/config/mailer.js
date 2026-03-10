const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = {
    sendMail: async ({ from, to, subject, html, attachments }) => {
        return resend.emails.send({
            from: 'Maur Black <onboarding@resend.dev>',
            to,
            subject,
            html,
            attachments
        });
    }
};