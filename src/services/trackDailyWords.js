import Sequelize from 'sequelize';
import db from '../database/models';
import Queries from './Queries';

const { Op } = Sequelize;

class TrackDailyWordServices {
	static async ReadDailyWord(data) {
		return Queries.create(db.trackDailyWord, data);
	}

	static async getDailyWord(wordId, userId) {
		try {
			return await db.trackDailyWord.findOne({
				where: {

					[Op.and]: [{ wordId }, { userId }],
				},
			});
		} catch (error) {
			return null;
		}
	}
}

export default TrackDailyWordServices;
