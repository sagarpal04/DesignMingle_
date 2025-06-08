import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { type, address, name, email, productId, price, productImg } =
      await request.json();

    // Calculate delivery date (2 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 2);
    const formattedDate = deliveryDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "nexus.bank.org@gmail.com",
        pass: "jfxaxtmlbhplmvwe",
      },
    });

    // Email content
    const { subject, html } =
      type === "success"
        ? getSuccessEmail(name, address, email, productId, price, formattedDate)
        : getFailureEmail(name, address, email, productId, price);

    const base64Image = productImg.split("base64,")[1]; // extract base64 from data URL
    console.log("Email TO : ", email);
    const mailOptions = {
      from: '"DesignMingle" <nexus.bank.org@gmail.com>',
      to: email,
      subject: subject,
      html: html,
      attachments: [
        {
          filename: "product.png",
          content: base64Image,
          encoding: "base64",
          cid: "productimage@cid", // referenced in <img src="cid:productimage@cid" />
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
// Success Email Template
function getSuccessEmail(name, address, email, productId, price, deliveryDate) {
  return {
    subject: `Your Order Confirmation`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
          body { font-family: 'Poppins', sans-serif; line-height: 1.6; color: #4a4a4a; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f7f9fc; }
          .container { background: #ffffff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden; margin: 20px auto; }
          .header { background: linear-gradient(135deg,rgb(110, 251, 183),rgb(66, 142, 50)); padding: 30px; text-align: center; color: white; }
          .header h1 { margin: 0; font-weight: 600; font-size: 24px; }
          .header p { margin: 10px 0 0; opacity: 0.9; }
          .content { padding: 25px 30px; }
          .product-image-container { text-align: center; margin: 20px 0; }
          .product-image { max-width: 100%; border-radius: 8px; box-shadow: 0 8px 16px rgba(0,0,0,0.1); border: 1px solid #f0f0f0; }
          .order-details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 25px 0; }
          .order-details h2 { margin-top: 0; color: #333; font-size: 18px; }
          .detail-row { display: flex; margin-bottom: 10px; }
          .detail-label { font-weight: 500; min-width: 120px; color: #666; }
          .detail-value { color: #333; }
          .footer { text-align: center; padding: 20px; color: #888; font-size: 13px; border-top: 1px solid #eee; }
          .thank-you { font-size: 16px; margin-bottom: 20px; line-height: 1.6; }
          .highlight-box { background: #f0f7ff; border-left: 4px solid #6e8efb; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank you for your order!</h1>
            <p>Hi ${name}, your custom product is confirmed</p>
          </div>
  
          <div class="content">
            <div class="thank-you">
              We're excited to let you know we've received your order and it's now being processed. 
              Here's what you ordered:
            </div>
  
            <div class="product-image-container">
              <img src="cid:productimage@cid" alt="Your custom design" class="product-image" />
            </div>
  
            <div class="order-details">
              <h2>Order Summary</h2>
              </div>
              <div class="detail-row">
                <div class="detail-label">Product:</div>
                <div class="detail-value">Custom Designed Shirt</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Total:</div>
                <div class="detail-value">$${(price / 100).toFixed(2)}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Delivery Date:</div>
                <div class="detail-value">${deliveryDate}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Shipping To:</div>
                <div class="detail-value">${address}</div>
              </div>
            </div>
  
            <div class="highlight-box">
              <strong>What's next?</strong> We'll send you another email when your item ships. 
              The estimated delivery date is ${deliveryDate}.
            </div>
  
            <div class="footer">
              <p>If you have any questions, reply to this email or contact us at support@yourbrand.com</p>
              <p>© ${new Date().getFullYear()} Your Brand Name. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
      `,
  };
}

// Failure Email Template
function getFailureEmail(name, address, email, productId, price) {
  return {
    subject: `We couldn't process your order`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
          body { font-family: 'Poppins', sans-serif; line-height: 1.6; color: #4a4a4a; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f7f9fc; }
          .container { background: #ffffff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden; margin: 20px auto; }
          .header { background: linear-gradient(135deg, #ff6b6b, #ff8e8e); padding: 30px; text-align: center; color: white; }
          .header h1 { margin: 0; font-weight: 600; font-size: 24px; }
          .header p { margin: 10px 0 0; opacity: 0.9; }
          .content { padding: 25px 30px; }
          .product-image-container { text-align: center; margin: 20px 0; }
          .product-image { max-width: 100%; border-radius: 8px; box-shadow: 0 8px 16px rgba(0,0,0,0.1); border: 1px solid #f0f0f0; }
          .order-details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 25px 0; }
          .order-details h2 { margin-top: 0; color: #333; font-size: 18px; }
          .detail-row { display: flex; margin-bottom: 10px; }
          .detail-label { font-weight: 500; min-width: 120px; color: #666; }
          .detail-value { color: #333; }
          .footer { text-align: center; padding: 20px; color: #888; font-size: 13px; border-top: 1px solid #eee; }
          .message { font-size: 16px; margin-bottom: 20px; line-height: 1.6; }
          .highlight-box { background: #fff0f0; border-left: 4px solid #ff6b6b; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; }
          .action-button { display: inline-block; background: #ff6b6b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; margin-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Processing Failed</h1>
            <p>Hi ${name}, we couldn't complete your order</p>
          </div>
  
          <div class="content">
            <div class="message">
              We were unable to process your payment for the order below. Please try again or use a different payment method.
            </div>
  
            <div class="product-image-container">
              <img src="cid:productimage@cid" alt="Your custom design" class="product-image" />
            </div>
  
            <div class="order-details">
              <h2>Order Summary</h2>
              <div class="detail-row">
                <div class="detail-label">Product:</div>
                <div class="detail-value">Custom Designed Shirt</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Total:</div>
                <div class="detail-value">$${(price / 100).toFixed(2)}</div>
              </div>
            </div>
  
            <div class="highlight-box">
              <strong>What happened?</strong> The payment authorization failed. This might be due to insufficient funds, incorrect card details, or bank restrictions.
            </div>
  
            <div style="text-align: center; margin: 25px 0;">
              <a href="#" class="action-button">Try Payment Again</a>
            </div>
  
            <div class="footer">
              <p>Need help? Contact our support team at support@yourbrand.com</p>
              <p>© ${new Date().getFullYear()} Your Brand Name. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
      `,
  };
}
