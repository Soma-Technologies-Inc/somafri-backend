import jwt from 'jsonwebtoken';
import LanguageServices from '../services/language';
import UserServices from '../services/users';

import response from './response';

class LanguagesHelper {
	static async getLanguageName(languageId) {
		const languageName = await LanguageServices.getLanguage(languageId);
		return languageName;
	}

	static async getLanguageCourses(languageId) {
		const languageCourses = await LanguageServices.getCourses(languageId);
		return languageCourses;
	}

	static async verifyToken(req, res, token) {
		const decodedToken = jwt.verify(token, process.env.JWTKEY);

		const user = await UserServices.findUserByEmail(
			decodedToken.payload.email,
		);

		decodedToken.token = token;
		if (user === undefined) {
			return response.errorMessage(
				res,
				'You provided the invalid token!',
				401,
			);
		}

		if (user.token !== token && user.token === null) {
			return response.successMessage(res, 'You need to signin first!', 401);
		}
		return user;
	}
}
export default LanguagesHelper;
