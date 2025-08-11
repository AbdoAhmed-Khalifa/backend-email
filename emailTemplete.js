// Simple Professional email template for contact form
const createContactEmailTemplate = data => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
          <style>
              body {
                  font-family: 'Inter', 'Segoe UI', sans-serif;
                  line-height: 1.6;
                  color: #1A1A1A;
                  background-color: #E4E4E6;
                  margin: 0;
                  padding: 15px;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #FFFFFF;
                  border-radius: 10px;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
              }
              .header {
                  background: linear-gradient(135deg, #000 0%, #1A1A1A 100%);
                  padding: 30px;
                  text-align: center;
              }
              .header h1 {
                  color: #FFFFFF;
                  margin: 0;
                  font-size: 24px;
                  font-weight: 600;
              }
              .content {
                  padding: 30px;
              }
              .info-section {
                  background-color: #E4E4E6;
                  padding: 20px;
                  border-radius: 8px;
                  margin-bottom: 20px;
              }
              .info-row {
                  margin-bottom: 12px;
                  display: flex;
                  align-items: center;
              }
              .info-label {
                  font-weight: 600;
                  color: #000;
                  width: 100px;
                  font-size: 14px;
              }
              .info-value {
                  color: #3A3A49;
                  font-size: 14px;
                  flex: 1;
              }
              .message-box {
                  background-color: #D6D9E9;
                  padding: 20px;
                  border-radius: 8px;
                  border-left: 4px solid #000;
                  margin: 20px 0;
              }
              .message-box h3 {
                  color: #000;
                  margin: 0 0 10px 0;
                  font-size: 16px;
              }
              .message-box p {
                  color: #3A3A49;
                  margin: 0;
                  font-size: 14px;
              }
              .footer {
                  background-color: #AFB0B6;
                  padding: 20px;
                  text-align: center;
                  font-size: 12px;
                  color: #1A1A1A;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>📧 New Contact Message</h1>
              </div>
              
              <div class="content">
                  <div class="info-section">
                      <div class="info-row">
                          <span class="info-label">Name:</span>
                          <span class="info-value">${data.name}</span>
                      </div>
                      <div class="info-row">
                          <span class="info-label">Email:</span>
                          <span class="info-value">${data.email}</span>
                      </div>
                      <div class="info-row">
                          <span class="info-label">Phone:</span>
                          <span class="info-value">${
                            data.phone || 'Not provided'
                          }</span>
                      </div>
                      <div class="info-row">
                          <span class="info-label">Subject:</span>
                          <span class="info-value">${data.subject}</span>
                      </div>
                  </div>
                  
                  <div class="message-box">
                      <h3>Message:</h3>
                      <p>${data.message.replace(/\n/g, '<br>')}</p>
                  </div>
              </div>
              
              <div class="footer">
                  Received: ${new Date().toLocaleString()}<br>
                  From: AbdelrahmanKhalifa.com
              </div>
          </div>
      </body>
      </html>
    `;
};

// Simple Auto-reply email template
const createAutoReplyTemplate = data => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Your Message</title>
          <style>
              body {
                  font-family: 'Inter', 'Segoe UI', sans-serif;
                  line-height: 1.6;
                  color: #1A1A1A;
                  background-color: #E4E4E6;
                  margin: 0;
                  padding: 20px;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #FFFFFF;
                  border-radius: 10px;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
              }
              .header {
                  background: linear-gradient(135deg, #000 0%, #1A1A1A 100%);
                  padding: 30px;
                  text-align: center;
              }
              .header h1 {
                  color: #FFFFFF;
                  margin: 0;
                  font-size: 24px;
                  font-weight: 600;
              }
              .content {
                  padding: 30px;
                  text-align: center;
              }
              .thank-you {
                  background-color: #D6D9E9;
                  padding: 25px;
                  border-radius: 8px;
                  margin-bottom: 25px;
              }
              .thank-you h2 {
                  color: #000;
                  margin: 0 0 15px 0;
                  font-size: 22px;
              }
              .thank-you p {
                  color: #3A3A49;
                  margin: 0 0 15px 0;
                  font-size: 16px;
              }
              .whatsapp-section {
                  background-color: #E4E4E6;
                  padding: 20px;
                  border-radius: 8px;
                  border: 2px solid #AFB0B6;
                  margin: 20px 0;
              }
              .whatsapp-section h3 {
                  color: #000;
                  margin: 0 0 10px 0;
                  font-size: 18px;
              }
              .whatsapp-section p {
                  color: #3A3A49;
                  margin: 0 0 15px 0;
                  font-size: 14px;
              }
              .whatsapp-btn {
                  display: inline-block;
                  background: linear-gradient(135deg, #000 0%, #3A3A49 100%);
                  color: #FFFFFF;
                  text-decoration: none;
                  padding: 12px 25px;
                  border-radius: 25px;
                  font-weight: 600;
                  font-size: 14px;
                  transition: all 0.3s ease;
              }
              .whatsapp-btn:hover {
                  background: linear-gradient(135deg, #3A3A49 0%, #000 100%);
                  transform: translateY(-2px);
              }
              .signature {
                  margin-top: 30px;
                  padding-top: 20px;
                  border-top: 2px solid #D6D9E9;
              }
              .signature p {
                  color: #62646C;
                  font-size: 14px;
                  margin: 5px 0;
              }
              .signature .name {
                  color: #000;
                  font-weight: 700;
                  font-size: 16px;
              }
              .footer {
                  background-color: #AFB0B6;
                  padding: 15px;
                  text-align: center;
                  font-size: 12px;
                  color: #1A1A1A;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>✅ Thank You!</h1>
              </div>
              
              <div class="content">
                  <div class="thank-you">
                      <h2>Hi ${data.name}! 👋</h2>
                      <p>Thank you for reaching out to me. I have received your message and I will contact you soon.</p>
                      <p>I appreciate your interest and will get back to you as quickly as possible.</p>
                  </div>
                  
                  <div class="whatsapp-section">
                      <h3>📱 Need Immediate Contact?</h3>
                      <p>If you need to reach me urgently, feel free to contact me on WhatsApp:</p>
                      <a href="https://wa.me/201065058121" class="whatsapp-btn">
                          💬 WhatsApp Me
                      </a>
                  </div>
                  
                  <div class="signature">
                      <p class="name">Abdelrahman Ahmed Khalifa</p>
                      <p>Web Developer & Full-Stack Engineer</p>
                      <p>📧 abdelrahmanahmedkhalifa99@gmail.com</p>
                      <p>🌐 abdelrahmankhalifa.com</p>
                  </div>
              </div>
              
              <div class="footer">
                  This is an automated response. I will contact you personally soon.
              </div>
          </div>
      </body>
      </html>
    `;
};

// Export the simple templates
module.exports = {
  createContactEmailTemplate,
  createAutoReplyTemplate,
};
