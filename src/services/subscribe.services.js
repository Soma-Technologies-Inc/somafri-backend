import db from '../database/models';
import Queries from './Queries';

class SubscribeServices {
	static async CreateSubscribe(data) {
		return Queries.create(db.subscribe, data);
	}

	static async getSubscribes() {
		try {
			const searchSubscribe = await db.subscribe.findAndCountAll({
				order: [['createdAt', 'ASC']],
			});
			if (!searchSubscribe) return null;
			return searchSubscribe;
		} catch (error) {
			return undefined;
		}
	}

	static async findSubscribe(email) {
		try {
			return await db.subscribe.findOne({
				where: { email },
			});
		} catch (error) {
			return null;
		}
	}

	static async findSubscribeById(id) {
		try {
			return await db.subscribe.findOne({
				where: { id },
			});
		} catch (error) {
			return null;
		}
	}
}
export default SubscribeServices;
