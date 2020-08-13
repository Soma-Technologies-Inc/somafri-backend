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

const UserResolvers = {
  Query: {
    getUsers: async (root, args, context) => {
      const user = await context.user;
      if (user.role !== "admin") {
        throw new ForbiddenError("you are not authorized to perfom this task.");
      }
      return db.user.findAll();
    },
  },
  Mutation: {
    createUser: async (
      root,
      { firstName, lastName, email, password, primaryLanguageId, isVerified },
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
      return {
        firstName,
        lastName,
        email,
        primaryLanguageId,
        isVerified,
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

      return { status: 200, message: "user has logged in successfully",   
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
    },
  },
};

module.exports = UserResolvers;
