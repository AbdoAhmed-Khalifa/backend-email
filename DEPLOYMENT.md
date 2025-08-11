# 🚀 Deployment Guide - Vercel

This guide will help you deploy your Email API to Vercel for production use.

## Prerequisites

- Node.js 18+ installed
- Vercel account (free at [vercel.com](https://vercel.com))
- Gmail account with App Password configured

## Step 1: Prepare Your Project

### 1.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 1.2 Login to Vercel

```bash
vercel login
```

## Step 2: Configure Environment Variables

### 2.1 Local Development

Create a `.env` file in your project root:

```env
EMAIL_USER=abdelrahmanahmedkhalifa99@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=3000
NODE_ENV=development
```

### 2.2 Production Environment Variables

You'll set these in Vercel dashboard after deployment.

## Step 3: Deploy to Vercel

### 3.1 Initial Deployment

```bash
# From your project directory
vercel

# Follow the prompts:
# - Set up and deploy? → Yes
# - Which scope? → Select your account
# - Link to existing project? → No
# - What's your project's name? → email-api (or your preferred name)
# - In which directory is your code located? → ./ (current directory)
# - Want to override the settings? → No
```

### 3.2 Set Production Environment Variables

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the following variables:

| Variable     | Value                                 | Environment |
| ------------ | ------------------------------------- | ----------- |
| `EMAIL_USER` | `abdelrahmanahmedkhalifa99@gmail.com` | Production  |
| `EMAIL_PASS` | `your-gmail-app-password`             | Production  |
| `NODE_ENV`   | `production`                          | Production  |

### 3.3 Redeploy with Environment Variables

```bash
vercel --prod
```

## Step 4: Update CORS Origins

### 4.1 Update server.js

Replace the CORS origins in `server.js` with your actual domain:

```javascript
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://your-domain.vercel.app', 'https://your-domain.com']
        : [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:5173',
          ],
    credentials: true,
  })
);
```

### 4.2 Redeploy

```bash
vercel --prod
```

## Step 5: Test Your Deployment

### 5.1 Health Check

Visit: `https://your-domain.vercel.app/api/health`

Expected response:

```json
{
  "success": true,
  "message": "Email API is running",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "production"
}
```

### 5.2 Test Contact Form

Use the test script with your production URL:

```bash
# Update test-contact.js with your production URL
const response = await fetch('https://your-domain.vercel.app/api/contact', {
  // ... rest of the code
});
```

## Step 6: Integrate with Your Frontend

### 6.1 Update API Base URL

In your frontend application, update the API calls to use your production URL:

```javascript
// Development
const API_BASE = 'http://localhost:3000';

// Production
const API_BASE = 'https://your-domain.vercel.app';

// Usage
const response = await fetch(`${API_BASE}/api/contact`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});
```

### 6.2 Environment-based Configuration

Create a config file for different environments:

```javascript
// config.js
const config = {
  development: {
    apiBase: 'http://localhost:3000',
  },
  production: {
    apiBase: 'https://your-domain.vercel.app',
  },
};

export const API_BASE = config[process.env.NODE_ENV || 'development'].apiBase;
```

## Step 7: Monitor and Maintain

### 7.1 Vercel Dashboard

- Monitor function execution logs
- Check deployment status
- View analytics and performance

### 7.2 Environment Variables

- Keep your Gmail App Password secure
- Rotate passwords regularly
- Monitor email sending limits

### 7.3 Error Monitoring

The API includes error logging. Monitor your Vercel function logs for any issues.

## Troubleshooting

### Common Issues

#### 1. CORS Errors

**Problem**: Frontend can't connect to API
**Solution**: Update CORS origins in `server.js` with your actual domain

#### 2. Email Not Sending

**Problem**: Emails not being delivered
**Solution**:

- Check Gmail App Password is correct
- Verify environment variables are set in Vercel
- Check Vercel function logs for errors

#### 3. Function Timeout

**Problem**: API requests timing out
**Solution**:

- Vercel functions have a 10-second timeout
- Optimize email sending code
- Consider using background jobs for heavy operations

#### 4. Environment Variables Not Working

**Problem**: API can't read environment variables
**Solution**:

- Ensure variables are set for "Production" environment
- Redeploy after setting environment variables
- Check variable names match exactly

### Debug Commands

```bash
# Check deployment status
vercel ls

# View function logs
vercel logs

# Redeploy
vercel --prod

# Remove deployment
vercel remove
```

## Security Best Practices

### 1. Environment Variables

- Never commit `.env` files to version control
- Use Vercel's environment variable system
- Rotate passwords regularly

### 2. CORS Configuration

- Only allow necessary origins
- Don't use wildcards in production
- Regularly review and update allowed domains

### 3. Input Validation

- The API includes validation, but review for your use case
- Consider adding rate limiting for production
- Sanitize user inputs

### 4. Monitoring

- Set up alerts for function errors
- Monitor email sending success rates
- Track API usage and performance

## Performance Optimization

### 1. Cold Starts

- Vercel functions have cold start delays
- Consider keeping functions warm with health checks
- Optimize code for faster execution

### 2. Email Sending

- Use async/await properly
- Handle timeouts gracefully
- Consider batching emails if sending many

### 3. Response Times

- Keep response times under 10 seconds
- Optimize database queries if added later
- Use caching where appropriate

## Next Steps

After successful deployment:

1. **Test thoroughly** - Send test emails to verify functionality
2. **Monitor performance** - Check Vercel dashboard for metrics
3. **Set up alerts** - Configure notifications for errors
4. **Scale as needed** - Vercel automatically scales with usage
5. **Add features** - Consider adding rate limiting, analytics, etc.

## Support

If you encounter issues:

1. Check Vercel function logs
2. Verify environment variables
3. Test locally first
4. Check Gmail settings and App Password
5. Review this guide for common solutions

Your Email API is now production-ready and deployed on Vercel! 🎉
