export const subscriptionReminderEmailTemplate = ({ userName, name, renewalDate }) => {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hello ${userName},</h2>
          <p>We hope you're enjoying your <strong>${name}</strong> subscription.</p>
          <p>This is a friendly reminder that your subscription is set to expire on <strong>${renewalDate}</strong>.</p>
          <p>To avoid any interruptions, please make sure to renew your subscription before the expiration date.</p>
          <p>If you have any questions or need help, feel free to reach out to our support team.</p>
          <br/>
          <p>Thank you,</p>
          <p><strong>Your Company Team</strong></p>
        </body>
      </html>
    `;
  };
  