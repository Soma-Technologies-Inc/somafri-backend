import response from '../helpers/response';

const verifyUser = (req, res, next) => {
	if (!req.user.isVerified) {
		return response.errorMessage(res, 'Account not verified', 401, 'error');
	}
	return next();
};
export default verifyUser;
