import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_PRIVATE_EMAIL,
    pass: process.env.NEXT_PRIVATE_PASS,
  },
});

export async function sendEmail({ to, subject, html }) {
  const mailOptions = {
    from: `"Prime Chain" <${process.env.NEXT_PRIVATE_EMAIL}>`,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(email, name, otp) {
  const subject = "Your OTP Code - Prime Chain";
  const html = `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc; padding:40px 0; font-family:Arial, sans-serif;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.05);">
        <tr>
    <td style="background-color: #0b132b; padding: 20px; text-align: center; display: flex; align-items: center; justify-content: center; gap: 5px;">
      <img src="/images/prime_chain_logo.svg" alt="Prime Chain Logo" style="width: 25px; margin-bottom: 10px;">
      <h2 style="color: #ffffff; margin: 0;">Prime Chain</h2>
          </td>
        </tr>

        <tr>
          <td style="padding:32px; color:#111827; font-size:16px; line-height:1.6;">
            <p>Hi <strong>${name}</strong>,</p>

            <p>You recently requested to reset your password for your <strong>Prime Chain</strong> account. Please use the OTP code below to complete the process:</p>

            <div style="margin:20px 0;">
              <h2 style="background:#0d9488; display:inline-block; color:#ffffff; padding:6px 28px; font-size:20px; font-weight: bolder; letter-spacing:6px; border-radius:8px; margin:0;">
                 ${otp}
              </h2>
            </div>

            <p>This OTP is valid for <strong>10 minutes</strong>. For your security, do not share this code with anyone.</p>

            <p>If you didn’t request a password reset, you can safely ignore this email. Your account will remain secure.</p>
          </td>
        </tr>

        <tr>
          <td style="background:#f1f5f9; padding:20px; text-align:center; font-size:13px; color:#6b7280;">
            <p style="margin:0;">&copy; ${new Date().getFullYear()} Prime Chain. All rights reserved.</p>
            <p style="margin:4px 0 0;">Your trusted investment partner.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

  `;
  return await sendEmail({ to: email, subject, html });
}

export async function sendPasswordChangeConfirmationEmail(email, name) {
  const subject = "Your Password Has Been Updated";
  const html = `
 <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e5e5e5; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
  
  <div style="background-color: #0b132b; padding: 20px; text-align: center; display: flex; align-items: center; justify-content: center; gap: 10px;">
    <img src="/images/prime_chain_logo.svg" alt="Prime Chain Logo" style="width: 35px; height: 35px; object-fit: contain;">
    <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">Prime Chain</h2>
  </div>

  <div style="padding: 30px;">
    <p style="font-size: 16px; color: #333333; margin-bottom: 15px;">Hi <strong>${name}</strong>,</p>

    <p style="font-size: 15px; color: #555555; line-height: 1.6; margin-bottom: 20px;">
      Your password has been <strong>successfully changed</strong>.  
    </p>

    <p style="font-size: 15px; color: #555555; line-height: 1.6; margin-bottom: 20px;">
      If you did not perform this action, please contact our support team <a href="mailto:support@primechain.com" style="color: #0b132b; text-decoration: none; font-weight: bold;">immediately</a>.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://primechain.com/auth/sign-in" style="background-color: #0b132b; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 15px; font-weight: bold; display: inline-block;">
        Go to Login
      </a>
    </div>
  </div>

  <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888888;">
    <p style="margin: 0;">&copy; ${new Date().getFullYear()} Prime Chain. All rights reserved.</p>
  </div>
</div>
  `;
  return await sendEmail({ to: email, subject, html });
}
export async function sendPasswordResetConfirmationEmail(email, name) {
  const subject = "Your Password Has Been Reset";
  const html = `
 <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e5e5e5; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
  
  <div style="background-color: #0b132b; padding: 20px; text-align: center; display: flex; align-items: center; justify-content: center; gap: 10px;">
    <img src="/images/prime_chain_logo.svg" alt="Prime Chain Logo" style="width: 35px; height: 35px; object-fit: contain;">
    <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">Prime Chain</h2>
  </div>

  <div style="padding: 30px;">
    <p style="font-size: 16px; color: #333333; margin-bottom: 15px;">Hi <strong>${name}</strong>,</p>

    <p style="font-size: 15px; color: #555555; line-height: 1.6; margin-bottom: 20px;">
      Your password has been <strong>successfully reset</strong>.  
    </p>

    <p style="font-size: 15px; color: #555555; line-height: 1.6; margin-bottom: 20px;">
      If you did not perform this action, please contact our support team <a href="mailto:support@primechain.com" style="color: #0b132b; text-decoration: none; font-weight: bold;">immediately</a>.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://primechain.com/auth/sign-in" style="background-color: #0b132b; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 15px; font-weight: bold; display: inline-block;">
        Go to Login
      </a>
    </div>
  </div>

  <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888888;">
    <p style="margin: 0;">&copy; ${new Date().getFullYear()} Prime Chain. All rights reserved.</p>
  </div>
</div>
  `;
  return await sendEmail({ to: email, subject, html });
}

export async function sendVerificationEmail({ email, name, token }) {
  const subject = "Verify Your Email - Prime Chain";

  const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;

  const html = `
  <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e5e5e5; border-radius: 10px; overflow: hidden;">
    <div style="background-color: #0b132b; padding: 20px; text-align: center; display: flex; align-items: center; justify-content: center; gap: 5px;">
      <img src="https://yourdomain.com/images/prime_chain_logo.svg" alt="Prime Chain Logo" style="width: 25px; margin-bottom: 10px;">
      <h2 style="color: #ffffff; margin: 0;">Prime Chain</h2>
    </div>
    
    <div style="background-image: url('https://yourdomain.com/images/prime_chain_office.svg'); background-size: cover; background-position: center; padding: 50px 20px; text-align: center; color: #ffffff;">
      <h1 style="margin: 0; font-size: 24px;">Simple. Secure. Smart Investing.</h1>
    </div>
  
    <div style="padding: 20px; text-align: center;">
      <h2 style="color: #0b132b;">You're Almost There, ${name}!</h2>
      <p style="color: #444; font-size: 16px; line-height: 1.5;">
        Welcome to <strong>Prime Chain</strong> – your gateway to secure and smarter investing.  
        To activate your account, please verify your email. It only takes a few seconds!
      </p>
  
      <a href="${verificationLink}" style="display: inline-block; background-color: #1e90ff; color: #ffffff; padding: 14px 28px; margin-top: 20px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: bold;">
        Verify My Email
      </a>

      <p style="margin-top: 15px; color: #888; font-size: 13px;">
        ⚠️ This verification link will expire in <strong>10 minutes</strong> for security reasons.
      </p>
  
      <p style="margin-top: 25px; color: #666; font-size: 14px;">
        By verifying, you’ll join <strong>120,000+ active investors</strong> already diversifying with Prime Chain.  
        Don’t miss out on smarter opportunities.
      </p>
    </div>
  
    <div style="background-color: #f7f7f7; padding: 15px; text-align: center; font-size: 12px; color: #999;">
      If you did not create an account with Prime Chain, please ignore this email.  
      <p>&copy; ${new Date().getFullYear()} Prime Chain. All rights reserved.</p>
    </div>
  </div>
  `;

  return await sendEmail({ to: email, subject, html });
}



export async function sendSubscriptionEmail({ email }) {
  const subject = "Welcome to Prime Chain!";

  const html = `
   <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Thank you for subscribing to PrimeChain!</h2>
        <p>We're excited to have you on board. As a subscriber, you'll be the first to know about:</p>
        <ul>
          <li>🚀 Investment updates</li>
          <li>📈 New features</li>
          <li>💰 Special offers</li>
        </ul>
        <p>Stay tuned for more!</p>
        <br />
        <p>Best regards,<br/>The PrimeChain Team</p>
        <small style="color: #888;">You’re receiving this email because you subscribed on our website.</small>
      </div>
  `;

  return await sendEmail({ to: email, subject, html });
}

export async function sendDepositNotificationEmail({
  email,
  name,
  crypto,
  amount,
  status,
  date,
  isAdmin = false,
  userName,
  userEmail,
}) {
  const subject = isAdmin
    ? "New Deposit Request - Action Required"
    : "Deposit Request Received - Prime Chain";

  const message = isAdmin
    ? `
      <p style="font-size: 15px; color: #333;">
        A new deposit has been submitted by <strong>${userName}</strong> || <a href="mailto:${userEmail}">${userEmail}</a>
      </p>
      <p style="font-size: 15px; color: #333;">
        Please review and verify the transaction in the admin dashboard.
      </p>
    `
    : `
      <p style="font-size: 15px; color: #555;">
        Your <strong>${crypto}</strong> deposit request of <strong>$${amount}</strong> has been received and is currently <strong>${status}</strong>.
      </p>
      <p style="font-size: 15px; color: #555;">
        Once our team verifies your payment, your deposit will be credited to your account. You’ll receive another confirmation when this happens.
      </p>
    `;

  const buttonLink = isAdmin
    ? "https://primechain.com/admin/deposits"
    : "https://primechain.com/dashboard";

  const buttonLabel = isAdmin ? "Review Deposit" : "View Deposit Status";

  const html = `
  <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e5e5e5; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
    
    <div style="background-color: #0b132b; padding: 20px; text-align: center; display: flex; align-items: center; justify-content: center; gap: 10px;">
      <img src="https://yourdomain.com/images/prime_chain_logo.svg" alt="Prime Chain Logo" style="width: 35px; height: 35px; object-fit: contain;">
      <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">Prime Chain</h2>
    </div>

    <div style="padding: 30px;">
      <p style="font-size: 16px; color: #333333; margin-bottom: 15px;">
        Hi <strong>${name}</strong>,
      </p>

      ${message}

      <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color:#f9fafb;">
          <td style="padding:10px; border:1px solid #e5e7eb;">Crypto</td>
          <td style="padding:10px; border:1px solid #e5e7eb;">${crypto}</td>
        </tr>
        <tr>
          <td style="padding:10px; border:1px solid #e5e7eb;">Amount (USD)</td>
          <td style="padding:10px; border:1px solid #e5e7eb;">$${amount}</td>
        </tr>
        <tr style="background-color:#f9fafb;">
          <td style="padding:10px; border:1px solid #e5e7eb;">Status</td>
          <td style="padding:10px; border:1px solid #e5e7eb;">
            ${status.charAt(0).toUpperCase() + status.slice(1)}
          </td>
        </tr>
        <tr>
          <td style="padding:10px; border:1px solid #e5e7eb;">Date</td>
          <td style="padding:10px; border:1px solid #e5e7eb;">
            ${new Date(date).toLocaleString()}
          </td>
        </tr>
      </table>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${buttonLink}" style="background-color: #0b132b; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 15px; font-weight: bold; display: inline-block;">
          ${buttonLabel}
        </a>
      </div>
    </div>

    <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888888;">
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} Prime Chain. All rights reserved.</p>
      <p style="margin: 5px 0 0;">Your trusted investment partner.</p>
    </div>
  </div>
  `;

  return await sendEmail({
    to: email,
    subject,
    html,
  });
}


export async function sendWithdrawalNotificationEmail({
  email,
  name,
  crypto,
  amount,
  walletAddress,
  status,
  date,
  isAdmin = false,
  userName,
  userEmail,
}) {
  const subject = isAdmin
    ? "New Withdrawal Request - Action Required"
    : "Withdrawal Request Received - Prime Chain";

  const message = isAdmin
    ? `
      <p style="font-size: 15px; color: #333;">
        A new withdrawal has been submitted by <strong>${userName}</strong> 
        (<a href="mailto:${userEmail}">${userEmail}</a>).
      </p>
      <p style="font-size: 15px; color: #333;">
        Please review and process this request in the admin dashboard.
      </p>
    `
    : `
      <p style="font-size: 15px; color: #555;">
        Your <strong>${crypto}</strong> withdrawal request of <strong>$${amount}</strong> 
        to the wallet address below has been received and is currently 
        <strong>${status}</strong>.
      </p>
      <p style="font-size: 15px; color: #555;">
        Once our team reviews and processes your request, you will receive a confirmation email.
      </p>
    `;

  const buttonLink = isAdmin
    ? "https://primechain.com/admin/withdrawals"
    : "https://primechain.com/dashboard";

  const buttonLabel = isAdmin ? "Review Withdrawal" : "View Withdrawal Status";

  const html = `
  <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e5e5e5; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
    
    <div style="background-color: #0b132b; padding: 20px; text-align: center; display: flex; align-items: center; justify-content: center; gap: 10px;">
      <img src="https://yourdomain.com/images/prime_chain_logo.svg" alt="Prime Chain Logo" style="width: 35px; height: 35px; object-fit: contain;">
      <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">Prime Chain</h2>
    </div>

    <div style="padding: 30px;">
      <p style="font-size: 16px; color: #333333; margin-bottom: 15px;">
        Hi <strong>${name}</strong>,
      </p>

      ${message}

      <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color:#f9fafb;">
          <td style="padding:10px; border:1px solid #e5e7eb;">Crypto</td>
          <td style="padding:10px; border:1px solid #e5e7eb;">${crypto}</td>
        </tr>
        <tr>
          <td style="padding:10px; border:1px solid #e5e7eb;">Amount (USD)</td>
          <td style="padding:10px; border:1px solid #e5e7eb;">$${amount}</td>
        </tr>
        <tr style="background-color:#f9fafb;">
          <td style="padding:10px; border:1px solid #e5e7eb;">Wallet Address</td>
          <td style="padding:10px; border:1px solid #e5e7eb;">${walletAddress}</td>
        </tr>
        <tr>
          <td style="padding:10px; border:1px solid #e5e7eb;">Status</td>
          <td style="padding:10px; border:1px solid #e5e7eb;">
            ${status.charAt(0).toUpperCase() + status.slice(1)}
          </td>
        </tr>
        <tr style="background-color:#f9fafb;">
          <td style="padding:10px; border:1px solid #e5e7eb;">Date</td>
          <td style="padding:10px; border:1px solid #e5e7eb;">
            ${new Date(date).toLocaleString()}
          </td>
        </tr>
      </table>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${buttonLink}" style="background-color: #0b132b; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 15px; font-weight: bold; display: inline-block;">
          ${buttonLabel}
        </a>
      </div>
    </div>

    <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888888;">
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} Prime Chain. All rights reserved.</p>
      <p style="margin: 5px 0 0;">Your trusted investment partner.</p>
    </div>
  </div>
  `;

  return await sendEmail({
    to: email,
    subject,
    html,
  });
}
