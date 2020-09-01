import db from "../database/models";
import Sequelize from 'sequelize';
import { combineResolvers, skip } from "graphql-resolvers";
import { ForbiddenError } from "apollo-server";
const { Op, where, cast, col } = Sequelize;
import { isAuthenticated, isAdmin } from "../middlewares/auth";

const VideoResolvers = {
  Query: {
    getAllVideo: async (root, args, context) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      return db.video.findAll();
    },
    getVideoByLanguageId: async (root, { languageId }, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      const Video = await db.video.findAll({
        where: { languageId },
      });
      if (!Video) {
        throw new ForbiddenError("Videos does not exist");
      }
      if(Video.length === 0){
        throw new ForbiddenError("Videos with that language does not exist");
      }
      return Video;
    },
    getVideoById: async (root, { id }, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      const Video = await db.video.findOne({
        where: { id },
      });
      if (!Video) {
        throw new ForbiddenError("Video does not exist");
      }

      return Video;
    },
    getVideoByCategory: async (root, { category }, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      const Video = await db.video.findAll({
        where: { category },
      });
      if (!Video) {
        throw new ForbiddenError("Video with category does not exist");
      }

      return Video;
    },
    getVideoByCategoryAndLanguageId: async (
      root,
      { languageId, category },
      context,
      args
    ) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      const Video = await db.video.findAll({
        where: {
          [Op.and]: [{ languageId }, { category }],
        },
      });
      if (!Video) {
        throw new ForbiddenError("Video with category does not exist");
      }
      if(Video.length === 0){
        throw new ForbiddenError("Video with that category and language does not exist");
      }

      return Video;
    },
  } 
};

module.exports = VideoResolvers;
