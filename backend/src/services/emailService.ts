import nodemailer from 'nodemailer';

// Create a test account for development (replace with real SMTP in production)
const createTestAccount = async () => {
  try {
    console.log('Creating test email account...');
    const testAccount = await nodemailer.createTestAccount();
    console.log('Test account created:', testAccount.user);
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    
    console.log('Test transporter created successfully');
    return transporter;
  } catch (error) {
    console.error('Error creating test account:', error);
    return null;
  }
};

// For production, use real SMTP settings
const createProductionTransporter = () => {
  console.log('Creating production email transporter...');
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  console.log('Production transporter created');
  return transporter;
};

export const sendWelcomeEmail = async (userEmail: string, userName: string) => {
  try {
    console.log('Starting welcome email process for:', userEmail);
    
    const isProduction = process.env.NODE_ENV === 'production';
    console.log('Environment:', isProduction ? 'production' : 'development');
    
    const transporter = isProduction ? createProductionTransporter() : await createTestAccount();

    if (!transporter) {
      console.error('Failed to create email transporter');
      return false;
    }

    console.log('Email transporter created successfully');

    const mailOptions = {
      from: isProduction ? process.env.SMTP_USER : '"Roster.AI" <noreply@roster.ai>',
      to: userEmail,
      subject: '🎉 Welcome to Roster.AI - Your Dating Journey Starts Here!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #ff006e 0%, #ff6b9d 100%); color: white;">
          <div style="text-align: center; padding: 40px 20px;">
            <h1 style="color: #00ff88; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); margin-bottom: 10px;">THE ROSTER AI</h1>
            <p style="font-size: 18px; margin-bottom: 30px; opacity: 0.9;">DATING IS A MESS • SORT IT OUT</p>
            
            <div style="background: rgba(255,255,255,0.1); border-radius: 15px; padding: 30px; margin: 20px 0;">
              <h2 style="color: #00ff88; margin-bottom: 20px;">Welcome, ${userName}! 🎉</h2>
              
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                You've just joined the most intelligent dating evaluation platform. Get ready to transform your dating life with AI-powered insights and comprehensive roster management.
              </p>
              
              <div style="background: rgba(0,255,136,0.2); border-radius: 10px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #00ff88; margin-bottom: 15px;">🚀 What You Can Do Now:</h3>
                <ul style="text-align: left; line-height: 1.8;">
                  <li>📝 Add your first date evaluation</li>
                  <li>📸 Upload profile pictures for AI analysis</li>
                  <li>📊 Track chemistry and attraction ratings</li>
                  <li>🧠 Get personalized AI insights</li>
                  <li>📱 Build your comprehensive dating roster</li>
                </ul>
              </div>
              
              <div style="margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL || 'https://theroster-ai-site.vercel.app'}" 
                   style="background: linear-gradient(45deg, #00ff88, #00cc6a); color: #000; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: bold; display: inline-block; text-transform: uppercase; letter-spacing: 1px;">
                  Start Your Dating Journey
                </a>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 10px;">
              <p style="font-size: 14px; opacity: 0.8;">
                Ready to revolutionize your dating life? Let's make every date count! 💪
              </p>
            </div>
          </div>
        </div>
      `,
    };

    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    const info = await transporter.sendMail(mailOptions);
    
    if (isProduction) {
      console.log('Welcome email sent successfully to:', userEmail);
      console.log('Message ID:', info.messageId);
    } else {
      console.log('Test email sent successfully!');
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      console.log('Message ID:', info.messageId);
    }
    
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    return false;
  }
};

export const sendPasswordResetEmail = async (userEmail: string, resetToken: string) => {
  try {
    console.log('Starting password reset email process for:', userEmail);
    
    const isProduction = process.env.NODE_ENV === 'production';
    const transporter = isProduction ? createProductionTransporter() : await createTestAccount();

    if (!transporter) {
      console.error('Failed to create email transporter');
      return false;
    }

    const resetUrl = `${process.env.FRONTEND_URL || 'https://theroster-ai-site.vercel.app'}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: isProduction ? process.env.SMTP_USER : '"Roster.AI" <noreply@roster.ai>',
      to: userEmail,
      subject: '🔐 Reset Your Roster.AI Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #ff006e 0%, #ff6b9d 100%); color: white;">
          <div style="text-align: center; padding: 40px 20px;">
            <h1 style="color: #00ff88; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); margin-bottom: 10px;">THE ROSTER AI</h1>
            
            <div style="background: rgba(255,255,255,0.1); border-radius: 15px; padding: 30px; margin: 20px 0;">
              <h2 style="color: #00ff88; margin-bottom: 20px;">Password Reset Request 🔐</h2>
              
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                We received a request to reset your password. Click the button below to create a new password.
              </p>
              
              <div style="margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="background: linear-gradient(45deg, #00ff88, #00cc6a); color: #000; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: bold; display: inline-block; text-transform: uppercase; letter-spacing: 1px;">
                  Reset Password
                </a>
              </div>
              
              <p style="font-size: 14px; opacity: 0.8; margin-top: 20px;">
                If you didn't request this, you can safely ignore this email. This link will expire in 1 hour.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    
    if (isProduction) {
      console.log('Password reset email sent successfully to:', userEmail);
    } else {
      console.log('Test password reset email sent. Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
}; 