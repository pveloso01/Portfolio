# Email Configuration Guide

This guide explains how to configure email sending for the contact form in both development and production environments.

## Development Setup (Current Default)

By default, emails are printed to the console (terminal) during development:

```bash
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```

When someone submits the contact form, you'll see the email content in your Django server logs.

## Production Setup (Real Email Sending)

To send real emails in production, you need to configure SMTP settings.

### Step 1: Generate an Outlook App Password

1. Go to [Microsoft Account Security](https://account.microsoft.com/security)
2. Sign in with your Outlook account (`pedrovelosofernandes@outlook.com`)
3. Click on **"Advanced security options"**
4. Under **"App passwords"**, click **"Create a new app password"**
5. Name it something like "Portfolio Contact Form"
6. Copy the generated password (looks like: `abcd-efgh-ijkl-mnop`)

**Important:** This is NOT your regular Outlook password - it's a special app password for security.

### Step 2: Update Environment Variables

In your production `.env` file, update these variables:

```bash
# Enable SMTP backend
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend

# SMTP Settings (already configured for Outlook)
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USE_TLS=True

# Your Outlook credentials
EMAIL_HOST_USER=pedrovelosofernandes@outlook.com
EMAIL_HOST_PASSWORD=abcd-efgh-ijkl-mnop  # Replace with your app password

# Email addresses
DEFAULT_FROM_EMAIL=pedrovelosofernandes@outlook.com
CONTACT_EMAIL=pedrovelosofernandes@outlook.com
```

### Step 3: Test Email Sending

After configuring, test the contact form:

1. Start your Django server
2. Submit a test message through the contact form
3. Check your `pedrovelosofernandes@outlook.com` inbox

## Troubleshooting

### "Authentication Failed" Error

- Verify you're using an **app password**, not your regular password
- Check that 2FA is enabled on your Microsoft account
- Ensure the email address matches exactly

### "SMTP Connection Refused"

- Check firewall settings
- Verify `EMAIL_PORT=587` and `EMAIL_USE_TLS=True`
- Ensure your server can connect to `smtp-mail.outlook.com`

### Emails Not Arriving

- Check spam/junk folder
- Verify `CONTACT_EMAIL` is set correctly
- Check Django logs for error messages
- Test with a simple email first:

```python
from django.core.mail import send_mail

send_mail(
    'Test Subject',
    'Test message',
    'pedrovelosofernandes@outlook.com',
    ['pedrovelosofernandes@outlook.com'],
)
```

## Alternative Email Providers

### SendGrid (Recommended for High Volume)

```bash
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=apikey
EMAIL_HOST_PASSWORD=your-sendgrid-api-key
DEFAULT_FROM_EMAIL=pedrovelosofernandes@outlook.com
```

### Gmail

```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-gmail-app-password
```

## Security Notes

- **Never commit** `.env` files with real passwords to Git
- Use environment variables in production (Heroku, Railway, etc.)
- Regenerate app passwords if compromised
- Keep `EMAIL_HOST_PASSWORD` secret
