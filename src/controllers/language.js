import LanguageServices from '../services/language';
import CountryServices from '../services/country';
import CoursesServices from '../services/courses';
import response from '../helpers/response';
import LanguageHelper from '../helpers/languages.helper';
import UserServices from '../services/users';


class LanguageController {
	static async addLanguage(req, res) {
		try {
			const { name, country, duplicatedLanguageId, languageKey: language_key } = req.body;

			let { learnable } = req.body;
			if (learnable === undefined) {
				learnable = false;
			}
			const findCountry = await CountryServices.findCountry(country);
			if (!findCountry) {
				return response.errorMessage(res, 'Country not registered', 404);
			}
			const { id } = findCountry;
			const findLanguage = await LanguageServices.findLanguage(name);
			if (duplicatedLanguageId !== undefined) {
				const findLanguages = await LanguageServices.getLanguage(duplicatedLanguageId);
				if (findLanguages === null) {
					return response.errorMessage(res, 'duplication language does not exist not registered', 404);
				}
			}
			if (findLanguage) {
				return response.errorMessage(res, 'Language already registered', 409);
			}
			const addLanguage = {
				name,
				countryId: id,
				duplicatedLanguageId,
				learnable,
				language_key
			};
			LanguageServices.CreateLanguage(addLanguage);
			const data = {
				name,
				country,
				duplicatedLanguageId,
				learnable,
				language_key
			};
			return response.successMessage(
				res,
				'Language saved successfully',
				200,
				data,
				duplicatedLanguageId,
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getLanguages(req, res) {
		try {
			const availableLanguage = [];
			if (req.headers.token !== undefined) {
				const token = req.headers.token.split(' ')[1];
				const user = await LanguageHelper.verifyToken(req, res, token);
				const languages = await LanguageServices.getLanguages();
				const { primaryLanguageId } = user.dataValues;
				await Promise.all(
					languages.rows.map(async (course1, index) => {
						if (primaryLanguageId !== languages.rows[index].dataValues.id) {
							const { name } = languages.rows[index].dataValues;
							if (name !== 'English') {
								availableLanguage.push(languages.rows[index].dataValues);
							}
						}
					}),
				);
				if (languages.count > 0) {
					return response.successMessage(
						res,
						'List of countries',
						200,
						availableLanguage,
					);
				}
				return response.errorMessage(res, 'No language registered', 404);
			}

			const languages = await LanguageServices.getLanguages();
			await Promise.all(
				languages.rows.map(async (course1, index) => {
					if (languages.rows[index].dataValues.duplicatedLanguageId === null) {
						const { name } = languages.rows[index].dataValues;

						if (name !== 'English') {
							availableLanguage.push(languages.rows[index].dataValues);
						}
					}
				}),
			);
			if (languages.count > 0) {
				return response.successMessage(
					res,
					'List of countries',
					200,
					availableLanguage,
				);
			}
			return response.errorMessage(res, 'No language registered', 404);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async enrollToLanguage(req, res) {
		try {
			const userId = req.user.id;
			const languageId = req.language.id;
			const countryFlag = req.language.country.dataValues.flag;
			const currentLevel = 1;
			const findLanguage = await LanguageServices.getLanguage(languageId);
			const getLanguageCourses = await CoursesServices.getCourses(languageId);
			const totalLevel = getLanguageCourses.count;
			const data = {
				userId,
				languageId,
				currentLevel,
				totalLevel,
				countryFlag,
			};
			const enrolledLanguage = await LanguageServices.enrollToLanguage(data);
			const responseData = {
				id: enrolledLanguage.dataValues.id,
				userId,
				currentLevel,
				totalLevel,
				enrolledLanguage: findLanguage.name,
				countryFlag,
				updatedAt: enrolledLanguage.dataValues.updatedAt,
				createdAt: enrolledLanguage.dataValues.createdAt,
				currentCourseId: enrolledLanguage.dataValues.currentCourseId,
				currentCourseName: enrolledLanguage.dataValues.currentCourseName,
			};
			return response.successMessage(
				res,
				'You have enrolled to this language successfully',
				201,
				responseData,
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getEnrolledLanguages(req, res) {
		try {
			const userId = req.user.id;
			const languagesResponse = [];

			const enrolledLanguage = await LanguageServices.getEnrolledLanguages(
				userId,
			);
			await Promise.all(
				enrolledLanguage.map(async (language, index) => {
					const {
						languageId,
						id,
						currentLevel,
						totalLevel,
						countryFlag,
						updatedAt,
						createdAt,
						currentCourseId,
						currentCourseName,
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
				}),
			);
			if (languagesResponse.length <= 0) {
				return response.errorMessage(res, 'you did not unllored to any language', 404);
			}
			return response.successMessage(
				res,
				'Enrolled languages',
				200,
				languagesResponse,
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async singleLanguage(req, res) {
		try {
			const { id } = req.params;
			if (isNaN(id)) {
				return response.errorMessage(res, 'id must be an integer', 400);
			}
			const language = await LanguageServices.getLanguage(id);
			if (language) {
				const findCountry = await CountryServices.findCountryById(
					language.countryId,
				);
				const data = {
					id: language.id,
					LanguageName: language.name,
					country: findCountry.name,
					countryFlag: findCountry.flag,
				};
				return response.successMessage(res, 'Language details', 200, data);
			}
			return response.errorMessage(res, 'language not registered', 404);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getLanguagesByCountry(req, res) {
		try {
			const { countryName } = req.params;
			const findCountry = await CountryServices.findCountry(countryName);
			if (!findCountry) {
				return response.errorMessage(res, 'Country not registered', 404);
			}
			const languages = await LanguageServices.findLanguageByCountryId(
				findCountry.id,
			);
			if (languages) {
				return response.successMessage(
					res,
					`${countryName} Languages`,
					200,
					languages,
				);
			}
			return response.errorMessage(
				res,
				'No language found for the entered country',
				404,
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getUsersLearningLanguages(req, res) {
		try {
			const getUsers = await UserServices.getUsers();
			const userLearningLanguages = [];
			let a = -1;
			await Promise.all(
				getUsers.rows.map(async () => {
					const { id } = getUsers.rows[(a += 1)].dataValues;
					const enrolledLanguage = await LanguageServices.getEnrolledLanguages(
						id,
					);
					if (enrolledLanguage.length > 0) {
						userLearningLanguages.push({
							user: getUsers.rows[a].dataValues,
							enrolledLanguage,
						});
					}
				}),
			);

			return response.successMessage(
				res,
				'user Enrolled languages',
				200,
				userLearningLanguages,
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}
}

export default LanguageController;
