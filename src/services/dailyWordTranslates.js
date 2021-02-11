import Sequelize from 'sequelize';
import db from '../database/models';
import Queries from './Queries';

const { Op } = Sequelize;

class DailyWordTranslatesServices {
	static async addTranslate(data) {
		return Queries.create(db.dailyWordTranslate, data);
	}

	static async findDailyWord(text) {
		try {
			return await db.dailyWordTranslate.findOne({
				where: { text },
			});
		} catch (error) {
			return null;
		}
	}

	static async findTranslation(dailyWordId, languageId) {
		try {
			return await db.dailyWordTranslate.findOne({
				where: {
					[Op.and]: [{ dailyWordId }, { languageId }],
				},
				include: [
					{ model: db.dailyWord },
					{ model: db.language },
				],
			});
		} catch (error) {
			return null;
		}
	}

	static async getDailyWords() {
		try {
			return await db.dailyWordTranslate.findAll({
				order: [['createdAt', 'ASC']],
			});
		} catch (error) {
			return null;
		}
	}
}

export default DailyWordTranslatesServices;
