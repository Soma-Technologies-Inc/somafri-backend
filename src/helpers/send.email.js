import nodemailer from 'nodemailer';
import axios from 'axios';

const dotenv = require('dotenv');

dotenv.config();

/**
 * Class for dealing with email activities
 */
class mailer {
	/**
   * signup a user and saving user data in the database
   * @param {Object} token a token from contains user details
   * @param {Object} userName a userName of the user registered
   * @returns {Object} An email template contains message of the user
   */
	static activateAccountView(token, userName, translateResults) {
		const view = `<!DOCTYPE html>
    <html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Lato', sans-serif;
                    font-style: normal;
                    font-weight: 400;
                    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                }
                @font-face {
                    font-family: 'Lato', sans-serif;
                    font-style: normal;
                    font-weight: 700;
                    src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                }
                @font-face {
                    font-family: 'Lato', sans-serif;
                    font-style: italic;
                    font-weight: 400;
                    src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                }
                @font-face {
                    font-family: 'Lato', sans-serif;
                    font-style: italic;
                    font-weight: 700;
                    src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                }
            }
            /* CLIENT-SPECIFIC STYLES */
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
            img {
                -ms-interpolation-mode: bicubic;
            }
            /* RESET STYLES */
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
            table {
                border-collapse: collapse !important;
            }
            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }
            /* iOS BLUE LINKS */
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: 'Lato', sans-serif;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
            /* MOBILE STYLES */
            @media screen and (max-width:600px) {
                h1 {
                    font-size: 32px !important;
                    line-height: 32px !important;
                }
            }
            /* ANDROID CENTER FIX */
            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
        </style>
    </head>
    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
        <!-- HIDDEN PREHEADER TEXT -->
        <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <!-- LOGO -->
            <tr>
                <td background-color= "transparent" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td background-color= "transparent" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr >
                            <td bgcolor="#ffffff" align="center" valign="top" style="padding: 10px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px; border-bottom: double #2ED47A;">
                                <img src="https://res.cloudinary.com/drpye5niv/image/upload/v1592941057/somafri_ashoka.png" width="125" height="120" style="display: block; border: 0px; float: left; height: 20%; width: auto;" />
                                <p style="font-size: 28px; font-weight: 400; ">${translateResults.translatedTitle} ${userName}</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; text-align: center; font-family: 'Lato', sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">${translateResults.firstWords}</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="border-radius: 3px;" bgcolor="#2ED47A"><a href="${process.env.BASE_URL}/soma/auth/activate/${token}" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; display: inline-block;">Confirm Account</a></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr> <!-- COPY -->
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px;    text-align: center; color: #666666; font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">
                                    ${translateResults.secondWords}<br>
                                    ${translateResults.thrirdWords}</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td bgcolor="#fafafa" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                                <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">${translateResults.fourthWords}</h2>
                                <ul style="list-style: none; text-align: justify;width: 80%;">
                                    <li style="margin-right: 5px;"><span style="color: #2ED47A;">Email</span>: info@somafri.com</li>
                                    <li style="margin-right: 5px;"><span style="color: #2ED47A;">Tell</span>: +250782979784, +13196771283</li>
                                    <li style="margin-right: 5px;"><span style="color: #2ED47A;">Location</span>: Rwanda: kg 20 st 28, USA: Des moines iowa </li>
                                </ul>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style=" text-align: center;">
<h2 style="color: #2ED47A;">Soma Technology</h2 style="color: #2ED47A;">
                </td>
            </tr>
        </table>
    </body>
    </html>
`;
		return view;
	}

	/**
   * this is a reset password review
   * @param {Object} token a user token
   * @param {Object} userName a userName of the user registered
   * @returns {Object} An email template contains message of the user
   */
	static resetPasswordView(token, userName) {
		const view = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
      <style>
      .Email-wrapper{
          display:grid;
          width: 50%;
          min-height: 50px;
          margin: 10px;
         
      }
      .Email-wrapper_log{
          justify-self: start;
          margin: 10px;
      }
      .Email-wrapper_button{
          background-color: #0094FF;
          width: 40%;
          color: white;
          padding: 10px;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
      }
      .Email-wrapper_button:hover {
        cursor: pointer;
      }
      .Email-wrapper_body_message , .Email-wrapper_body_name{
      align-self: center; 
     margin-left: 25px;
     margin: 10px;
     color: gray;
      }
      .Email-wrapper_body_name{
       margin-bottom: 20px;
       margin: 10px;
      }
     #thanks{
          margin-top: 10px;
      }
      </style>
  </head>
  <body>
      <div class="Email-wrapper">
          <div class="Email-wrapper_log"><img src="https://res.cloudinary.com/drpye5niv/image/upload/v1592941057/somafri_ashoka.png" alt=""/></div>
          <div class="Email-wrapper_body">
              <div class="Email-wrapper_body_name">Hi ${userName}!</div>
              <div class="Email-wrapper_body_message">We are excited to have you onboard. Click the link below to reset your password and be able to travel the world with us.
  
