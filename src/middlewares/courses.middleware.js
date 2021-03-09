import response from '../helpers/response';
import CoursesServices from '../services/courses';

/**
 * Class for courses
 */
class CoursesMiddleware {
	static async findIfLanguageExist(req, res, next) {
		const { languageId } = req.body;

		if (languageId) {
			const language = await CoursesServices.findIfLanguageExist(languageId);
			if (language === null) {
				return response.errorMessage(res, "The language doesn't exist", 404);
			}
		}
		return next();
	}

	static async findIfLevelExist(req, res, next) {
		const { levelId } = req.body;

		if (levelId) {
			const level = await CoursesServices.findIfLevelExist(levelId);
			if (level === null) {
				return response.errorMessage(res, 'The level doesnt exist', 404);
			}
		}
		return next();
	}

	static async findIfRootCourseExist(req, res, next) {
		const { rootCourseId } = req.body;
		const rootCourse = await CoursesServices.findIfRootCourseExist(
			rootCourseId,
		);
		if (rootCourse === null) {
			return response.errorMessage(res, 'The root course does not exist', 404);
		}
		return next();
	}

	static async findIfRootCourse(req, res, next) {
		const isNumber = value => !Number.isNaN(Number(value));

		const { id } = req.params;
		if (isNumber(id) === false) {
			return response.errorMessage(res, 'your root course id must be an integer', 400);
		}
		const rootCourse = await CoursesServices.findIfRootCourseExist(
			id,
		);
		if (rootCourse === null) {
			return response.errorMessage(res, 'The root course does not exist', 404);
		}
		return next();
	}

	static async findIfCourse(req, res, next) {
		const isNumber = value => !Number.isNaN(Number(value));
		const { id } = req.params;
		if (isNumber(id) === false) {
			return response.errorMessage(res, 'your course id must be an integer', 400);
		}
		const course = await CoursesServices.findCourseByField(
			'id', id
		);
		if (course.length <= 0) {
			return response.errorMessage(res, 'The course does not exist', 404);
		}

		if (req.body.languageId) {
			const language = await CoursesServices.findIfLanguageExist(req.body.languageId);
			if (language === null) {
				return response.errorMessage(res, "The language doesn't exist", 404);
			}
		}
		if (req.body.rootCourseId) {
			const rootCourse = await CoursesServices.findIfRootCourseExist(
				req.body.rootCourseId,
			);
			if (rootCourse === null) {
				return response.errorMessage(res, 'The course does not exist', 404);
			}
		}

		return next();
	}
}
export default CoursesMiddleware;
