import db from "../database/models";
import Sequelize from 'sequelize';
import { combineResolvers, skip } from "graphql-resolvers";
import { ForbiddenError } from "apollo-server";
const { Op, where, cast, col } = Sequelize;
import { isAuthenticated, isAdmin } from "../middlewares/auth";

const AudioResolvers = {
  Query: {
    getAllAudios: async (root, args, context) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      return db.audio.findAll();
    },
    getAudioByLanguageId: async (root, { languageId }, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      const Audio = await db.audio.findAll({
        where: { languageId },
      });
      if (!Audio) {
        throw new ForbiddenError("Audio does not exist");
      }

      return Audio;
    },
    getAudioById: async (root, { id }, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      const Audio = await db.audio.findOne({
        where: { id },
      });
      if (!Audio) {
        throw new ForbiddenError("Audio does not exist");
      }

      return Audio;
    },
    getAudioByCategory: async (root, { category }, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      const Audio = await db.audio.findAll({
        where: { category },
      });
      if (!Audio) {
        throw new ForbiddenError("Audio with category does not exist");
      }

      return Audio;
    },
    getAudioByCategoryAndLanguageId: async (
      root,
      { languageId, category },
      context,
      args
    ) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      const Audio = await db.audio.findAll({
        where: {
          [Op.and]: [{ languageId }, { category }],
        },
      });
      if (!Audio) {
        throw new ForbiddenError("Audio with category does not exist");
      }
      if(Audio.length === 0){
        throw new ForbiddenError("Audio with that category and language does not exist");
      }

      return Audio;
    },
  } 
};

module.exports = AudioResolvers;
