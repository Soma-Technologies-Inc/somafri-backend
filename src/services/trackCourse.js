import Sequelize from 'sequelize';
import db from '../database/models';
import Queries from './Queries';

const { Op } = Sequelize;

class TrackCourse {
	static async addToTrackCourse(data) {
		return Queries.create(db.trackCourses, data);
	}

	static async getCourses(userId) {
		try {
			const searchMessages = await db.trackCourses.findAndCountAll({
				where: { userId },
				attributes: [
					'id',
					'courseId',
					'languageId',
					'courseIcon',
					'courseName',
					'translatedCourseName',
					'courseComplexity',
					'testResult',
					'levelCourses',
					'currentChapter',
					'totalChapter',
				],
				order: [['updatedAt', 'DESC']],
			});
			if (!searchMessages) return null;
			return searchMessages;
		} catch (error) {
			return undefined;
		}
	}

	static async findCourseByLanguageId(userId, languageId, courseId) {
		try {
			const data = await db.trackCourses.findOne({
				where: {
					[Op.and]: [{ userId }, { languageId }, { courseId }],
				},
			});

			return data;
		} catch (error) {
			return error;
		}
	}

	static async findChapterProgress(userId, languageId, courseId) {
		try {
			return await db.trackCourses.findOne({
				where: {
					[Op.and]: [{ userId }, { languageId }, { courseId }],
				},
			});
		} catch (error) {
			return null;
		}
	}

	static async updateTrackCourse(
		id,
		courseId,
		courseIcon,
		courseComplexity,
		levelCourses,
		courseName,
		translatedCourseName,
		currentChapter,
		totalChapter
	) {
		try {
			return await db.trackCourses.update(
				{
					courseId,
					courseIcon,
					courseComplexity,
					levelCourses,
					courseName,
					translatedCourseName,
					currentChapter,
					totalChapter,
				},
				{ where: { id } }
			);
		} catch (error) {
			return null;
		}
	}

	static async findCoursesBy2Field(limit, offset, key, value, key2, value2) {
		try {
			return await db.trackCourse.findAndCountAll({
				where: {
					[Op.and]: [{ [key]: `${value}` }, { [key2]: `${value2}` }],
				},
				limit,
				offset,
			});
		} catch (error) {
			return null;
		}
	}

	static async saveTestResult(userId, courseId, languageId, testResult) {
		try {
			return await db.trackCourses.update(
				{
					testResult,
				},
				{
					where: {
						[Op.and]: [
							{
								userId,
							},
							{
								courseId,
							},
							{
								languageId,
							},
						],
					},
				}
			);
		} catch (error) {
			return null;
		}
	}

	static async getResults() {
		try {
			return await db.trackCourses.findAll({
				where: { testResult: { [Op.not]: null } },
				include: [
					{
						model: db.user,
						attributes: [
							'id',
							'firstName',
							'lastName',
							'email',
							'role',
							'profileImage',
							'createdAt',
							'updatedAt',
						],
					},
					{
						model: db.language,
						attributes: ['id', 'name', 'countryId', 'duplicatedLanguageId', 'learnable', 'language_key', 'createdAt', 'updatedAt'],
						include: [{
							model: db.country,
						}],
					},
					{
						model: db.course,
						attributes: ['id', 'name', 'rootCourseId'],
						include: [{
							model: db.rootCourse,
							attributes: ['name', 'courseIcon'],
						}],
					},
				],
				order: [['testResult', 'DESC']],
			});
		} catch (error) {
			return null;
		}
	}
}
export default TrackCourse;
