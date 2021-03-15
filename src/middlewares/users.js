import response from '../helpers/response';
import UserServices from '../services/users';
import comparePassword from '../helpers/Decryptor';
import GenerateToken from '../helpers/token';

const checkEmailpassword = async (req, res) => {
	const user = await UserServices.findUserByEmail(req.body.email);
	if (user == null) {
		return response.errorMessage(res, 'Could not found the user in our system', 404);
	}
	if (!user.status) {
		return response.errorMessage(res, 'your account is deactivated please contact the the system admin', 403);
	}
	if (!comparePassword(req.body.password, user.password)) {
		return response.errorMessage(
			res,
			'Email or password does not match',
			401,
		);
	}
	const token = GenerateToken({

		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		primaryLanguageId: user.primaryLanguageId,
		email: req.body.email,
		role: user.role,
		isVerified: user.isVerified,
	});
	await UserServices.updateUser(req.body.email, { token });
	const data = {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: req.body.email,
		profileImage: user.profileImage,
		role: user.role,
		isVerified: user.isVerified,
		primaryLanguageId: user.primaryLanguageId,
		token,
	};
	return response.successMessage(
		res,
		'user has logged in successfully',
		200,
		data,
	);
};
export default checkEmailpassword;