              </br>  </br>  </br> </div>
          </div>
         <a href="${process.env.BASE_URL}/api/v1/auth/resetpassword/${token}" class="Email-wrapper_button" style="cursor: pointer !important; justify-self: center; margin-left: 80px; text-decoration: none; color: white;">Reset Password</a>
  
  
      </div>
  </body>
  </html>`;

		return view;
	}

	/**
   * this is a reset password review
   * @param {Object} userName a userName of the user registered
   * @returns {Object} An email template contains message of the user
   */

	static contactUsNotifyMeView(messageDetails) {
		const view = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
      <style>
      .Email-wrapper{
          display:grid;
          width: 50%;
          min-height: 50px;
          margin: 10px;
         
      }
      .Email-wrapper_log{
          justify-self: start;
          margin: 10px;
      }
      .Email-wrapper_button{
          background-color: #0094FF;
          width: 40%;
          color: white;
          padding: 10px;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
      }
      .Email-wrapper_button:hover {
        cursor: pointer;
      }
      .Email-wrapper_body_message , .Email-wrapper_body_name{
      align-self: center; 
     margin-left: 25px;
     margin: 10px;
     color: gray;
      }
      .Email-wrapper_body_name{
       margin-bottom: 20px;
       margin: 10px;
      }
     #thanks{
          margin-top: 10px;
      }
      </style>
  </head>
  <body>
      <div class="Email-wrapper">
      <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
      <img src="https://res.cloudinary.com/drpye5niv/image/upload/v1592941057/somafri_ashoka.png" width="125" height="120" style="display: block; border: 0px;" />
      </td>
          <div class="Email-wrapper_body">
              <div class="Email-wrapper_body_name">Contact message from ${messageDetails.email}!</div>
              <div class="Email-wrapper_body_message">Question: ${messageDetails.question}</div>
              <div class="Email-wrapper_body_message">Description: ${messageDetails.description}</div></br>  </br>
              </br>  </br>  </br> </div>
          </div>
  
  
      </div>
  </body>
  </html>`;

		return view;
	}

	static contactUsMessageView(userName) {
		const view = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
      <style>
      .Email-wrapper{
          display:grid;
          width: 50%;
          min-height: 50px;
          margin: 10px;
         
      }
      .Email-wrapper_log{
          justify-self: start;
          margin: 10px;
      }
      .Email-wrapper_button{
          background-color: #0094FF;
          width: 40%;
          color: white;
          padding: 10px;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
      }
      .Email-wrapper_button:hover {
        cursor: pointer;
      }
      .Email-wrapper_body_message , .Email-wrapper_body_name{
      align-self: center; 
     margin-left: 25px;
     margin: 10px;
     color: gray;
      }
      .Email-wrapper_body_name{
       margin-bottom: 20px;
       margin: 10px;
      }
     #thanks{
          margin-top: 10px;
      }
      </style>
  </head>
  <body>
      <div class="Email-wrapper">
      <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
      <img src="https://res.cloudinary.com/drpye5niv/image/upload/v1592941057/somafri_ashoka.png" width="125" height="120" style="display: block; border: 0px;" />
      </td>
          <div class="Email-wrapper_body">
              <div class="Email-wrapper_body_name">Hi ${userName}!</div>
              <div class="Email-wrapper_body_message">We have well received your message. We will get back to you in less than 48hours </br>  </br>
              Regards,
              Somafri Technology
              </br>  </br>  </br> </div>
          </div>
  
  
      </div>
  </body>
  </html>`;

		return view;
	}

	static somaUpdateView(userName, title, message) {
		const view = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
      <style>
      .Email-wrapper{
          display:grid;
          width: 50%;
          min-height: 50px;
          margin: 10px;
         
      }
      .Email-wrapper_log{
          justify-self: start;
          margin: 10px;
      }
      .Email-wrapper_button{
          background-color: #0094FF;
          width: 40%;
          color: white;
          padding: 10px;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
      }
      .Email-wrapper_button:hover {
        cursor: pointer;
      }
      .Email-wrapper_body{
     margin: 50px 50px 50px 50px;
     font-size: 16px;
      }
      .Email-wrapper_body_message{
     font-size: 13px;
      }
     #thanks{
          margin-top: 10px;
      }
      </style>
  </head>
  <body>
      <div class="Email-wrapper">
      <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
      <img src="https://res.cloudinary.com/drpye5niv/image/upload/v1592941057/somafri_ashoka.png" width="125" height="120" style="display: block; border: 0px;" />
      </td>
          <div class="Email-wrapper_body">
              <div class="Email-wrapper_body_name"><b>Hi ${userName},</b></div>
              <br></br>
              <div class="Email-wrapper_body_message">${message}</br>  </br>
              <br></br>
              <br></br>
               <b>Regards,
              <br></br>
             Your Friend from Somafri Technology. </b>
              <br></br>
              <br></br>
             </div>
          </div>
      </div>
  </body>
  </html>`;

		return view;
	}

	/**
   * This function helps to send email
   * @param {string} to this is a receiver email
   * @param {string} subject this is the subject of email to be send
   * @param {string} views this is html tages  that make body of email
   * @returns {null} return nothing
   */
	static async sendEmail(to, subject, views) {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.SENDER_EMAIL,
				pass: process.env.EMAIL_PASS,
			},
		});

		/**
     * This is an object which include email data (mail option)
     */
		const mailOptions = {
			from: process.env.SENDER_EMAIL,
			to,
			subject,
			html: views,
		};

		await transporter.sendMail(mailOptions);
	}
}

export default mailer;
