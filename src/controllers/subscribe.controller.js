import subscribeServices from '../services/subscribe.services';
import UserServices from '../services/users';
import response from '../helpers/response';

class SubscribeController {
	static async subscribe(req, res) {
		try {
			const { email } = req.body;
			const findEmail = await subscribeServices.findSubscribe(email);

			if (findEmail) {
				return response.errorMessage(res, 'email already subscribed', 409);
			}
			const subscribe = await subscribeServices.CreateSubscribe(req.body);
			return response.successMessage(res, 'Country saved successfully', 200, subscribe);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getSubscribes(req, res) {
		try {
			const findSubscribes = await subscribeServices.getSubscribes();
			if (!findSubscribes.count) {
				return response.errorMessage(res, 'no subscribes', 404);
			}
			subscribeServices.CreateSubscribe(req.body);
			return response.successMessage(res, 'Country saved successfully', 200, findSubscribes);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async subscribeAllUsers(req, res) {
		try {
			const users = await UserServices.countUsers();
			if (users.count > 0) {
				await Promise.all(
					users.rows.map(async (user) => {
						const findEmail = await subscribeServices.findSubscribe(user.email);
						if (!findEmail) {
							await subscribeServices.CreateSubscribe({ email: user.email });
						}
					}));
			}

			return response.successMessage(res, 'all users are have now subscribed successfully', 200);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}
}
export default SubscribeController;
