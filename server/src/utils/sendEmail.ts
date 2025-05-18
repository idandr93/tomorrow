import sendGridMail, { MailDataRequired } from '@sendgrid/mail';

const sendMail = async (targetEmail: string, title: string, city: string) => {
  try {
    sendGridMail.setApiKey(process.env.SEND_GRID_API_KEY || '');
    const fromEmail = process.env.FROM_EMAIL || '';
    const msg: MailDataRequired = {
      to: targetEmail,
      from: fromEmail,
      subject: title,
      text: `trigger alert has been activated to ${city}`,
    };
    const emailResponse = await sendGridMail.send(msg);

    console.log(`Email sent:  ${emailResponse}  => ${targetEmail}`);
  } catch (error) {
    console.log('error', error);
  }
};

export default sendMail;
