/* eslint-disable no-lonely-if */
import QuestionServices from '../services/questions';
import response from '../helpers/response';
import QuestionHelper from '../helpers/question.helper';
import shuffler from '../helpers/shuffler';

class QuestionController {
	static async addRootQuestion(req, res) {
		try {
			const { rootCourseId, firstPart, secondPart } = req.body;

			const data = {
				rootCourseId,
				firstPart,
				secondPart,
			};
			const createdRootQuestion = await QuestionServices.CreateRootQuestion(
				data,
			);
			return response.successMessage(
				res,
				'root question created successfully',
				201,
				createdRootQuestion,
			);
		} catch (error) {
			return response.errorMessage(res, error.message, 500);
		}
	}

	static async getRootQuestion(req, res) {
		try {
			const { rootCourseId } = req.body;
			const RootQuestion = await QuestionServices.getRootQuestion(rootCourseId);
			return response.successMessage(
				res,
				'root questions retrieved successfully successfully',
				200,
				RootQuestion,
			);
		} catch (error) {
			return response.errorMessage(res, error.message, 500);
		}
	}

	static async addQuestion(req, res) {
		try {
			const {
				rootQuestionId, languageId, firstPart, secondPart,
			} = req.body;

			const data = {
				rootQuestionId,
				languageId,
				firstPart,
				secondPart,
			};
			const createdQuestion = await QuestionServices.CreateQuestion(data);
			return response.successMessage(
				res,
				'Question created successfully',
				201,
				createdQuestion,
			);
		} catch (error) {
			return response.errorMessage(res, error.message, 500);
		}
	}

	static async getQuestion(req, res) {
		try {
			const { questionId } = req.body;

			const question = await QuestionServices.getQuestion(questionId);
			return response.successMessage(
				res,
				'Question retrieved successfully',
				200,
				question,
			);
		} catch (error) {
			return response.errorMessage(res, error.message, 500);
		}
	}

	static async getTests(req, res) {
		try {
			const { primaryLanguageId } = req.user;
			const alternatives = [];
			const questionResponse = [];

			const parts = await QuestionHelper.findTestParts(primaryLanguageId);
			const { firstPart, secondPart } = parts[0].dataValues;
			const { languageId, courseId } = req.params;
			const userCourseContents = await QuestionHelper.getUserCourseContents(languageId, courseId);

			await Promise.all(
				userCourseContents.contentData.map(async (content, index) => {
					const rootContentId = content.id;
					const contentData = await QuestionHelper.findContents(rootContentId, primaryLanguageId);
					const data = {
						rootContentId: contentData.dataValues.rootContentId,
						languageId: contentData.dataValues.languageId,
						content: contentData.dataValues.content,
						contentImage: content.contentImage,
					};
					alternatives.push(data);
				}),
			);

			await Promise.all(
				userCourseContents.contentData.map(async (content, index) => {
					const alt = [];
					const { rootContentId } = userCourseContents.learningData[index];

					alternatives.map((content1, index1) => {
						if (content1.rootContentId === rootContentId) {
							alt.push({
								answer: content1.content,
								rootContentId: content1.rootContentId,
								contentImage: content1.contentImage,
							});
						}
					});
					shuffler(alternatives).map((content2, index3) => {
						if (alt.length < 4) {
							if (content2.rootContentId !== rootContentId) {
								alt.push({
									answer: content2.content,
									rootContentId: content2.rootContentId,
									contentImage: content2.contentImage,
								});
							}
						}
					});

					const answers = shuffler(alt);
					const response1 = {
						firstPart,
						secondPart,
						question: {
							questionName: userCourseContents.learningData[index].content,
							questionAudio: userCourseContents.learningData[index].contentAudio,
							rootContentId: userCourseContents.learningData[index].rootContentId,
						},
						answers,
					};
					questionResponse.push(response1);
				}),

			);

			if (questionResponse.length > 0) {
				return response.successMessage(
					res,
					'Question retrieved successfully',
					200,
					questionResponse,
				);
			}
			return response.errorMessage(res, 'No questions found on this course', 404);
		} catch (error) {
			return response.errorMessage(res, error.message, 500);
		}
	}
}

export default QuestionController;
