import response from '../helpers/response';
import UserServices from '../services/users';

/**
 *
 * @param {Object} req req
 * @param {Object} res res
 * @param {Object} next ment
 * @returns {Object} hghfgjh
 */
const verifySuperAdmin = async (req, res, next) => {
	const user = await UserServices.findUserByEmail(req.user.email);
	const { role } = user;
	if (role !== 'superAdmin' && role !== 'content creator') {
		return response.errorMessage(res, 'non superAdmin can not perform this Action', 401, 'error');
	}
	return next();
};
export default verifySuperAdmin;
