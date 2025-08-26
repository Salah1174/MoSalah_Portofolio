const router = require("express").Router();
const nodemailer = require("nodemailer");
const ContactMessage = require("../models/contactMessageModel");

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send contact message
router.post("/send-message", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    // Save message to database
    const contactMessage = new ContactMessage({
      name,
      email,
      message,
    });
    await contactMessage.save();

    // Send email notification to admin
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: `New Contact Message from ${name}`,
          html: `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><small>Sent from Portfolio Contact Form</small></p>
          `,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.log(
          "Email sending failed, but message saved:",
          emailError.message
        );
        // Continue execution - message is saved even if email fails
      }
    }

    res.status(200).send({
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).send({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
});

// Get all contact messages (admin only)
router.get("/messages", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to fetch messages",
    });
  }
});

// Mark message as read (admin only)
router.put("/messages/:id/read", async (req, res) => {
  try {
    await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true });
    res.status(200).send({
      success: true,
      message: "Message marked as read",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to update message",
    });
  }
});

module.exports = router;
