import Sequelize from 'sequelize';
import db from '../database/models';
import Queries from './Queries';

const { Op } = Sequelize;

class LanguageServices {
	static async CreateLanguage(data) {
		return Queries.create(db.language, data);
	}

	static async getLanguages() {
		try {
			const searchLanguage = await db.language.findAndCountAll({
				attributes: ['id', 'name', 'countryId', 'duplicatedLanguageId', 'learnable', 'language_key', 'createdAt', 'updatedAt'],
				include: [{
					model: db.country,
				}],
				order: [['createdAt', 'ASC']],
			});
			if (!searchLanguage) return null;
			return searchLanguage;
		} catch (error) {
			return undefined;
		}
	}

	static async getCourses(languageId) {
		try {
			const searchCourse = await db.course.findAndCountAll({
				where: {
					languageId,
				},
				attributes: ['id', 'name', 'levelId', 'createdAt'],
				order: [['createdAt', 'DESC']],
			});
			if (!searchCourse) return null;
			return searchCourse;
		} catch (error) {
			return undefined;
		}
	}

	static async getLanguage(id) {
		try {
			const language = await db.language.findOne({

				where: { id },
				include: [{
					model: db.country,
				}],
			});
			if (!language) return null;
			return language;
		} catch (error) {
			return undefined;
		}
	}

	static async findLanguage(language) {
		try {
			return await db.language.findOne({
				where: { name: language },
				include: [{
					model: db.country,
					attributes: ['flag'],
				}],
			});
		} catch (error) {
			return null;
		}
	}

	static async findLanguageByKey(languageKey) {
		try {
			return await db.language.findOne({
				where: { language_key: languageKey },
				include: [{
					model: db.country,
					attributes: ['flag'],
				}],
			});
		} catch (error) {
			return null;
		}
	}

	static async findLanguageByCountryId(id) {
		try {
			return await db.language.findAll({
				where: { countryId: id },
				order: [['createdAt', 'ASC']],
			});
		} catch (error) {
			return null;
		}
	}

	static async updateEnrolledLanguage(userId, languageId,
		currentLevel, currentCourseId, currentCourseName) {
		try {
			return await db.learning.update(
				{
					currentLevel, currentCourseId, currentCourseName,
				},
				{ where: { [Op.and]: [{ userId }, { languageId }] } },
			);
		} catch (error) {
			return null;
		}
	}

	static async monthlyEnrollments(startYear, startMonth) {
		let learnings;
		if (startMonth === 12) {
			learnings = db.learning.findAll({
				where: {
					createdAt: {
						[Op.gte]: new Date(`${startYear}-${startMonth}-01`),
						[Op.lt]: new Date(`${startYear}-${startMonth}-31`)
					}
				},
				order: [['id', 'ASC']],
			});
		} else {
			learnings = db.learning.findAll({
				where: {
					createdAt: {
						[Op.gte]: new Date(`${startYear}-${startMonth}-01`),
						[Op.lt]: new Date(`${startYear}-${startMonth + 1}-01`)
					}
				},
				order: [['id', 'ASC']],
			});
		}

		return learnings;
	}

	static async yearEnrollments(year) {
		try {
			const enrollments = db.learning.findAndCountAll({
				where: {
					createdAt: {
						[Op.gte]: new Date(`${year}-01-01`),
						[Op.lt]: new Date(`${year}-12-31`)
					}
				},
				order: [['id', 'ASC']],
			});
			return enrollments;
		} catch (error) {
			return error;
		}
	}

	static async enrollToLanguage(data) {
		return Queries.create(db.learning, data);
	}

	static async getEnrolledLanguages(userId) {
		return Queries.getEnrolledLanguages(db.learning, userId);
	}

	static async getMyEnrolledLanguages(userId) {
		return Queries.getMyEnrolledLanguages(db.learning, userId);
	}

	static async checkIfUserAlreadyEnrolled(languageId, userId) {
		return Queries.checkIfUserAlreadyEnrolled(db.learning, languageId, userId);
	}

	static async getAllLevels() {
		return Queries.getAllLevels(db.level);
	}

	static async findEnrollments() {
		return Queries.getEnrollments(db.learning);
	}

	static async getLanguageUsers(languageId) {
		return Queries.getLanguageUsers(db.learning, languageId);
	}
}
export default LanguageServices;
