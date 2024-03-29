import response from '../helpers/response';
import UserServices from '../services/users';

/**
 *
 * @param {Object} req req
 * @param {Object} res res
 * @param {Object} next ment
 * @returns {Object} hghfgjh
 */
const verifyAdmin = async (req, res, next) => {
	const user = await UserServices.findUserByEmail(req.user.email);
	const role = user.role.toLowerCase();
	if (role !== 'admin' && role !== 'content creator') {
		return response.errorMessage(res, 'You can not perform this Action', 401, 'error');
	}
	return next();
};
export default verifyAdmin;
