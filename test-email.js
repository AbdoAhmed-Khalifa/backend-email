// Test script to send an email using the API
const fetch = require('node-fetch');

async function testEmailAPI() {
  const emailData = {
    to: 'abdelrahmanahmedkhalifa99@gmail.com', // Replace with your email
    subject: 'Test Email from Node.js API',
    text: 'This is a test email sent from the Node.js API using Nodemailer.',
    html: `
      <h1>Test Email</h1>
      <p>This is a test email sent from the Node.js API using Nodemailer.</p>
      <p><strong>Features:</strong></p>
      <ul>
        <li>HTML formatting support</li>
        <li>Plain text fallback</li>
        <li>RESTful API endpoint</li>
        <li>Error handling</li>
      </ul>
      <p>Sent at: ${new Date().toLocaleString()}</p>
    `,
  };

  try {
    console.log('Sending test email...');

    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Email sent successfully!');
      console.log('Message ID:', result.messageId);
    } else {
      console.log('❌ Failed to send email:', result.message);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('Make sure the server is running on http://localhost:3000');
  }
}

// Run the test
testEmailAPI();
