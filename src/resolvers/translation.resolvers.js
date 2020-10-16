import db from "../database/models";
import Sequelize from "sequelize";
import { combineResolvers, skip } from "graphql-resolvers";
import { ForbiddenError } from "apollo-server";
const { Op, where, cast, col } = Sequelize;
import { isAuthenticated, isAdmin } from "../middlewares/auth";
import TranslationService from "../services/translation.service";


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
            translationId:TranslationHistory[index].dataValues.id,
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
    getTranslations: async (root, args, context) => {
      const Translations = await db.translation.findAll();
      return Translations;
    },
    deleteTranslation: async (root, { id }, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      try {
        if (isNaN(id)) {
        throw new ForbiddenError("id must be an integer");

        }
        const deleteTranslation = await TranslationService.deleteTranslation(
          id,user.id
        );
        if (deleteTranslation) {
          return 'Translation deleted successfully'
        }
        throw new ForbiddenError("check your translation id");
      } catch (e) {
        throw new ForbiddenError(`${e.message}`);
      }
    },
  },
};

module.exports = TransaltionResolvers;
