import axios from 'axios';
import DailyWord from '../services/dailyWords';
import TrackDailyWordServices from '../services/trackDailyWords';
import response from '../helpers/response';
import LanguageServices from '../services/language';
import translate from '../helpers/translate';

class dailyWord {
	static async addDailyWord(req, res) {
		try {
			const checkExistence = await DailyWord.findDailyWord(
				req.body.text
			);
			const addWord = await DailyWord.CreateDailyWord(
				req.body
			);
			if (checkExistence) {
				return response.errorMessage(res, 'Word already registered', 409);
			}
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
			const { languageKey } = req.params;
			const dailyWordsList = await DailyWord.getDailyWords();
			const unreadDailyWord = [];
			const unreadTranslated = [];
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

			await Promise.all(
				unreadDailyWord.map(async (Word) => {
					const getPrimaryLanguage = await LanguageServices.getLanguage(primaryLanguageId);
					const primaryTranslatedWord = await axios.get(
						`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${getPrimaryLanguage.language_key}&dt=t&q=${Word.text}`
					);
					const translatedWord = await axios.get(
						`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${languageKey}&dt=t&q= ${Word.text}`
					);
					const getLanguageTranslateName = await LanguageServices.findLanguageByKey(languageKey);
					let languageTranslateName;
					if (getLanguageTranslateName) {
						languageTranslateName = getLanguageTranslateName.name;
					} else {
						languageTranslateName = 'english';
					}
					const translatedResponse = {
						primaryLanguageName: getPrimaryLanguage.name,
						primaryLanguage: primaryTranslatedWord.data[0][0][0],
						languageTranslateName,
						languageTranslate: translatedWord.data[0][0][0]
					};
					unreadTranslated.push(translatedResponse);
				})
			);
			if (unreadTranslated.length <= 0) {
				return response.errorMessage(res, 'no Daily Word found', 404);
			}
			return response.successMessage(
				res,
				'List of unread Daily Words',
				200,
				unreadTranslated
			);
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
			const getPrimaryLanguage = await LanguageServices.getLanguage(primaryLanguageId);
			const titleTranslated = await axios.get(
				`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${getPrimaryLanguage.language_key}&dt=t&q=Word of the day`
			);
			const primaryTranslatedWord = await axios.get(
				`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${getPrimaryLanguage.language_key}&dt=t&q=${unreadDailyWord[0].text}`
			);
			const translatedWord = await axios.get(
				`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${languageKey}&dt=t&q= ${unreadDailyWord[0].text}`
			);
			await TrackDailyWordServices.ReadDailyWord({ wordId: unreadDailyWord[0].id, userId });
			const getLanguageTranslateName = await LanguageServices.findLanguageByKey(languageKey);
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
				languageTranslate: translatedWord.data[0][0][0]
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
