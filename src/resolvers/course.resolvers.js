import db from "../database/models";
import { ForbiddenError } from "apollo-server";
import CoursesHelper from "../helpers/courses.helper";
import CoursesServices from "../services/courses";
import TrackCourse from "../services/trackCourse";
import rootContentServices from "../services/content.root";
import ContentServices from "../services/content";
import Paginate from "../helpers/paginate";
import LanguageServices from "../services/language";

const CourseResolvers = {
  Query: {
    getSpecificLanguageCourses: async (root, { languageId }, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      const courses = await db.course.findAll({
        where: {
          languageId,
        },
        order: [["rootCourseId", "ASC"]],
        attributes: ["id", "name", "rootCourseId"],
        include: [
          {
            model: db.rootCourse,
            attributes: ["name", "courseIcon"],
          },
        ],
      });
      if (!courses) {
        throw new ForbiddenError("No courses on this languages");
      }
      return courses;
    },
    getCoursesByLevel: async (root, { levelId }, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }

      const course = [];

      const courses = await db.rootCourse.findAll({
        where: {
          levelId,
        },
        attributes: ["id", "name", "courseIcon"],
        order: [["createdAt", "ASC"]],
      });

      if (!courses) {
        throw new ForbiddenError("No courses on this level");
      }
      await Promise.all(
        courses.map(async (courseDetails, index) => {
          const { id, name, courseIcon } = courseDetails;
          const rootCourseId = id;
          const courseName = await db.course.findOne({
            where: { rootCourseId },
          });
          if (courseName) {
            const Course = {
              name: courseName.dataValues.name,
            };
            course.push({
              id,
              name,
              courseIcon,
              rootCourseId,
              Course,
            });
          }
        })
      );
      if (course.length !== 0) {
        return course;
      } else {
        throw new ForbiddenError(`No courses on level ${levelId}`);
      }
    },
    getLanguageCourses: async (root, { languageId }, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }

      const { primaryLanguageId, id: userId } = user;
      const courses = [];
      let languageCourse;
      if (parseInt(languageId, 10) === 2) {
        languageCourse = await db.rootCourse.findAll({
          where: { languageId },
          order: [["complexity", "ASC"]],
        });
        if (languageCourse) {
          await Promise.all(
            languageCourse.map(async (course1, index) => {
              const { id } = course1;
              const primaryCourse = CoursesServices.getCoursesByLanguageAndRoot(
                primaryLanguageId,
                id
              );
              const chapterProgress = await TrackCourse.findChapterProgress(
                userId,
                languageId,
                id
              );
              const findRootContents = await rootContentServices.findContentByField(
                1,
                1,
                "rootCourseId",
                id
              );
              if (primaryCourse) {
                if (chapterProgress) {
                  courses.push({
                    languageCourse: languageCourse.rows[index],
                    primaryCourse: await primaryCourse,
                    chapter: {
                      currentChapter: chapterProgress.currentChapter,
                      totalChapter: chapterProgress.totalChapter,
                      testResult:
                        chapterProgress.testResult === null
                          ? ""
                          : chapterProgress.testResult,
                    },
                  });
                } else {
                  courses.push({
                    languageCourse: languageCourse.rows[index],
                    primaryCourse: await primaryCourse,
                    chapter: {
                      currentChapter: 0,
                      totalChapter: findRootContents.count,
                      testResult: "",
                    },
                  });
                }
              }
            })
          );
          return courses;
        }
      } else {
        languageCourse = await CoursesServices.findCourseByField(
          "languageId",
          languageId
        );

        
        if (languageCourse) {
          await Promise.all(
            languageCourse.map(async (course1, index) => {
              const { id, rootCourseId } = course1
              const primaryCourse = CoursesServices.getCoursesByLanguageAndRoot(
                primaryLanguageId,
                rootCourseId
              );
              const chapterProgress = await TrackCourse.findChapterProgress(
                userId,
                languageId,
                id
              );
              const findRootContents = await rootContentServices.findContentByField(
                1,
                1,
                "rootCourseId",
                rootCourseId
              );
              if (primaryCourse) {
                if (chapterProgress) {
                  courses.push({
                    languageCourse: languageCourse[index],
                    primaryCourse: await primaryCourse,
                    chapter: {
                      currentChapter: chapterProgress.currentChapter,
                      totalChapter: chapterProgress.totalChapter,
                      testResult:
                        chapterProgress.testResult === null
                          ? ""
                          : chapterProgress.testResult,
                    },
                  });
                } else {
                  courses.push({
                    languageCourse: languageCourse[index],
                    primaryCourse: await primaryCourse,
                    chapter: {
                      currentChapter: 0,
                      totalChapter: findRootContents.count,
                      testResult: "",
                    },
                  });
                }
              }
            })
          );
          return courses;
        }
      }
      throw new ForbiddenError("No course found");
    },
    getCourseContents: async (
      root,
      { languageId, courseId },
      context,
      args
    ) => {
      const user = await context.user;

      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      } else if (user.role !== "admin") {
        throw new ForbiddenError("you are not authorized to perfom this task.");
      }
      
      try {
        const limit = 10;
        const offset = Paginate(1, limit);
        const findCourse = await CoursesServices.getCoursesByLanguage(
          languageId,
          courseId
          );
          if (findCourse) {
            const { rootCourseId } = findCourse;
            const findRootContents = await rootContentServices.findContentByField(
              limit,
              offset,
              "rootCourseId",
              rootCourseId
              );
              const contentData = [];
              let a = -1;
              await Promise.all(
                findRootContents.map(async (course1, index) => {
              const { id } = course1;
              const courseContent = await ContentServices.findContentByRootIdAndByLanguage(
                id,
                languageId
              );
              if (courseContent) {
                contentData.push(await courseContent.dataValues);
              } else {
                contentData.push({
                  content: "no content yet",
                  contentAudio: "no audio yet",
                });
              }
            })
          );
          const data = {
            rootContent: findRootContents,
            contentData,
          };
          return data;
        }
        throw new ForbiddenError("No courses found");
      } catch (e) {
        throw new ForbiddenError(`${e.message}`);
      }
    },
    getUserCourseContents: async (
      root,
      { languageId, courseId, page },
      context,
      args
    ) => {
      try {
        const user = await context.user;
        if (user === null) {
          throw new ForbiddenError("Please provide token first");
        }
        const { id: userId } = user;
        const limit = 1;
        const offset = Paginate(page, limit);
        const { primaryLanguageId } = user;

        const LearningLanguageCourse = await CoursesServices.getCoursesByLanguage(
          languageId,
          courseId
        );

        if (LearningLanguageCourse) {
          const { rootCourseId } = LearningLanguageCourse;
          const findRootContents = await rootContentServices.findContentsByField(
            limit,
            offset,
            "rootCourseId",
            rootCourseId
            );
            const contentData = [];
            let a = -1;
          await Promise.all(
            findRootContents.rows.map(async () => {
              const { id } = findRootContents.rows[(a += 1)].dataValues;
              let primaryLanguageContent;
              const learningLanguageContents = await ContentServices.findContentByRootIdAndByLanguage(
                id,
                languageId
              );

              if (parseInt(primaryLanguageId, 10) === 2) {
                primaryLanguageContent = findRootContents.rows[a];
              } else {
                primaryLanguageContent = await ContentServices.findContentByRootIdAndByLanguage(
                  id,
                  primaryLanguageId
                );
              }

              if (learningLanguageContents) {
                let primaryLanguageContents;
                if (!primaryLanguageContent) {
                  primaryLanguageContents = {
                    content: "no content yet",
                    contentAudio: "no content yet",
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
                  content: "no content yet",
                  contentAudio: "no audio yet",
                });
              }
            })
          );

          if (findRootContents.rows.length <= 0 && contentData.length <= 0) {
            throw new ForbiddenError("content not found");
          }
          const getRootCourse = await CoursesServices.findIfRootCourseExist(
            rootCourseId
          );
          const getAllLevels = await CoursesServices.findRootCoursesByField(
            limit,
            offset,
            "levelId",
            getRootCourse.dataValues.levelId
          );

          const primaryLanguageCourse = await CoursesServices.getCoursesByLanguageAndRoot(
            primaryLanguageId,
            rootCourseId
          );
          const getEnrolledLanguage = await LanguageServices.checkIfUserAlreadyEnrolled(
            languageId,
            userId
          );
          if (getEnrolledLanguage) {
            await LanguageServices.updateEnrolledLanguage(
              userId,
              languageId,
              getRootCourse.dataValues.levelId,
              courseId,
              LearningLanguageCourse.name
            );
          }
          const findTrackCourse = await TrackCourse.findCourseByLanguageId(
            userId,
            languageId,
            courseId
          );
          const getLanguageChapter = await ContentServices.findAllrootContentChapterByRootCourseId(
            limit,
            offset,
            rootCourseId
          );
          if (getLanguageChapter.count <= 0) {
            throw new ForbiddenError("no content for that language");
          }
          if (findTrackCourse) {
            if (
              findTrackCourse.currentChapter <
              getLanguageChapter.rows[0].chapter
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
                findRootContents.count
              );
            }
          } else {
            const data = {
              userId: userId,
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

          const data = {
            rootContent: findRootContents.rows,
            contentData,
          };
          return data;
        }
        throw new ForbiddenError("Course not found");
      } catch (e) {
        throw new ForbiddenError(`${e.message}`);
      }
    },
    recentCourses: async (root, args, context) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      try {
        const { id } = user;
        const getRecentCourses = await TrackCourse.getCourses(id);
        if (getRecentCourses.count <= 0) {
          throw new ForbiddenError("No recent courses yet");
        }
        const recentCourses = [];
        await Promise.all(
          getRecentCourses.rows.map(async (course1, index) => {
            if (
              course1.currentChapter <
              course1.totalChapter
            ) {
              recentCourses.push(course1);
            }
          })
        );
        if (recentCourses.length > 0) {
          const data = {
            count: recentCourses.length,
            rows: recentCourses,
          };
          return data;
        }
        throw new ForbiddenError("No recent course");
      } catch (e) {
        throw new ForbiddenError(`${e.message}`);
      }
    },
  },
};

module.exports = CourseResolvers;
