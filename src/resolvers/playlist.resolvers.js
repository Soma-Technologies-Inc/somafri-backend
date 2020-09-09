import db from "../database/models";
import Sequelize from 'sequelize';
import { combineResolvers, skip } from "graphql-resolvers";
import { ForbiddenError } from "apollo-server";
const { Op, where, cast, col } = Sequelize;
import { isAuthenticated, isAdmin } from "../middlewares/auth";

const TransaltionResolvers = {
  Query: {
    getTCurrentDatePlaylist: async (root, context, args) => {
      const user = await context.user;
      if (user === null) {
        throw new ForbiddenError("Please provide token first");
      }
      const today = new Date();

      const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
      const currentPlaylist = await db.playlist.findAll({
        where: { date },
        // include: [{
        //     model: db.audio,
        //   }]
      });
      console.log('-=-=-===-=->>', currentPlaylist.dataValues);
    //   if (!currentPlaylist) {
    //     throw new ForbiddenError("you have not yet created today's playlist");
    //   }
    //   return currentPlaylist;
    },
  } 
};

module.exports = TransaltionResolvers;
