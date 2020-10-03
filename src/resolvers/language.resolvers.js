import db from "../database/models";
import LanguageServices from "../services/language";
import CoursesServices from "../services/courses";

import {
  ForbiddenError,
  UserInputError,
  AuthenticationError,
} from "apollo-server";

const languageResolvers = {
  Query: {
    getAllLanguages: async (root, args, context) => {
      try {
          const languages = await LanguageServices.getLanguages();
          if (languages.count > 0) {
            return languages;
          }
          throw new ForbiddenError("No language registered");
        
      } catch (e) {
        throw new ForbiddenError(`${e.message}`);
      }
    },
    getLanguages: async (root, args, context) => {
      const availableLanguage = [];
      try {
        const user = await context.user;
        if (user === null) {
          const languages = await LanguageServices.getLanguages();
          await Promise.all(
            languages.rows.map(async (language, index) => {
              if (language.duplicatedLanguageId === null) {
                const { name, learnable } = language;
                if (name !== "English" && learnable) {
                  availableLanguage.push(language);
                }
              }
            })
          );
          if (languages.count > 0) {
            return availableLanguage;
          }
          throw new ForbiddenError("No language registered");
        }

        const languages = await LanguageServices.getLanguages();
        const { primaryLanguageId } = user;
        await Promise.all(
          languages.rows.map(async (language, index) => {
            if (primaryLanguageId !== language.id) {
              const { name, learnable } = language;
              if (name !== "English" && learnable) {
                availableLanguage.push(language);
              }
            }
          })
        );
        if (languages.count > 0) {
          return availableLanguage;
        }

        throw new ForbiddenError("No language registered");
      } catch (e) {
        throw new ForbiddenError(`${e.message}`);
      }
    },
    getSpecificLanguage: async (root, { id }, context, args) => {
      try {
        const user = await context.user;
        if (user === null) {
          throw new ForbiddenError("Please provide token first");
        }

        if (isNaN(id)) {
          throw new UserInputError("id must be an integer");
        }

        const language = await LanguageServices.getLanguage(id);
        if (language) {
          return language;
        }

        throw new UserInputError("language not registered");
      } catch (e) {
        throw new ForbiddenError(`${e.message}`);
      }
    },
    getLanguagesByCountry: async (root, { countryName }, context, args) => {
      try {
        const findCountry = await db.country.findOne({
          where: { name: countryName },
        });
        if (!findCountry) {
          throw new UserInputError("Country not registered");
        }
        const languages = await db.language.findAll({
          where: { countryId: findCountry.id },
          order: [["createdAt", "ASC"]],
        });
        if (languages) {
          return languages;
        }
        throw new UserInputError("No language found for the entered country");
      } catch (e) {
        throw new ForbiddenError(`${e.message}`);
      }
    },

    enrollToLanguage: async (root, { language }, context, args) => {
      try {
        const user = await context.user;
        if (user === null) {
          throw new ForbiddenError("Please provide token first");
        }

        const { id: userId } = user;

        if (language === "English") {
          throw new UserInputError(
            "The language doesnt exist please unroll to another language"
          );
        }
        const getLanguage = await LanguageServices.findLanguage(language);

        if (getLanguage === null) {
          throw new UserInputError("The language doesnt exist");
        }

        const { id: languageId } = getLanguage;
        const checkIfEnrolled = await LanguageServices.checkIfUserAlreadyEnrolled(
          languageId,
          userId
        );
        if (checkIfEnrolled) {
          throw new UserInputError("You already enrolled to that language");
        }

        const countryFlag = getLanguage.country.flag;
        const currentLevel = 1;
        const findLanguage = await LanguageServices.getLanguage(languageId);
        const getLanguageCourses = await CoursesServices.getCourses(languageId);
        const totalLevel = getLanguageCourses.count;
        const data = {
          userId,
          languageId,
          currentLevel,
          totalLevel,
          countryFlag,
        };
        const enrolledLanguage = await LanguageServices.enrollToLanguage(data);
        const responseData = {
          id: enrolledLanguage.id,
          userId,
          currentLevel,
          totalLevel,
          enrolledLanguage: findLanguage.name,
          countryFlag,
          updatedAt: enrolledLanguage.updatedAt,
          createdAt: enrolledLanguage.createdAt,
          currentCourseId: enrolledLanguage.currentCourseId,
          currentCourseName: enrolledLanguage.currentCourseName,
        };
        return responseData;
      } catch (e) {
        throw new ForbiddenError(`${e.message}`);
      }
    },

    getMyEnrolledLanguages: async (root, args, context) => {
      try {
        const user = await context.user;
        if (user === null) {
          throw new ForbiddenError("Please provide token first");
        }
        const { id: userId } = user;
        const languagesResponse = [];
  
        const enrolledLanguage = await db.learning.findAll({ where: { userId } })
        await Promise.all(
          enrolledLanguage.map(async (language, index) => {
            const {
              id,
              languageId,
              currentLevel,
              totalLevel,
              countryFlag,
              updatedAt,
              createdAt,
              currentCourseId,
              currentCourseName,
            } = language;
            const findLanguage = await db.language.findOne({ 
              where: { id:languageId } ,
              include: [{
                model: db.country,
              }],
            });
            const LanguageName = findLanguage.name;
            languagesResponse.push({
              id,
              userId,
              currentLevel,
              totalLevel,
              languageId,
              LanguageName,
              countryFlag,
              currentCourseId,
              currentCourseName,
              updatedAt,
              createdAt,
            });
          }),
        );
        if (languagesResponse.length > 0){

          return languagesResponse
        }

        throw new UserInputError("You have not enrolled to a language yet");


      } catch (e) {
        throw new ForbiddenError(`${e.message}`);
      }
    },

    getUsersLearningLanguagess: async (root, args, context) => {
      try {
        const user = await context.user;
        if (user === null) {
          throw new ForbiddenError("Please provide token first");
        } else if (user.role !== "admin") {
          throw new ForbiddenError("you are not authorized to perfom this task.");
        }
        const getUsers = await db.user.findAll({  
        order: [['createdAt', 'DESC']],
      });
        const userLearningLanguages = [];
        await Promise.all(
          getUsers.map(async (userInfo, index) => {
            const { id } = userInfo;
            const enrolledLanguage = await LanguageServices.getEnrolledLanguages(
              id,
            );
            if (enrolledLanguage.length > 0) {
              userLearningLanguages.push({
                user: userInfo,
                enrolledLanguage,
              });
            }
          }),
        );  
        if (userLearningLanguages.length > 0){

          return userLearningLanguages
        }

        throw new UserInputError("No learnings yet");

      } catch (e) {
        throw new ForbiddenError(`${e.message}`);
      }
    },

  },
};

export default languageResolvers;
