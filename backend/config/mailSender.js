import mailgun from 'mailgun-js';
import dotenv from 'dotenv'
import Mailgun from 'mailgun.js';

dotenv.config()
/** 
 * const mailCredentials = {
    domain: process.env.DOMAIN,
    apiKey: process.env.APIKEY
};
 * 
*/

const sendEmail = async (recipient, message) => {

    //const mg = mailgun({apiKey: mailCredentials.apiKey, domain: mailCredentials.domain});
    /**
     * const mg = mailgun.client({username: 'api', key: mailCredentials.apiKey || 'key-yourkeyhere', url: 'https://api.eu.mailgun.net'});
    const data = {
        from: `Excited User <me@samples.mailgun.org>`,
        to: recipient,
        subject: message.subject,
        text: message.text
    };
    try {
        let resp = await mg.messages().send(data);
        console.log(resp)
    } catch (err) {
        throw err;
    }*/
    console.log("RESP")
};
export {sendEmail};
