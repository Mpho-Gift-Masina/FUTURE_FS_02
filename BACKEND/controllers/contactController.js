const { Resend } = require("resend");

const sendContactEmail = async (req, res) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }

    await resend.emails.send({
      from: process.env.CONTACT_SENDER,
      to: process.env.CONTACT_RECEIVER,
      reply_to: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact email error:", error);
    res.status(500).json({
      message: error.message || "Failed to send message",
    });
  }
};

module.exports = { sendContactEmail };