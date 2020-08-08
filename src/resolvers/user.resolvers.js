import db from "../database/models";
import { combineResolvers, skip } from "graphql-resolvers";
import { ForbiddenError } from 'apollo-server';
import GenerateToken from "../helpers/token";
import { isAuthenticated, isAdmin } from "../middlewares/auth";

const UserResolvers = {
  Query: {
    getUsers: async (root, args, context) => {
      const user = await context.user;
      if(user.role !== 'admin'){
        throw new ForbiddenError('you are not authorized to perfom this task.');
      }
      return db.user.findAll();
    },
  },
  Mutation: {
    createUser: async (
      root,
      { email, firstName, lastName, isVerified },
      { models }
    ) => {
      const user = await db.user.create({
        email,
        firstName,
        lastName,
        isVerified,
      });
      return { email, firstName, lastName, token: GenerateToken(user) };
    },
  },
};

module.exports = UserResolvers;
