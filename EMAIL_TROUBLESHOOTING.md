# Email Troubleshooting Guide

## Issues Fixed

### 1. ✅ Auto-Reply to Client

**Problem**: The contact form was only sending emails to the developer, not to the client.
**Solution**: Added auto-reply functionality that sends a thank you email to the client.

### 2. ✅ Fixed Bug in `/api/send-email` Route

**Problem**: Undefined variable `contactEmailData` was causing errors.
**Solution**: Fixed the HTML template reference to use the provided `html` parameter.

## How to Test

### 1. Start the Server

```bash
npm start
# or
node server.js
```

### 2. Test the Fixed Functionality

```bash
node test-fixed-email.js
```

### 3. Manual Testing

Send a POST request to `http://localhost:3000/api/contact` with:

```json
{
  "name": "Test User",
  "email": "your-email@example.com",
  "phone": "+1 (555) 123-4567",
  "subject": "Test Message",
  "message": "This is a test message"
}
```

## Expected Behavior

When a contact form is submitted:

1. ✅ **Notification Email**: Sent to `abdelrahmanahmedkhalifa99@gmail.com` (you)
2. ✅ **Auto-Reply Email**: Sent to the client's email address

## Common Issues & Solutions

### 1. Gmail App Password Issues

**Problem**: Gmail blocks less secure apps
**Solution**:

- Enable 2-factor authentication
- Generate an App Password
- Use the App Password in `EMAIL_PASS`

### 2. Environment Variables

**Problem**: Missing or incorrect environment variables
**Solution**: Create a `.env` file with:

```
EMAIL_USER=abdelrahmanahmedkhalifa99@gmail.com
EMAIL_PASS="your-app-password"
PORT=3000
```

### 3. CORS Issues

**Problem**: Frontend can't connect to backend
**Solution**: Check the CORS configuration in `server.js`

### 4. Email Delivery

**Problem**: Emails not reaching inbox
**Solution**:

- Check spam/junk folder
- Verify email addresses are correct
- Check Gmail sending limits (500/day for free accounts)

## Debugging Steps

1. **Check Server Logs**: Look for error messages in the console
2. **Verify Environment Variables**: Ensure `.env` file exists and is loaded
3. **Test Email Credentials**: Try sending a test email manually
4. **Check Network**: Ensure the server is accessible
5. **Monitor Email Delivery**: Check both sender and recipient inboxes

## API Endpoints

- `POST /api/contact` - Contact form submission (sends notification + auto-reply)
- `POST /api/send-email` - Generic email sending
- `GET /api/health` - Health check
- `GET /` - API information

## Support

If you're still having issues:

1. Check the server console for error messages
2. Verify your Gmail app password is correct
3. Test with a different email address
4. Check if emails are in spam folder
