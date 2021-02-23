import ContactServices from '../services/contact';
import response from '../helpers/response';
import mailer from '../helpers/send.email';

class ContactController {
	static async contactUs(req, res) {
		try {
			const { name, email, question, description } = req.body;
			const messageDetails = {
				name,
				email,
				question,
				description,
			};
			const findQuestion = await ContactServices.findExistence(question, description, email);
			if (findQuestion) {
				return response.errorMessage(res, 'Message already sent', 409);
			}

			ContactServices.CreateMessage(messageDetails);
			const emailView = mailer.contactUsMessageView(name);
			mailer.sendEmail(email, 'Message received', emailView);
			const notifyMe = mailer.contactUsNotifyMeView(messageDetails);
			mailer.sendEmail(process.env.SENDER_EMAIL, 'Soma Contact Message', notifyMe);
			return response.successMessage(
				res,
				'Message send successfully. we will reach out to you soon ',
				200, {
					question,
					description,
				}
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getMessages(req, res) {
		try {
			const messages = await ContactServices.getMessages();

			if (messages.count > 0) {
				return response.successMessage(res, 'Contact Message', 200, messages);
			}
			return response.errorMessage(res, 'No message found', 404);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}
}
export default ContactController;
