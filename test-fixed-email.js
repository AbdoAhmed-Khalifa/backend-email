// Test script to verify fixed email functionality
const fetch = require('node-fetch');

async function testFixedEmailAPI() {
  const contactData = {
    name: 'Test User',
    email: 'test@example.com', // Replace with a real email to test auto-reply
    phone: '+1 (555) 123-4567',
    subject: 'Test Contact Form - Fixed Version',
    message: `Hi Abdelrahman,

This is a test message to verify that the email functionality is now working correctly.

Expected behavior:
1. You should receive a notification email at: abdelrahmanahmedkhalifa99@gmail.com
2. The client (test@example.com) should receive an auto-reply email

Please confirm if both emails are working properly.

Best regards,
Test User`,
  };

  try {
    console.log('🧪 Testing fixed contact form API...');
    console.log('Sending contact form data:', contactData);

    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Contact form submitted successfully!');
      console.log('Message:', result.message);
      console.log('Notification Message ID:', result.messageId);
      console.log('Auto-Reply Message ID:', result.autoReplyMessageId);
      console.log('\n📬 Expected emails:');
      console.log(
        '1. ✅ Notification email sent to: abdelrahmanahmedkhalifa99@gmail.com'
      );
      console.log('2. ✅ Auto-reply email sent to: test@example.com');
      console.log('\n🔍 Check both email inboxes to verify delivery!');
    } else {
      console.log('❌ Failed to submit contact form:', result.message);
      if (result.error) {
        console.log('Error details:', result.error);
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('Make sure the server is running on http://localhost:3000');
  }
}

// Run the test
testFixedEmailAPI();
