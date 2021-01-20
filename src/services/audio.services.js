import { emit } from 'nodemon';
import db from '../database/models';

class AudioServices {
	/**
 * creating user query
 * @param {string} table users table in database.
 * @param {string} data the data to be inputed in database.
 * @returns {array} data the data to be returned.
 */
	static async create(data) {
		try {
			const datas = await db.audio.create(data);
			return datas;
		} catch (error) {
			return error;
		}
	}
}
export default AudioServices;
