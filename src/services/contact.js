import Sequelize from 'sequelize';
import db from '../database/models';
import Queries from './Queries';

const { Op } = Sequelize;

class ContactServices {
	static async CreateMessage(message) {
		return Queries.create(db.contact, message);
	}

	static async findExistence(question, description, email) {
		try {
			return await await db.contact.findOne({
				where: {
					[Op.and]: [{ question }, { description }, { email }],
				},
			});
		} catch (error) {
			return undefined;
		}
	}

	static async getMessages() {
		try {
			const searchMessages = await db.contact.findAndCountAll({
				attributes: [
					'id',
					'name',
					'email',
					'question',
					'description',
					'createdAt',
				],
				order: [['createdAt', 'DESC']],
			});
			if (!searchMessages) return null;
			return searchMessages;
		} catch (error) {
			return undefined;
		}
	}
}
export default ContactServices;
