import axios from 'axios';
import DailyWord from '../services/dailyWords';
import TrackDailyWordServices from '../services/trackDailyWords';
import DailyWordTranslatesServices from '../services/dailyWordTranslates';
import response from '../helpers/response';
import LanguageServices from '../services/language';
import translate from '../helpers/translate';

class dailyWord {
	static async addDailyWord(req, res) {
		try {
			const { text } = req.body;
			const checkExistence = await DailyWord.findDailyWord(req.body.text);
			if (checkExistence) {
				return response.errorMessage(res, 'Word already registered', 409);
			}
			const addWord = await DailyWord.CreateDailyWord(req.body);
			const languages = await LanguageServices.getLanguages();
			await Promise.all(
				languages.rows.map(async (language) => {
					if (language.id !== 2) {
						const translatedWord = await axios.get(
							`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${language.language_key}&dt=t&q= ${text}`
						);
						DailyWordTranslatesServices.addTranslate({
							dailyWordId: addWord.id,
							languageId: language.id,
							text: translatedWord.data[0][0][0]
						});
					}
				})
			);
			return response.successMessage(
				res,
				'Daily Word created successfully',
				201,
				addWord
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getUnreadDailyWord(req, res) {
		try {
			const { id: userId, primaryLanguageId } = req.user;
			const dailyWordsList = await DailyWord.getDailyWords();
			const unreadDailyWord = [];
			await Promise.all(
				dailyWordsList.map(async (Word) => {
					const { id } = Word;
					const findIfRead = await TrackDailyWordServices.getDailyWord(
						id,
						userId
					);
					if (!findIfRead) {
						unreadDailyWord.push(Word);
					}
				})
			);
			if (unreadDailyWord.length <= 0) {
				return response.errorMessage(res, 'no new Daily Word found', 404);
			}
			const enrolledLanguage = await LanguageServices.getMyEnrolledLanguages(
				userId
			);
			let unrolledTranslatedWords = [];
			let todayWord = [];
			const dailyWords = [];

			await Promise.all(
				unreadDailyWord.map(async (word) => {
					unrolledTranslatedWords = [];
					todayWord = [];
					await Promise.all(
						enrolledLanguage.map(async (language, index) => {
							const getMyEnrolledTranslation = await DailyWordTranslatesServices.findTranslation(
								word.id,
								language.languageId);
							const getMyPrimaryTranslation = await DailyWordTranslatesServices.findTranslation(
								word.id,
								primaryLanguageId);

							if (index <= 0) {
								todayWord.push({
									todayWord: getMyEnrolledTranslation.dailyWord.text,
									dailyWordId: getMyEnrolledTranslation.dailyWord.id,
								});
							}
							unrolledTranslatedWords.push({
								dailyWordId: getMyEnrolledTranslation.dailyWord.id,
								languageName: getMyEnrolledTranslation.language.name,
								wordTranslation: getMyEnrolledTranslation.text,
								primaryWord: getMyPrimaryTranslation.text,
							});
						})
					);
					dailyWords.push({
						todayWord: todayWord[0].todayWord,
						dailyWordId: todayWord[0].dailyWordId,
						unrolledTranslatedWords
					});
					unrolledTranslatedWords = [];
					todayWord = [];
				})
			);
			dailyWords.map(async (word) => {
				await TrackDailyWordServices.ReadDailyWord({
					wordId: word.dailyWordId,
					userId,
				});
			});

			return response.successMessage(res, 'List of unread Daily Words', 200, dailyWords);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getDailyWord(req, res) {
		try {
			const { id: userId, primaryLanguageId } = req.user;
			const { languageKey } = req.body;
			const dailyWordsList = await DailyWord.getDailyWords();
			const unreadDailyWord = [];
			await Promise.all(
				dailyWordsList.map(async (Word) => {
					const { id } = Word;
					const findIfRead = await TrackDailyWordServices.getDailyWord(
						id,
						userId
					);
					if (!findIfRead) {
						unreadDailyWord.push(Word);
					}
				})
			);

			if (unreadDailyWord.length <= 0) {
				return response.errorMessage(res, 'no new Daily Word found', 404);
			}
			const getPrimaryLanguage = await LanguageServices.getLanguage(
				primaryLanguageId
			);
			const titleTranslated = await axios.get(
				`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${getPrimaryLanguage.language_key}&dt=t&q=Word of the day`
			);
			const primaryTranslatedWord = await axios.get(
				`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${getPrimaryLanguage.language_key}&dt=t&q=${unreadDailyWord[0].text}`
			);
			const translatedWord = await axios.get(
				`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${languageKey}&dt=t&q= ${unreadDailyWord[0].text}`
			);
			await TrackDailyWordServices.ReadDailyWord({
				wordId: unreadDailyWord[0].id,
				userId,
			});
			const getLanguageTranslateName = await LanguageServices.findLanguageByKey(
				languageKey
			);
			let languageTranslateName;
			if (getLanguageTranslateName) {
				languageTranslateName = getLanguageTranslateName.name;
			} else {
				languageTranslateName = 'english';
			}
			const todayWord = {
				primaryLanguageName: getPrimaryLanguage.name,
				primaryLanguage: primaryTranslatedWord.data[0][0][0],
				languageTranslateName,
				languageTranslate: translatedWord.data[0][0][0],
			};
			if (todayWord) {
				return response.successMessage(
					res,
					`${titleTranslated.data[0][0][0]}`,
					200,
					todayWord
				);
			}
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}
}

export default dailyWord;
