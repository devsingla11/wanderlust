const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Email options
  const mailOptions = {
    from: `Wanderlust Travel <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html || options.message
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

// Email templates
const emailTemplates = {
  welcome: (userName) => ({
    subject: 'Welcome to Wanderlust - Your Adventure Awaits!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Welcome to Wanderlust!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your journey begins here</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${userName}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Welcome to Wanderlust! We're thrilled to have you join our community of adventure seekers and travel enthusiasts.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            With Wanderlust, you'll discover:
          </p>
          
          <ul style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            <li>🏔️ Amazing destinations around the world</li>
            <li>👥 Expert guides and local experiences</li>
            <li>💎 Luxury accommodations and travel packages</li>
            <li>🛡️ Safe and secure booking process</li>
            <li>🌟 Personalized travel recommendations</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/destinations" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 25px; 
                      display: inline-block; 
                      font-weight: bold;">
              Start Exploring
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If you have any questions or need assistance, don't hesitate to reach out to our support team.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            Happy travels!<br>
            The Wanderlust Team
          </p>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            © 2024 Wanderlust. All rights reserved.
          </p>
        </div>
      </div>
    `
  }),

  verification: (userName, verificationUrl) => ({
    subject: 'Verify Your Email - Wanderlust',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Email Verification</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Complete your registration</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${userName}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for registering with Wanderlust! To complete your registration and start exploring amazing destinations, please verify your email address.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 25px; 
                      display: inline-block; 
                      font-weight: bold;">
              Verify Email Address
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If the button above doesn't work, you can copy and paste this link into your browser:
          </p>
          
          <p style="color: #667eea; word-break: break-all; margin-bottom: 20px;">
            ${verificationUrl}
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            This link will expire in 24 hours for security reasons.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            If you didn't create an account with Wanderlust, you can safely ignore this email.
          </p>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            © 2024 Wanderlust. All rights reserved.
          </p>
        </div>
      </div>
    `
  }),

  passwordReset: (userName, resetUrl) => ({
    subject: 'Password Reset Request - Wanderlust',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Password Reset</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Secure your account</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${userName}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            You recently requested to reset your password for your Wanderlust account. Click the button below to reset it.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 25px; 
                      display: inline-block; 
                      font-weight: bold;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If the button above doesn't work, you can copy and paste this link into your browser:
          </p>
          
          <p style="color: #667eea; word-break: break-all; margin-bottom: 20px;">
            ${resetUrl}
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            This password reset link will expire in 10 minutes for security reasons.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If you didn't request a password reset, please ignore this email or contact support if you have concerns.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            Best regards,<br>
            The Wanderlust Team
          </p>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            © 2024 Wanderlust. All rights reserved.
          </p>
        </div>
      </div>
    `
  }),

  bookingConfirmation: (userName, bookingDetails) => ({
    subject: 'Booking Confirmation - Wanderlust',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Booking Confirmed!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your adventure awaits</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${userName}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Great news! Your booking has been confirmed. Here are the details of your upcoming adventure:
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 15px;">Booking Details</h3>
            <p><strong>Booking Number:</strong> ${bookingDetails.bookingNumber}</p>
            <p><strong>Destination:</strong> ${bookingDetails.destination}</p>
            <p><strong>Travel Dates:</strong> ${bookingDetails.startDate} - ${bookingDetails.endDate}</p>
            <p><strong>Travelers:</strong> ${bookingDetails.travelers}</p>
            <p><strong>Total Amount:</strong> $${bookingDetails.totalAmount}</p>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            We'll send you detailed travel information and itinerary closer to your departure date.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            If you have any questions, please don't hesitate to contact our support team.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            Happy travels!<br>
            The Wanderlust Team
          </p>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            © 2024 Wanderlust. All rights reserved.
          </p>
        </div>
      </div>
    `
  })
};

module.exports = { sendEmail, emailTemplates }; 