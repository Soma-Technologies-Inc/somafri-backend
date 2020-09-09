import db from "../database/models";
import Sequelize from "sequelize";
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
      const data = [];
      TranslationHistory.map((history,index)=>{
        data.push(
          {
            BeforeTranslation: {
              language: TranslationHistory[index].dataValues.from,
              text: TranslationHistory[index].dataValues.question,
            },
            AfterTranslation: {
              language: TranslationHistory[index].dataValues.to,
              text: TranslationHistory[index].dataValues.answer,
            },
          },
        )
      })

      return data;
    },
  },
};

module.exports = TransaltionResolvers;
