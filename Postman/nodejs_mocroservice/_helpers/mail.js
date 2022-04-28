const mail = require('../_config/mail');
const nodemailer = require('nodemailer');
module.exports = { sendMail, emailLayout };

async function sendMail(to, subject, html, isAsync = true,attachment=null) {
    const transporter = nodemailer.createTransport({

        host: mail.mailhostname,
        port: mail.mailport,
        auth: {
            user: mail.mailuseremail,
            pass: mail.mailuserpwd
        },
        secureConnection: true,
        tls: { ciphers: 'SSLv3' }
    });
    let mailOptions;
    if(attachment){
        mailOptions = {
            from: mail.mailfrom,
            to: to,
            subject: subject,
            html: html,
            attachments: [{
                path: attachment
            }]
        };
    }else{
        mailOptions = {
            from: mail.mailfrom,
            to: to,
            subject: subject,
            html: html
        };
    }

    if (isAsync) {
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent for verification: ' + info.response);
            }
        });
    } else {
        return transporter.sendMail(mailOptions);
    }
}
 
function emailLayout(user, content, link = '', link_title = 'Download App') {
    var html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>' + mail.appName + '</title><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><div style="margin: auto; width: 90%;background:#7D3030;"><div style="padding: 0 15%;"><table width="100%"><tbody><tr><td style="text-align: center;margin-top:50px"><a>DQOT</a></td></tr></tbody></table></div><br><br><div class="middle" style="height: 500px;"><div  style="padding: 0 15%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed"><tbody><tr><td style="padding: 18px 0 10px; line-height: 22px; text-align: inherit; " height="100%" valign="top"><h2><span style="font-size: 16px"><span style="color: #fff; font-family: Roboto, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; white-space: pre-wrap">Hi ' + user + ', </span></span></h2></td></tr></tbody></table></div><div  style="padding: 0 15%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed"><tbody><tr><td style="padding: 0; line-height: 22px; text-align: justify" height="100%" valign="top" bgcolor=""><div><span style="color:#fff; font-family: Roboto, Helvetica, sans-serif; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; white-space: pre-wrap">' + content + '</span></div><div>&nbsp;</div>';
    if (link !== '') {
        html += '<a style="background-color: rgba(255, 83, 61, 1); border: 1px solid rgba(255, 83, 61, 1); border-radius: 40px; color: rgba(255, 255, 255, 1); display: inline-block; font-family: arial, helvetica, sans-serif; font-size: 14px; font-weight: normal; letter-spacing: 0; line-height: 16px; padding: 12px 18px; text-align: center; text-decoration: none" href="' + link + '">' + link_title + '</a>';
    }
    html += '</td></tr></tbody></table></div><div style="padding: 0 15%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed"><tbody><tr><td style="padding: 0; line-height: 22px; text-align: justify" height="100%" valign="top"><div>&nbsp;</div><div><span style="color:#fff; font-family: Roboto, Helvetica, sans-serif; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; white-space: pre-wrap">Thank you, </span></div><div><span style="color:#fff; font-family: Roboto, Helvetica, sans-serif; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; white-space: pre-wrap">DQOT</span></div></td></tr></tbody></table></div><div style="padding: 0 15%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed"><tbody><tr><td style="padding: 0 0 30px" bgcolor=""></td></tr></tbody></table></div></div><div style="padding: 0 15%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed"><tbody><tr><td style="background: #ff533d; padding: 18px 0; line-height: 22px; text-align: inherit" height="100%" valign="top"><div style="text-align: center"><span style="color:#fff; font-family: Roboto, Helvetica, sans-serif; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal;">CONTACT NUMBER:' + mail.contactNumber + '</span></div><div style="text-align: center">&nbsp;</div><div style="text-align: center"><span style="color:#fff; font-family: Roboto, Helvetica, sans-serif; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal;">' + mail.infoMail + ' </span></div><div style="text-align: center"><span style="font-family: arial black, helvetica, sans-serif"><em><strong><span style="border-style: none; outline: none; border-radius: 0; font-weight: normal; color:#fff; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;">' + mail.appName + '</span></strong></em></span></div><div style="text-align: center">&nbsp;</div><div style="text-align: center"><span style="color:#fff; font-family: Roboto, Helvetica, sans-serif; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal;">©' + mail.appName + ' 2021. All rights reserved.</span></div></td></tr></tbody></table></div></div></body></html>';
    return html;
}
