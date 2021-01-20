import CoursesServices from '../services/courses';
import TrackCourse from '../services/trackCourse';
import response from '../helpers/response';

class CoursesController {
	static async addTestResult(req, res) {
		const userId = req.user.id;
		const { languageId, courseId } = req.params;
		const { testResult } = req.body;
		const savingResult = await TrackCourse.saveTestResult(
			userId,
			courseId,
			languageId,
			testResult,
		);
		return response.successMessage(
			res,
			' test result saved successfully',
			200,
			testResult,
		);
	}

	static async createRootCourses(req, res) {
		try {
			const courseIcon = req.file.location;
			const {
				name, languageId, levelId, complexity,
			} = req.body;
			const data = {
				name,
				languageId,
				levelId,
				complexity,
				courseIcon,
			};

			if (isNaN(complexity)) {
				return response.errorMessage(res, 'complexity must be an integer', 400);
			}

			const rootCourses = await CoursesServices.createRootCourses(data);
			return response.successMessage(
				res,
				'root course created successfully',
				201,
				rootCourses,
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async createCourses(req, res) {
		try {
			const { name, languageId, rootCourseId } = req.body;
			const data = {
				name,
				languageId,
				rootCourseId,
			};

			const courses = await CoursesServices.createCourses(data);
			return response.successMessage(
				res,
				'Course created successfully',
				201,
				courses,
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async addCoursesFromTranslate(req, res) {
		try {
			const { languageKey, languageId } = req.body;
			const key = 'en';
			const rootCourses = await CoursesServices.getRootCourses();
			rootCourses.map(async (rootCourseData, index) => {
				const text = rootCourses[index].dataValues.name;
				const response = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${key}&tl=${languageKey}&dt=t&q=${text}`);
				const data = {
					name: response.data[0][0][0],
					languageId,
					rootCourseId: rootCourses[index].dataValues.id
				};
				await CoursesServices.createCourses(data);
			});

			return response.successMessage(
				res,
				'Courses was created successfully',
				201,
			);
		} catch (error) {
			return response.errorMessage(res, error.message, 500);
		}
	}
}
export default CoursesController;
