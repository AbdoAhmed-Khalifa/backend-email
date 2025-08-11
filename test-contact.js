// Test script for contact form API
const fetch = require('node-fetch');

async function testContactAPI() {
  const contactData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    subject: 'Website Development Project',
    message: `Hi Abdelrahman,

I'm interested in having a professional website developed for my business. I found your portfolio and I'm impressed with your work!

Here are some details about my project:
- E-commerce website for a small retail business
- Need user authentication and payment integration
- Mobile-responsive design
- Timeline: 2-3 months
- Budget: $5,000 - $8,000

Could you please let me know if you're available for this project and what your process would be?

Looking forward to hearing from you!

Best regards,
John Doe`
  };

  try {
    console.log('📧 Testing contact form API...');
    console.log('Sending contact form data:', contactData);
    
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Contact form submitted successfully!');
      console.log('Message:', result.message);
      console.log('Message ID:', result.messageId);
      console.log('\n📬 You should receive:');
      console.log('1. A notification email at: abdelrahmanahmedkhalifa99@gmail.com');
      console.log('2. An auto-reply sent to: john.doe@example.com');
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
testContactAPI();
