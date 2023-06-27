import twilio from "twilio";

const sendMessage = async () => {
  const accountSid = 'ACa58a49594a95e0769bf2dae2bcb60dcb';
  const authToken = 'a25d41e5df9d583c6d03ac69485f74cd';
  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body: 'Your appointment is coming up on July 21 at 3PM',
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+905455431146'
    });

    console.log(message.sid);
  } catch (error) {
    console.log(error);
  }
};

export default sendMessage;
