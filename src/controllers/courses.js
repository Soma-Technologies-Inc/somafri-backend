import CoursesServices from '../services/courses';
import TrackCourse from '../services/trackCourse';
import response from '../helpers/response';
import rootContentServices from '../services/content.root';
import ContentServices from '../services/content';
import Paginate from '../helpers/paginate';
import LanguageServices from '../services/language';
import CoursesHelper from '../helpers/courses.helper';

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

	static async editRootCourse(req, res) {
		try {
			const { id } = req.params;
			if (req.files.courseIcon) {
				req.body.courseIcon = req.files.courseIcon[0].location;
			}
			await CoursesServices.updateRootCourse(id, req.body);
			const updatedData = await CoursesServices.findIfRootCourseExist(id);
			if (updatedData) {
				return response.successMessage(
					res,
					'course updated successfully',
					200,
					updatedData,
				);
			}
			return response.errorMessage(res, 'Root course not found', 404);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async deleteRootCourses(req, res) {
		try {
			const { id } = req.params;
			const deleteCourse = await CoursesServices.deleteRootCourse(
				id,
			);
			if (deleteCourse) {
				return response.successMessage(
					res,
					'root course deleted successfully',
					200,
				);
			}
			return response.errorMessage(res, 'check your course id', 404);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getRootCourses(req, res) {
		try {
			const rootCourses = await CoursesServices.getRootCourses();
			return response.successMessage(
				res,
				'list of root courses',
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

	static async editCourse(req, res) {
		try {
			const { id } = req.params;
			await CoursesServices.updateCourse(id, req.body);

			const updatedData = await CoursesServices.getCourse(id);
			if (updatedData) {
				return response.successMessage(
					res,
					'Content updated successfully',
					200,
					updatedData,
				);
			}
			return response.errorMessage(res, 'Root course not found', 404);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async deleteCourse(req, res) {
		try {
			const { id } = req.params;
			const deleteCourse = await CoursesServices.deleteCourse(
				id,
			);
			if (deleteCourse) {
				return response.successMessage(
					res,
					'course deleted successfully',
					200,
				);
			}
			return response.errorMessage(res, 'check your content id', 404);
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
				const responses = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${key}&tl=${languageKey}&dt=t&q=${text}`);
				const data = {
					name: responses.data[0][0][0],
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

	static async getLanguageCourses(req, res) {
		try {
			const { primaryLanguageId } = req.user;
			const { languageId } = req.params;
			const courses = [];
			let languageCourse;
			if (parseInt(languageId, 10) === 2) {
				languageCourse = await CoursesServices.getRootCoursesByField(
					'languageId',
					languageId,
				);
				if (languageCourse) {
					await Promise.all(
						languageCourse.map(async (course1, index) => {
							const { id } = languageCourse.rows[index].dataValues;
							const primaryCourse = CoursesServices.getCoursesByLanguageAndRoot(
								primaryLanguageId,
								id,
							);
							const chapterProgress = await TrackCourse.findChapterProgress(
								req.user.id,
								languageId,
								id,
							);
							const findRootContents = await rootContentServices.findContentByField(
								1,
								1,
								'rootCourseId',
								id,
							);
							if (primaryCourse) {
								if (chapterProgress) {
									courses.push({
										languageCourse: languageCourse.rows[index],
										primaryCourse: await primaryCourse,
										chapter: {
											currentChapter: chapterProgress.currentChapter,
											totalChapter: chapterProgress.totalChapter,
											testResult: chapterProgress.testResult === null ? '' : chapterProgress.testResult,
										},
									});
								} else {
									courses.push({
										languageCourse: languageCourse.rows[index],
										primaryCourse: await primaryCourse,
										chapter: {
											currentChapter: 0,
											totalChapter: findRootContents.count,
											testResult: '',

										},
									});
								}
							}
						}),
					);
					return response.successMessage(res, 'List of contents', 200, courses);
				}
			} else {
				languageCourse = await CoursesServices.findCourseByField(
					'languageId',
					languageId,
				);

				if (languageCourse) {
					await Promise.all(
						languageCourse.map(async (course1, index) => {
							const { id, rootCourseId } = languageCourse[
								index
							].dataValues;
							const primaryCourse = CoursesServices.getCoursesByLanguageAndRoot(
								primaryLanguageId,
								rootCourseId,
							);
							const chapterProgress = await TrackCourse.findChapterProgress(
								req.user.id,
								languageId,
								id,
							);
							const findRootContents = await rootContentServices.findContentByField(
								1,
								1,
								'rootCourseId',
								rootCourseId,
							);
							if (primaryCourse) {
								if (chapterProgress) {
									courses.push({
										languageCourse: languageCourse[index],
										primaryCourse: await primaryCourse,
										chapter: {
											currentChapter: chapterProgress.currentChapter,
											totalChapter: chapterProgress.totalChapter,
											testResult: chapterProgress.testResult === null ? '' : chapterProgress.testResult,

										},
									});
								} else {
									courses.push({
										languageCourse: languageCourse[index],
										primaryCourse: await primaryCourse,
										chapter: {
											currentChapter: 0,
											totalChapter: findRootContents.count,
											testResult: '',

										},
									});
								}
							}
						}),
					);
					return response.successMessage(res, 'List of contents', 200, courses);
				}
			}
			return response.errorMessage(res, 'No course found', 404);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getCourseContents(req, res) {
		try {
			const { page } = req.query;
			const limit = 10;
			const offset = Paginate(page, limit);
			const { languageId, courseId } = req.params;
			const findCourse = await CoursesServices.getCoursesByLanguage(
				languageId,
				courseId,
			);
			if (findCourse) {
				const { rootCourseId } = findCourse;
				const findRootContents = await rootContentServices.findContentByField(
					limit,
					offset,
					'rootCourseId',
					rootCourseId,
				);
				const contentData = [];
				let a = -1;
				await Promise.all(
					findRootContents.rows.map(async () => {
						const { id } = findRootContents.rows[(a += 1)].dataValues;
						const courseContent = await ContentServices.findContentByRootIdAndByLanguage(
							id,
							languageId,
						);
						if (courseContent) {
							contentData.push(courseContent.dataValues);
						} else {
							contentData.push({
								content: 'no content yet',
								contentAudio: 'no audio yet',
							});
						}
					}),
				);
				const data = {
					rootContent: findRootContents.rows,
					contentData,
				};
				return response.successMessage(res, 'List of contents', 200, data);
			}

			return response.errorMessage(res, 'No courses found', 404);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getLearnContents(req, res) {
		try {
			const { page } = req.query;
			const limit = req.query.limit ? req.query.limit : 1;
			const offset = Paginate(page, limit);
			const { languageId, courseId } = req.params;

			const { primaryLanguageId } = req.user;

			const LearningLanguageCourse = await CoursesServices.getCoursesByLanguage(
				languageId,
				courseId,
			);
			if (LearningLanguageCourse) {
				const { rootCourseId } = LearningLanguageCourse;
				const findRootContents = await rootContentServices.findContentByField(
					limit,
					offset,
					'rootCourseId',
					rootCourseId,
				);
				const contentData = [];
				let a = -1;
				await Promise.all(
					findRootContents.rows.map(async () => {
						const { id } = findRootContents.rows[(a += 1)].dataValues;
						let primaryLanguageContent;
						const learningLanguageContents = await ContentServices.findContentByRootIdAndByLanguage(
							id,
							languageId,
						);

						if (parseInt(primaryLanguageId, 10) === 2) {
							primaryLanguageContent = findRootContents.rows[a];
						} else {
							primaryLanguageContent = await ContentServices.findContentByRootIdAndByLanguage(
								id,
								primaryLanguageId,
							);
						}

						if (learningLanguageContents) {
							let primaryLanguageContents;
							if (!primaryLanguageContent) {
								primaryLanguageContents = {
									content: 'no content yet',
									contentAudio: 'no content yet',
								};
							} else {
								primaryLanguageContents = primaryLanguageContent;
							}
							contentData.push({
								learningLanguageContents,
								primaryLanguageContents,
							});
						} else {
							contentData.push({
								content: 'no content yet',
								contentAudio: 'no audio yet',
							});
						}
					}),
				);

				if (findRootContents.rows.length <= 0 && contentData.length <= 0) {
					return response.errorMessage(res, 'content not found', 404);
				}
				const getRootCourse = await CoursesServices.findIfRootCourseExist(
					rootCourseId,
				);
				const getAllLevels = await CoursesServices.findRootCoursesByField(
					limit,
					offset,
					'levelId',
					getRootCourse.dataValues.levelId,
				);

				const primaryLanguageCourse = await CoursesServices.getCoursesByLanguageAndRoot(
					primaryLanguageId,
					rootCourseId,
				);
				const getEnrolledLanguage = await LanguageServices.checkIfUserAlreadyEnrolled(
					languageId,
					req.user.id,
				);
				if (getEnrolledLanguage) {
					await LanguageServices.updateEnrolledLanguage(
						req.user.id,
						languageId,
						getRootCourse.dataValues.levelId,
						courseId,
						LearningLanguageCourse.name,
					);
				}
				const findTrackCourse = await TrackCourse.findCourseByLanguageId(
					req.user.id,
					languageId,
					courseId,
				);
				const getLanguageChapter = await ContentServices.findAllrootContentChapterByRootCourseId(
					limit,
					offset,
					rootCourseId,
				);
				if (getLanguageChapter.count <= 0) {
					return response.errorMessage(
						res,
						'no content for that language',
						404,
					);
				}
				if (findTrackCourse) {
					if (
						findTrackCourse.currentChapter < getLanguageChapter.rows[0].chapter
					) {
						await TrackCourse.updateTrackCourse(
							findTrackCourse.id,
							courseId,
							getRootCourse.courseIcon,
							getRootCourse.complexity,
							getAllLevels.count,
							LearningLanguageCourse.name,
							primaryLanguageCourse.name,
							getLanguageChapter.rows[0].chapter,
							findRootContents.count,
						);
					}
				} else {
					const data = {
						userId: req.user.id,
						languageId,
						courseId,
						courseIcon: getRootCourse.courseIcon,
						courseComplexity: getRootCourse.complexity,
						levelCourses: getAllLevels.count,
						courseName: LearningLanguageCourse.name,
						translatedCourseName: primaryLanguageCourse.name,
						currentChapter: getLanguageChapter.rows[0].chapter,
						totalChapter: findRootContents.count,
					};
					await TrackCourse.addToTrackCourse(data);
				}
				return response.successMessage(res, 'List of contents', 200, {
					rootContent: findRootContents.rows,
					contentData,
				});
			}

			return response.errorMessage(res, 'Course not found', 404);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async recentCourses(req, res) {
		try {
			const getRecentCourses = await TrackCourse.getCourses(req.user.id);
			if (getRecentCourses.count <= 0) {
				return response.errorMessage(res, 'No recent courses yet', 404);
			}
			const recentCourses = [];
			await Promise.all(
				getRecentCourses.rows.map(async (course1, index) => {
					if (
						getRecentCourses.rows[index].currentChapter
				< getRecentCourses.rows[index].totalChapter
					) {
						recentCourses.push(getRecentCourses.rows[index]);
					}
				}),
			);
			if (recentCourses.length > 0) {
				const data = {
					count: recentCourses.length,
					rows: recentCourses,
				};
				return response.successMessage(res, 'Recent opened', 200, {
					getRecentCourses: data,
				});
			}
			return response.errorMessage(res, 'No recent course', 404);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}
}
export default CoursesController;
