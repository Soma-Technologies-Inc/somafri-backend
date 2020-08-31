import db from "../database/models";
import { combineResolvers, skip } from "graphql-resolvers";
import {
  ForbiddenError,
  UserInputError,
  AuthenticationError,
} from "apollo-server";
import GenerateToken from "../helpers/token";
import { isAuthenticated, isAdmin } from "../middlewares/auth";
import EncryptPassword from "../helpers/Encryptor";
import LanguageServices from "../services/language";
import UserServices from "../services/users";
import comparePassword from "../helpers/Decryptor";
import mailer from '../helpers/send.email';
import LanguageHelper from '../helpers/languages.helper';

const UserResolvers = {
  Query: {
    getUsers: async (root, args, context) => {
      const user = await context.user;
      if (user.role !== "admin") {
        throw new ForbiddenError("you are not authorized to perfom this task.");
      }
      return db.user.findAll();
    },
    getUserProfile: async (root, args, context) => {
      try {
        const userInfo = await context.user;
        const { email, id:userId, primaryLanguageId } = userInfo;
        const languagesResponse = [];
        const enrolledLanguage = await LanguageServices.getEnrolledLanguages(userId);
        await Promise.all(enrolledLanguage.map(async (language, index) => { 
          const {
            languageId, id, currentLevel, totalLevel, countryFlag, updatedAt, createdAt, currentCourseId, currentCourseName,
          } = language.dataValues;
          const findLanguage = await LanguageHelper.getLanguageName(languageId);
  
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
        }));
        const primaryLanguageName = await LanguageHelper.getLanguageName(primaryLanguageId);
        const user = await UserServices.findUserByEmail(email);
        const userData = {
          id: user.dataValues.id,
          firstName: user.dataValues.firstName,
          lastName: user.dataValues.lastName,
          email: user.dataValues.email,
          profileImage: user.dataValues.profileImage,
          gender: user.dataValues.gender,
          country: user.dataValues.country,
          birthdate: user.dataValues.birthdate,
          primaryLanguage: primaryLanguageName.dataValues.name,
          role: user.dataValues.role,
          Language: languagesResponse,
  
        };
        if (user) {
          return userData
        }
        throw new UserInputError("Could not found the user in our system");
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
  Mutation: {
    createUser: async (
      root,
      { firstName, lastName, email, password, primaryLanguageId},
      { models }
    ) => {
      const findUser = await UserServices.getUserProfile(email);

      if (findUser) {
        throw new UserInputError("user already exist");
      }
      const findLanguage = await LanguageServices.getLanguage(
        primaryLanguageId
      );
      if (!findLanguage) {
        throw new UserInputError("Primary language not registered!");
      }
      const hashedPassword = EncryptPassword(password);
      const token = GenerateToken({
        firstName,
        lastName,
        email,
        primaryLanguageId,
        isVerified: false,
      });
      const user = await db.user.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        primaryLanguageId,
        isVerified: false,
        token,
      });
      const emailView = mailer.activateAccountView(token, firstName);
      mailer.sendEmail(email, 'Verification link', emailView);
      return {
        firstName,
        lastName,
        email,
        primaryLanguageId,
        isVerified: false,
        token,
      };
    },
    loginUser: async (root, { email, password }, { models }) => {
      const user = await UserServices.getUserProfile(email);
      if (user == null) {
        throw new UserInputError("Could not found the user in our system");
      }

      if (!comparePassword(password, user.password)) {
        throw new AuthenticationError("Email or password does not match");
      }
      const token = GenerateToken({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        primaryLanguageId: user.primaryLanguageId,
        email: email,
        role: user.role,
        isVerified: user.isVerified,
      });
      await UserServices.updateUser(email, { token });
      const data = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: email,
          profileImage: user.profileImage,
          role: user.role,
          isVerified: user.isVerified,
          primaryLanguageId: user.primaryLanguageId,
          token,
      };

      return data;
    },
    getUserRole: async (root, { email,}, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }else if (user.role !== "admin") {
        throw new ForbiddenError("you are not authorized to perfom this task.");
      }
      const findUser = await UserServices.findUserByEmail(email);
      if (!findUser) {
        throw new UserInputError("user email not registered!");
      }
      return { 
      userEmail: findUser.email,
      userRole: findUser.role,};
    },

    updateUserRole: async (root, { email,role}, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }else if (user.role !== "admin") {
        throw new ForbiddenError("you are not authorized to perfom this task.");
      }
      const findUser = await UserServices.findUserByEmail(email);
      if (!findUser) {
        throw new UserInputError("user email not registered!");
      }
        const updateRole = await UserServices.updateUserRole(email, role);
        if (updateRole) {
          return {
            message:'Role updated successfully',
            userEmail: findUser.email,
            userRole: role,
          };
        }
    },
    sendResetPasswordLink: async (root, { email}, context, args) => {
      const findUser = await UserServices.findUserByEmail(email);
      if (!findUser) {
        throw new UserInputError("user email not registered!");
      }
      const token = GenerateToken({
        email: email,
        isVerified: findUser.isVerified,
        id: findUser.id,
      });
      const emailView = mailer.resetPasswordView(token, findUser.firstName);
      mailer.sendEmail(email, 'Reset Password', emailView);

      return {
        message:'Email sent please check you email to reset your password',
      };
    },
  },
};

module.exports = UserResolvers;
