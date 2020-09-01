import db from "../database/models";
import Sequelize from 'sequelize';
import { combineResolvers, skip } from "graphql-resolvers";
import { ForbiddenError } from "apollo-server";
const { Op, where, cast, col } = Sequelize;
import { isAuthenticated, isAdmin } from "../middlewares/auth";

const TransaltionResolvers = {
  Query: {
    getTranslationsByUserId: async (root, { userId }, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      const TranslationHistory = await db.translation.findAll({
        where: { userId },
      });
      if (!TranslationHistory) {
        throw new ForbiddenError("Translation history does not exist");
      }

      return TranslationHistory;
    },
  } 
};

module.exports = TransaltionResolvers;
