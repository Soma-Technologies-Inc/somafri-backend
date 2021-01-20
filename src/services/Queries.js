import { Op } from 'sequelize';
import db from '../database/models';
/**
 * class for responses
 */
class Queries {
	/**
   * creating user query
   * @param {string} table users table in database.
   * @param {string} data the data to be inputed in database.
   * @returns {array} data the data to be returned.
   */
	static async create(table, data) {
		try {
			const datas = await table.create(data);
			return datas;
		} catch (error) {
			return error;
		}
	}

	/**
   * searching a trip
   * @param {string} table table users table in database.
   * @param {integer} userId requestUserId user id in database.
   * @returns {array} data the data to be returned.
   */
	static async findAllRecord(table, userId) {
		const data = await table.findAll({ where: userId });
		return data;
	}

	static async findOneRecord(table, value) {
		const data = await table.findOne({ where: value });
		if (data) {
			return data;
		}
		return false;
	}

	static async findRecordById(table, userId, limit, offset) {
		try {
			const bookUser = await table.findAndCountAll({
				where: { userId },
				order: [['createdAt', 'DESC']],
				limit,
				offset,
			});
			return bookUser;
		} catch (error) {
			return error;
		}
	}

	static async findOrCreate(table, data, condition) {
		try {
			const datas = await table.findOrCreate({
				where: condition,
				defaults: data,
			});
			return datas[0];
		} catch (error) {
			return error;
		}
	}

	static async findIfLanguageExist(table, languageId) {
		try {
			const response = await table.findOne({
				where: { id: languageId },
			});
			return response;
		} catch (error) {
			return error;
		}
	}

	static async findIfLevelExist(table, levelId) {
		try {
			const response = await table.findOne({
				where: { id: levelId },
			});
			return response;
		} catch (error) {
			return error;
		}
	}

	static async findIfRootCourseExist(table, rootCourseId) {
		try {
			const response = await table.findOne({
				where: { id: rootCourseId },
			});
			return response;
		} catch (error) {
			return error;
		}
	}

	static async getCourseName(table, rootCourseId) {
		try {
			const response = await table.findOne({
				where: { rootCourseId },
			});
			if (!response) return null;
			return response;
		} catch (error) {
			return error;
		}
	}

	static async getAllLevels(table) {
		try {
			const levels = await table.findAndCountAll({
				order: [['id', 'ASC']],
			});
			return levels;
		} catch (error) {
			return error;
		}
	}

	static async checkIfUserAlreadyEnrolled(table, languageId, userId) {
		try {
			const enrolledLanguage = table.findOne({
				where: {
					[Op.and]: [
						{ userId: { [Op.eq]: userId } },
						{ languageId: { [Op.eq]: languageId } },
					],
				},
			});
			return enrolledLanguage;
		} catch (error) {
			return error;
		}
	}

	static async getEnrolledLanguages(table, userId) {
		try {
			const EnrolledLanguage = await table.findAll({ where: { userId } });
			return EnrolledLanguage;
		} catch (error) {
			return error;
		}
	}

	static async checkIfRootCourseExist(table, rootCourseId) {
		try {
			const response = await table.findOne({
				where: { id: rootCourseId },
			});
			return response;
		} catch (error) {
			return error;
		}
	}

	static async checkIfRootQuestionExist(table, rootQuestionId) {
		try {
			const response = await table.findOne({
				where: { id: rootQuestionId },
			});
			return response;
		} catch (error) {
			return error;
		}
	}

	static async getRootQuestion(table, rootCourseId) {
		const data = await table.findAll({
			where: { rootCourseId },
			include: [
				{
					model: db.rootCourse,
				},
			],
		});
		return data;
	}

	static async getQuestion(table, questionId) {
		const data = await table.findAll({
			where: { id: questionId },

			include: [
				{
					model: db.rootQuestion,
				},
			],
		});
		return data;
	}

	static async findTestParts(table, primaryLanguageId) {
		const data = await table.findAll({
			where: { languageId: primaryLanguageId },
		});
		return data;
	}

	static async findContents(table, rootContentId, primaryLanguageId) {
		const data = await table.findOne({
			where: {
				[Op.and]: [
					{ rootContentId: { [Op.eq]: rootContentId } },
					{ languageId: { [Op.eq]: primaryLanguageId } },
				],
			},
		});
		return data;
	}

	static async findContentsQuestion(table, rootContentId) {
		const data = await table.findOne({ where: rootContentId });
		return data;
	}
}
export default Queries;
