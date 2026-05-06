import dotenv from 'dotenv'
import { MailerSend } from 'mailersend';

dotenv.config();

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

export default mailerSend;
