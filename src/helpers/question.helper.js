import {
	ForbiddenError,
	UserInputError,
	AuthenticationError,
} from 'apollo-server';
import QuestionService from '../services/questions';
import CoursesServices from '../services/courses';
import LanguageServices from '../services/language';
import TrackCourse from '../services/trackCourse';
import rootContentServices from '../services/content.root';
import ContentServices from '../services/content';
import response from './response';
import Paginate from './paginate';
import CoursesHelper from './courses.helper';

class QuestionHelper {
	static async findTestParts(primaryLanguageId) {
		const data = await QuestionService.findTestParts(primaryLanguageId);
		return data;
	}

	static async findContents(rootContentId, primaryLanguageId) {
		const data = await QuestionService.findContents(rootContentId, primaryLanguageId);
		return data;
	}

	static async findContentsQuestion(rootContentId) {
		const data = await QuestionService.findContentsQuestion(rootContentId);
		return data;
	}

	static async getAnswer(rootContentId, primaryLanguageId) {
		const data = await QuestionService.findContents(rootContentId, primaryLanguageId);
		return data;
	}

	static async getUserCourseContents(languageId, courseId) {
		try {
			const LearningLanguageCourse = await CoursesServices.getCoursesByLanguage(
				languageId,
				courseId,
			);
			if (LearningLanguageCourse) {
				const { rootCourseId } = LearningLanguageCourse;
				const findRootContents = await rootContentServices.findContentFields(
					'rootCourseId',
					rootCourseId,
				);
				const contentData = [];
				const learningData = [];
				await Promise.all(
					findRootContents.rows.map(async (rootContent, index) => {
						const rootContentId = rootContent.id;
						const learningLanguageContents = await ContentServices.findContentByRootIdAndByLanguage(
							rootContentId,
							languageId,
						);
						if (learningLanguageContents) {
							contentData.push(
								rootContent.dataValues,
							);
							learningData.push(learningLanguageContents.dataValues);
						}
					}),
				);

				const responseData = {
					contentData,
					learningData,
				};

				return responseData;
			}
			throw new UserInputError('Course not found');
		} catch (e) {
			throw new ForbiddenError(`${e.message}`);
		}
	}
}

export default QuestionHelper;
