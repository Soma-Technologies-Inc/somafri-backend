import response from '../helpers/response';
import UserServices from '../services/users';
import comparePassword from '../helpers/Decryptor';
import GenerateToken from '../helpers/token';

const checkEmailpassword = async (req, res) => {
	const user = await UserServices.findUserByEmail(req.body.email);
	if (user == null) {
		const status = 404;
		return response.errorMessage(res, 'Could not found the user in our system', status);
	}
	if (!comparePassword(req.body.password, user.password)) {
		const status = 401;
		return response.errorMessage(
			res,
			'Email or password does not match',
			status,
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
