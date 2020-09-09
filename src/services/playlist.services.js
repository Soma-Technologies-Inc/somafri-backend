import { emit } from 'nodemon';
import db from '../database/models';
import Sequelize from 'sequelize';

const {
  Op, where, cast, col,
} = Sequelize;

class PlaylistServices {

  /**
 * creating user query
 * @param {string} table users table in database.
 * @param {string} data the data to be inputed in database.
 * @returns {array} data the data to be returned.
 */
static async create( data) {
    try {
      const datas = await db.playlist.create(data);
      return datas;
    } catch (error) {
      return error;
    }
  }

static async addPlaylistTracker( data) {
    try {
      const datas = await db.playlistTrack.create(data);
      return datas;
    } catch (error) {
      return error;
    }
  }
  
  static async updatePlaylistTracker(userId,date,time) {
    try {
      
       const response= await db.playlistTrack.update(
          {time},
          {where: {
            [Op.and]: [{ userId }, { date }],
          }},
          );
        return response;
      } catch (error) {
        return null;
      }
  }

  static async getPlaylistByDate(date) {
    try {
      
       const response= await db.playlist.findAll({
        where: { date },
        include: [{
            model: db.audio,
          }]
      });
        return response;
      } catch (error) {

        return error;
      }
  }
}
export default PlaylistServices;
