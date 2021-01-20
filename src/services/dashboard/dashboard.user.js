import { emit } from 'nodemon';
import db from '../../database/models';
import Queries from '../Queries';

class UserServices {
	static async getUsers(limit, offset) {
		try {
			const searchUsers = await db.user.findAll({
				include: [{
					model: db.language,
				}],
				order: [['createdAt', 'ASC']],
				limit,
				offset,
			});
			if (!searchUsers) return null;
			return searchUsers;
		} catch (error) {
			return undefined;
		}
	}

	static async activateDeactivate(id, status) {
		try {
			return db.user.update({ status }, { where: { id } });
		} catch (error) {
			return undefined;
		}
	}

	static async updateRole(id, role) {
		try {
			return db.user.update({ role }, { where: { id } });
		} catch (error) {
			return undefined;
		}
	}
}

export default UserServices;
