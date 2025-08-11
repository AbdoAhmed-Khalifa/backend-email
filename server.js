const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const {
  createContactEmailTemplate,
  createAutoReplyTemplate,
} = require('./emailTemplete');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? [
            'https://abdelrahmankhalifa.com',
            'https://www.abdelrahmankhalifa.com',
            'https://backend-email-one.vercel.app',
          ]
        : [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:5173',
          ],
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Contact form API route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message:
          'Missing required fields: name, email, subject, and message are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    const transporter = createTransporter();

    // Send email to you (the web developer)
    const contactEmailData = {
      name,
      email,
      phone: phone || 'Not provided',
      subject,
      message,
    };

    const contactEmailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Contact: ${subject} - From ${name}`,
      html: createContactEmailTemplate(contactEmailData),
      text: `
New Contact Message

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}

Message:
${message}

Received: ${new Date().toLocaleString()}
      `,
    };

    // Send auto-reply to the contact
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Contacting Me - Abdelrahman Ahmed Khalifa',
      html: createAutoReplyTemplate(contactEmailData),
      text: `
Thank you for contacting me!

Dear ${name},

Thank you for reaching out through AbdelrahmanKhalifa.com. I've received your message and will respond within 24-48 hours during business days.

Best regards,
Abdelrahman Ahmed Khalifa
Web Developer & Full-Stack Engineer

This is an automated response. For urgent matters, contact me at: abdelrahmanahmedkhalifa99@gmail.com
      `,
    };

    // Send both emails
    const [contactInfo, autoReplyInfo] = await Promise.all([
      transporter.sendMail(contactEmailOptions),
      transporter.sendMail(autoReplyOptions),
    ]);

    console.log('Contact form submitted successfully:', {
      contactMessageId: contactInfo.messageId,
      autoReplyMessageId: autoReplyInfo.messageId,
      from: name,
      email: email,
    });

    res.status(200).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      messageId: contactInfo.messageId,
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Internal server error',
    });
  }
});

// Generic email API route (for other uses)
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    // Validate required fields
    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({
        success: false,
        message:
          'Missing required fields: to, subject, and either text or html content',
      });
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Internal server error',
    });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Email API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Professional Email API Server',
    endpoints: {
      'POST /api/contact': 'Contact form submission',
      'POST /api/send-email': 'Generic email sending',
      'GET /api/health': 'Health check',
    },
    developer: 'Abdelrahman Ahmed Khalifa',
    version: '1.0.0',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📧 API endpoints:`);
  console.log(`  POST http://localhost:${PORT}/api/contact`);
  console.log(`  POST http://localhost:${PORT}/api/send-email`);
  console.log(`  GET  http://localhost:${PORT}/api/health`);
});
