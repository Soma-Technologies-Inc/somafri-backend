import Sequelize from 'sequelize';
import db from '../database/models';

const {
	Op, where, cast, col,
} = Sequelize;
class TranslationService {
	/**
     * creating user query
     * @param {string} table users table in database.
     * @param {string} data the data to be inputed in database.
     * @returns {array} data the data to be returned.
     */
	static async create(data) {
		try {
			const datas = await db.translation.create(data);
			return datas;
		} catch (error) {
			return error;
		}
	}

	static async deleteTranslation(id, userId) {
		try {
			return await db.translation.destroy({
				where: {
					[Op.and]: [{ id }, { userId }],

				},
			});
		} catch (error) {
			return null;
		}
	}
}

export default TranslationService;
