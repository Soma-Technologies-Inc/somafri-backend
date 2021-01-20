import {
	ForbiddenError,
	UserInputError,
	AuthenticationError,
} from 'apollo-server';
import db from '../database/models';
import QuestionServices from '../services/questions';
import CoursesServices from '../services/courses';
import QuestionHelper from '../helpers/question.helper';
import shuffler from '../helpers/shuffler';

const questionResolvers = {
	Query: {
		getRootQuestion: async (root, { rootCourseId }, context, args) => {
			const user = await context.user;
			if (user === null) {
				throw new ForbiddenError('Please provide token first');
			}
			const RootQuestion = await QuestionServices.getRootQuestion(rootCourseId);

			return RootQuestion;
		},
		getQuestion: async (root, { questionId }, context, args) => {
			const user = await context.user;
			if (user === null) {
				throw new ForbiddenError('Please provide token first');
			}
			const question = await QuestionServices.getQuestion(questionId);
			return question;
		},

		getTests: async (root, { languageId, courseId }, context, args) => {
			const user = await context.user;
			if (user === null) {
				throw new ForbiddenError('Please provide token first');
			}

			try {
				const { primaryLanguageId } = user;

				const alternatives = [];
				const questionResponse = [];

				const parts = await QuestionHelper.findTestParts(primaryLanguageId);
				const { firstPart, secondPart } = parts[0].dataValues;

				const userCourseContents = await QuestionHelper.getUserCourseContents(
					languageId,
					courseId
				);
				await Promise.all(
					userCourseContents.contentData.map(async (content, index) => {
						const rootContentId = content.id;
						const contentData = await QuestionHelper.findContents(
							rootContentId,
							primaryLanguageId
						);
						const data = {
							rootContentId: contentData.dataValues.rootContentId,
							languageId: contentData.dataValues.languageId,
							content: contentData.dataValues.content,
							contentImage: content.contentImage,
						};
						alternatives.push(data);
					})
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

						alternatives.map((content2, index3) => {
							if (index3 <= 5) {
								if (content2.rootContentId !== rootContentId) {
									alt.push({
										answer: content2.content,
										rootContentId: content2.rootContentId,
										contentImage: content2.contentImage,
									});
								}
							}
						});
						if (alt.length > 6) {
							alt.pop();
						}
						const answers = shuffler(alt);
						const response1 = {
							firstPart,
							secondPart,
							question: {
								questionName: userCourseContents.learningData[index].content,
								rootContentId:
                  userCourseContents.learningData[index].rootContentId,
							},
							answers,
						};
						questionResponse.push(response1);
					})
				);
				if (questionResponse.length > 0) {
					return questionResponse;
				}
				throw new UserInputError('No questions found on this course');
			} catch (e) {
				throw new ForbiddenError(`${e.message}`);
			}
		},
	},
	Mutation: {
		addRootQuestion: async (
			root,
			{ rootCourseId, firstPart, secondPart },
			context,
			args
		) => {
			try {
				const user = await context.user;
				if (user === null) {
					throw new ForbiddenError('Please provide token first');
				} else if (user.role !== 'admin') {
					throw new ForbiddenError(
						'you are not authorized to perfom this task.'
					);
				}
				const data = {
					rootCourseId,
					firstPart,
					secondPart,
				};
				const createdRootQuestion = await QuestionServices.CreateRootQuestion(
					data
				);
				return createdRootQuestion;
			} catch (e) {
				throw new ForbiddenError(`${e.message}`);
			}
		},
		addQuestion: async (
			root,
			{ rootQuestionId, languageId, firstPart, secondPart },
			context,
			args
		) => {
			try {
				const user = await context.user;
				if (user === null) {
					throw new ForbiddenError('Please provide token first');
				} else if (user.role !== 'admin') {
					throw new ForbiddenError(
						'you are not authorized to perfom this task.'
					);
				}
				const language = await CoursesServices.findIfLanguageExist(languageId);
				if (language === null) {
					throw new ForbiddenError('The language doesnt exist');
				}
				const rootQuestion = await QuestionServices.checkIfRootQuestionExist(
					rootQuestionId
				);
				if (rootQuestion === null) {
					throw new ForbiddenError('The root question doesnt exist');
				}

				const data = {
					rootQuestionId,
					languageId,
					firstPart,
					secondPart,
				};
				const createdQuestion = await QuestionServices.CreateQuestion(data);
				return createdQuestion;
			} catch (e) {
				throw new ForbiddenError(`${e.message}`);
			}
		},
	},
};

module.exports = questionResolvers;
