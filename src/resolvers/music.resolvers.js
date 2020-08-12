import db from "../database/models";
import Sequelize from 'sequelize';
import { combineResolvers, skip } from "graphql-resolvers";
import { ForbiddenError } from "apollo-server";
const { Op, where, cast, col } = Sequelize;
import { isAuthenticated, isAdmin } from "../middlewares/auth";

const UserResolvers = {
  Query: {
    getAllMusics: async (root, args, context) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      return db.music.findAll();
    },
    getMusicByLanguageId: async (root, { languageId }, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      const Music = await db.music.findAll({
        where: { languageId },
      });
      if (!Music) {
        throw new ForbiddenError("Music does not exist");
      }

      return Music;
    },
    getMusicById: async (root, { id }, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      const Music = await db.music.findOne({
        where: { id },
      });
      if (!Music) {
        throw new ForbiddenError("Music does not exist");
      }

      return Music;
    },
    getMusicByCategory: async (root, { category }, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      const Music = await db.music.findAll({
        where: { category },
      });
      if (!Music) {
        throw new ForbiddenError("Music with category does not exist");
      }

      return Music;
    },
    getMusicByCategoryAndLanguageId: async (
      root,
      { languageId, category },
      context,
      args
    ) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      const Music = await db.music.findAll({
        where: {
          [Op.and]: [{ languageId }, { category }],
        },
      });
      if (!Music) {
        throw new ForbiddenError("Music with category does not exist");
      }
      if(Music.length === 0){
        throw new ForbiddenError("Music with that category and language does not exist");
      }

      return Music;
    },
  }
};

module.exports = UserResolvers;
