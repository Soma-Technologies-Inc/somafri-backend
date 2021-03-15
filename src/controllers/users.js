import environment from 'dotenv';
import UserServices from '../services/users';
import LanguageServices from '../services/language';
import EncryptPassword from '../helpers/Encryptor';
import response from '../helpers/response';
import GenerateToken from '../helpers/token';
import profileHelper from '../helpers/profile.helper';
import mailer from '../helpers/send.email';
import translate from '../helpers/translate';
import checkEmailpassword from '../middlewares/users';
import LanguageHelper from '../helpers/languages.helper';
import dashboardUserServices from '../services/dashboard/dashboard.user';

environment.config();
class UserController {
	static async signup(req, res) {
		try {
			const guestEmail = req.body.guestEmail !== undefined ? req.body.guestEmail : null;
			const {
				firstName,
				lastName,
				email,
				password,
				primaryLanguageId,
			} = req.body;

			const findUser = await UserServices.getUserProfile(email);
			if (findUser) {
				return response.errorMessage(res, 'Provided email is already registered', 409);
			}

			const findLanguage = await LanguageServices.getLanguage(primaryLanguageId);
			if (!findLanguage) {
				return response.errorMessage(
					res,
					'Primary language not registered!',
					404,
				);
			}

			const hashedPassword = EncryptPassword(password);
			const token = GenerateToken({
				lastName, firstName, email, primaryLanguageId, isVerified: false,
			});
			const NewUser = guestEmail === null ? {
				firstName,
				lastName,
				email,
				password: hashedPassword,
				primaryLanguageId,
				isVerified: false,
				token,
			} : {
				firstName,
				lastName,
				email,
				password: hashedPassword,
				primaryLanguageId,
				isVerified: false,
				token,
				role: 'standard'
			};
			const createUser = guestEmail === null
				? await UserServices.CreateUser(NewUser)
				: await UserServices.updateGuestUser(guestEmail, NewUser);
			const PrimaryLanguageKey = findLanguage.language_key;

			const translateResults = await translate.translateMail(
				PrimaryLanguageKey
			);

			const emailView = mailer.activateAccountView(token, firstName, translateResults);
			mailer.sendEmail(email, 'Verification link', emailView);

			return response.successMessage(
				res,
				'user created successfully visit email to verify account',
				201,
				{
					id: createUser.id,
					firstName,
					lastName,
					email,
					primaryLanguage: findLanguage.name,
					isVerified: false,
					token,
				},
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async signIn(req, res) {
		await checkEmailpassword(req, res);
	}

	static async googleAndFacebookMobileSignIn(req, res) {
		const user = await UserServices.findUserByEmail(req.body.email);
		if (user == null) {
			const status = 404;
			return response.errorMessage(res, 'Your Account is not created', status);
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
			role: user.role,
			isVerified: user.isVerified,
			primaryLanguageId: user.primaryLanguageId,
			token,
		};
		return response.successMessage(
			res,
			'user has logged in successfully',
			200,
			data
		);
	}

	static async googleAndFacebookMobileSignUp(req, res) {
		const {
			firstName,
			lastName,
			email,
			authtype,
			profileImage,
			primaryLanguageId,
		} = req.body;
		const token = GenerateToken({
			lastName,
			firstName,
			email,
			primaryLanguageId,
			isVerified: true,
		});
		const userData = {
			firstName,
			lastName,
			email,
			authtype,
			profileImage,
			primaryLanguageId,
			isVerified: true,
			role: 'standard',
			token,
		};
		const userCreated = await UserServices.findOrCreateUser(userData);
		const findLanguage = await LanguageServices.getLanguage(primaryLanguageId);
		return response.successMessage(res, 'user created successfully', 201, {
			id: userCreated.id,
			firstName,
			lastName,
			email,
			primaryLanguage: findLanguage.name,
			isVerified: true,
			token,
		});
	}

	static async googleAndFacebookPlusAuth(
		accessToken,
		refreshToken,
		profile,
		done
	) {
		try {
			const userData = {
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				email: profile.emails[0].value,
				authtype: profile.provider,
				profileImage: profile.photos[0].value,
				isVerified: true,
				role: 'standard',
			};
			const [userCreated] = await UserServices.findOrCreateUser(userData);
			done(null, userCreated.dataValues);
		} catch (error) {
			done(error, false);
		}
	}

	static async authGoogleAndFacebook(req, res) {
		const {
			firstName,
			lastName,
			role,
			email,
			isVerified,
			id,
			authtype,
		} = req.user;
		const token = GenerateToken({
			firstName,
			lastName,
			role,
			email,
			isVerified,
			id,
		});
		await UserServices.updateUser(req.user.email, { token });
		let redirectUrl = '';
		const userToFind = await UserServices.findUserByEmail(req.user.email);
		const userInfo = JSON.stringify({ authtype, token });
		if (userToFind.dataValues.primaryLanguageId === null) {
			redirectUrl = `${process.env.FRONTEND_USER_PROFILE_REDIRECT}?info=${userInfo}`;
		} else {
			redirectUrl = `${process.env.FRONT_END_SUCCESS_REDIRECT}?info=${userInfo}`;
		}
		return res.redirect(redirectUrl);
	}

	static async updatedUser(req, res) {
		const activate = {
			isVerified: true,
		};
		const updateUser = await UserServices.activeUser(req.user.email, activate);

		if (updateUser.status === 200) {
			return res.redirect(`${process.env.FRONT_END_SUCCESS_REDIRECT}`);
		}

		return response.errorMessage(res, updateUser.message, updateUser.status);
	}

	static async logout(req, res) {
		await UserServices.updateUser(req.user.email, { token: null });
		return response.successMessage(
			res,
			'User is successfully logged out.',
			200
		);
	}

	static resetPassword(req, res) {
		if (req.body.password !== req.body.confirmPassword) {
			return response.errorMessage(res, 'Password does not match!', 400);
		}

		const data = {
			password: EncryptPassword(req.body.password),
		};
		UserServices.resetPassword(req, res, req.user.email, data);
	}

	static async getUserProfile(req, res) {
		try {
			const { email } = req.user;
			const userId = req.user.id;
			const { primaryLanguageId } = req.user;
			const languagesResponse = [];
			const enrolledLanguage = await LanguageServices.getEnrolledLanguages(userId);
			await Promise.all(enrolledLanguage.map(async (language, index) => {
				const {
					languageId, id, currentLevel, totalLevel,
					countryFlag, updatedAt, createdAt, currentCourseId, currentCourseName,
				} = language.dataValues;
				const findLanguage = await LanguageHelper.getLanguageName(languageId);

				const LanguageName = findLanguage.name;
				languagesResponse.push({
					id,
					userId,
					currentLevel,
					totalLevel,
					languageId,
					LanguageName,
					countryFlag,
					currentCourseId,
					currentCourseName,
					updatedAt,
					createdAt,
				});
			}));
			const primaryLanguageName = await LanguageHelper.getLanguageName(primaryLanguageId);
			const user = await UserServices.findUserByEmail(email);
			const userData = {
				id: user.dataValues.id,
				firstName: user.dataValues.firstName,
				lastName: user.dataValues.lastName,
				email: user.dataValues.email,
				profileImage: user.dataValues.profileImage,
				gender: user.dataValues.gender,
				country: user.dataValues.country,
				birthdate: user.dataValues.birthdate,
				primaryLanguageId: primaryLanguageName.dataValues.name,
				Language: languagesResponse,

			};
			if (user) {
				return response.successMessage(res, 'user retrieved successfully', 200, userData);
			}

			return response.errorMessage(res, 'No User Found', 404);
		} catch (error) {
			return response.errorMessage(res, error.message, 500);
		}
	}

	static async editUserProfile(req, res) {
		const { email } = req.user;
		const profile = profileHelper.chooseProfileData(email, req.body);

		if (!req.user.isVerified === true) {
			const status = 401;
			return response.errorMessage(
				res,
				'User Is Not Verified, Please verify the User First',
				status
			);
		}
		UserServices.updateUser(email, profile);
		return response.successMessage(
			res,
			'User Profile are Updated',
			200,
			profile
		);
	}

	static async createGuestAccount(req, res) {
		try {
			const users = await UserServices.countUsers();
			const { primaryLanguageId } = req.body;
			const guestNumber = users.count + 1;
			const email = `guest${guestNumber}@somafri.com`;
			const role = 'guest';
			const token = GenerateToken({
				role,
				email,
				isVerified: true,
				primaryLanguageId,
			});
			const data = {
				email,
				role,
				token,
				primaryLanguageId,
				isVerified: true,
				firstName: 'somafriGuest',
				lastName: guestNumber
			};
			const createdUser = await UserServices.CreateUser(data);
			return response.successMessage(
				res,
				'Guest account was created successfully',
				201,
				{
					id: createdUser.dataValues.id,
					email,
					role,
					primaryLanguageId,
					token,
				}
			);
		} catch (error) {
			return response.errorMessage(res, error.message, 500);
		}
	}

	static async removeGuestsAccounts(req, res) {
		try {
			await UserServices.removeGuestsAccounts();
			return response.successMessage(
				res,
				'All guests were deleted successfully',
				200,
			);
		} catch (error) {
			return response.errorMessage(res, error.message, 500);
		}
	}

	static async activateDeactivate(req, res) {
		try {
			const { id } = req.params;
			if (isNaN(id)) {
				return response.errorMessage(res, 'your id must be an integer', 400);
			}
			const findUser = await UserServices.findUser(parseInt(id));
			if (!findUser) {
				return response.errorMessage(res, 'the user not found in system', 404);
			}
			const { status } = findUser;
			const activateDeactivate = await dashboardUserServices.activateDeactivate(id, !status);
			if (!activateDeactivate) {
				return response.errorMessage(res, 'something went wrong try again.', 500);
			}
			if (status) {
				return response.successMessage(res, 'account deactivated successfully', 200);
			}
			return response.successMessage(res, 'account activated successfully', 200);
		} catch (error) {
			return response.errorMessage(res, error.message, 500);
		}
	}
}

export default UserController;
