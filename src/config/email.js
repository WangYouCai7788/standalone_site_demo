// Email notification config (optional)
// To enable email notifications when customers submit inquiries:
// 1. Sign up free at https://www.emailjs.com (200 emails/month free)
// 2. Create an Email Service, get the Service ID
// 3. Create an Email Template, get the Template ID
// 4. Get your Public Key from Account > API Keys
// 5. Fill in the values below
//
// If these are empty, inquiries will still be saved to localStorage
// and visible in the Admin dashboard.

export const emailConfig = {
  enabled: false,           // Set to true after configuring below
  serviceId: '',            // e.g. 'service_abc123'
  templateId: '',           // e.g. 'template_def456'
  publicKey: ''             // e.g. 'xyz789_publicKey'
}
