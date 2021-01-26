import Sequelize from 'sequelize';
import db from '../database/models';
import Queries from './Queries';

const { Op } = Sequelize;

class DailyWordsServices {
	static async CreateDailyWord(data) {
		return Queries.create(db.dailyWord, data);
	}

	static async findDailyWord(text) {
		try {
			return await db.dailyWord.findOne({
				where: { text },
			});
		} catch (error) {
			return null;
		}
	}

	static async getDailyWords() {
		try {
			return await db.dailyWord.findAll({
				order: [['createdAt', 'ASC']],
			});
		} catch (error) {
			return null;
		}
	}
}

export default DailyWordsServices;
