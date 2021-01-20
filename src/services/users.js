import { emit } from 'nodemon';
import db from '../database/models';
import Queries from './Queries';

class UserServices {
	static async CreateUser(NewUser) {
		try {
			const user = await Queries.create(db.user, NewUser);
			return user;
		} catch (error) {
			return error;
		}
	}

	static async findUserByEmail(email) {
		try {
			const user = await db.user.findOne({ where: { email } });

			if (!user) return null;
			return user;
		} catch (error) {
			return undefined;
		}
	}

	static async getUserProfile(email) {
		try {
			const user = await db.user.findOne({
				where: { email },
				include: [{
					model: db.language,
					include: [{
						model: db.country,
					}],
				}],

			});

			if (!user) return null;
			return user;
		} catch (error) {
			return undefined;
		}
	}

	static async findInUserManager(managerId) {
		const managerData = await Queries.findInUserManager(db.user, managerId);

		if (!managerData) return false;
		return true;
	}

	static async findOrCreateUser(user) {
		try {
			return await db.user.findOrCreate({
				where: { email: user.email },
				defaults: user,
			});
		} catch (error) {
			return null;
		}
	}

	static async activeUser(email, updateUser) {
		try {
			const userToUpdate = await db.user.findOne({
				where: { email },
			});
			if (userToUpdate && userToUpdate.isVerified) {
				return {
					status: 409,
					message: 'user already activated',
				};
			}
			if (userToUpdate) {
				await db.user.update(updateUser, {
					where: { email },
					returning: true,
					plain: true,
				});

				return {
					status: 200,
					message: 'user account successfuly activated',
				};
			}
			return {
				status: 404,
				message: 'User not found',
			};
		} catch (error) {
			return {
				status: 400,
				message: error,
			};
		}
	}

	static async updateUserRole(email, role) {
		return db.user.update({ role }, { where: { email } });
	}

	static async updateUser(email, userInfo) {
		const userToUpdate = await this.findUserByEmail(email);
		if (!userToUpdate) {
			return {
				status: 404,
				message: 'User not found',
			};
		}
		const updatedUser = await userToUpdate.update(userInfo);
		return updatedUser;
	}

	static async getUsers() {
		try {
			const searchUsers = await db.user.findAndCountAll({
				attributes: [
					'id',
					'firstName',
					'lastName',
					'email',
					'role',
					'createdAt',
					'updatedAt',
				],
				order: [['createdAt', 'DESC']],
			});
			if (!searchUsers) return null;
			return searchUsers;
		} catch (error) {
			return undefined;
		}
	}

	static async updateUserById(id, userInfo) {
		const userToUpdate = await db.user.findByPk(id);
		if (!userToUpdate) {
			return {
				status: 404,
				message: 'User not found',
			};
		}
		const updatedUser = await userToUpdate.update(userInfo);
		return updatedUser;
	}

	static async findUser(where) {
		try {
			const user = await db.user.findOne({ where });
			if (!user) return null;
			return user;
		} catch (error) {
			return undefined;
		}
	}

	static async removeGuestsAccounts() {
		try {
			const deletedGuests = await db.user.destroy({ where: { role: guest } });

			if (!deletedGuests) return null;
			return user;
		} catch (error) {
			return undefined;
		}
	}

	static async countUsers() {
		const users = await db.user.findAndCountAll();
		return users;
	}
}
export default UserServices;
