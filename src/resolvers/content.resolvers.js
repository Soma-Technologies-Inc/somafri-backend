import {
	ForbiddenError,
	UserInputError,
	AuthenticationError,
} from 'apollo-server';
import db from '../database/models';

const rootContentResolvers = {
	Query: {
		getSpecificRootContent: async (root, { id }, context, args) => {
			const user = await context.user;
			if (user === null) {
				throw new ForbiddenError('Please provide token first');
			}
			try {
				const findRootContent = await db.rootContent.findAll({
					attributes: [
						'id',
						'rootCourseId',
						'chapter',
						'content',
						'contentImage',
						'contentAudio',
					],
					order: [['chapter', 'ASC']],
					where: { id },
				});
				if (!findRootContent) {
					throw new ForbiddenError('Root content not found');
				}
				return findRootContent;
			} catch (e) {
				throw new ForbiddenError(`${e.message}`);
			}
		},

		getRootContents: async (root, args, context) => {
			const user = await context.user;
			if (user === null) {
				throw new ForbiddenError('Please provide token first');
			}
			if (user.role !== 'admin') {
				throw new ForbiddenError(
					'you are not authorized to perform this task.'
				);
			}
			const rootContents = await db.rootContent.findAndCountAll({
				attributes: [
					'id',
					'rootCourseId',
					'chapter',
					'content',
					'contentImage',
					'contentAudio',
				],
				order: [['id', 'ASC']],
			});
			if (!rootContents) {
				throw new ForbiddenError('Root content not found');
			}
			return rootContents;
		},

		getCourseRootContents: async (root, { courseId: id }, context, args) => {
			const user = await context.user;
			if (user === null) {
				throw new ForbiddenError('Please provide token first');
			}
			if (user.role !== 'admin') {
				throw new ForbiddenError(
					'you are not authorized to perform this task.'
				);
			}

			try {
				const findCourse = await db.course.findOne({ where: { id } });
				if (findCourse) {
					const { rootCourseId } = findCourse;
					const findRootContents = await db.rootContent.findAndCountAll({
						attributes: [
							'id',
							'rootCourseId',
							'chapter',
							'content',
							'contentImage',
							'contentAudio',
						],
						order: [['chapter', 'ASC']],
						where: { rootCourseId },
					});
					if (findRootContents.count <= 0) {
						throw new ForbiddenError('Root contents not found');
					}

					return findRootContents;
				}
				throw new ForbiddenError('Root course not found');
			} catch (e) {
				throw new ForbiddenError(`${e.message}`);
			}
		},

		getContentByRootContent: async (root, { rootContentId }, context, args) => {
			const user = await context.user;
			if (user === null) {
				throw new ForbiddenError('Please provide token first');
			}
			try {
				const findRootContent = await db.content.findAndCountAll({
					attributes: [
						'id',
						'rootContentId',
						'languageId',
						'content',
						'contentAudio',
					],
					where: { rootContentId },
				});
				if (findRootContent.count === 0) {
					throw new ForbiddenError('content not found');
				}
				return findRootContent;
			} catch (e) {
				throw new ForbiddenError(`${e.message}`);
			}
		},
	},
};

module.exports = rootContentResolvers;
