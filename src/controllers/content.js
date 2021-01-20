import ContentServices from '../services/content';
import RootContentServices from '../services/content.root';
import LanguageServices from '../services/language';
import response from '../helpers/response';
import Paginate from '../helpers/paginate';

class ContentsController {
	static async addContent(req, res) {
		try {
			const { language } = req.params;

			const Language = await LanguageServices.findLanguage(language);
			if (Language.dataValues.duplicatedLanguageId !== null) {
				const { duplicatedLanguageId } = Language.dataValues;
				const { page } = req.query;
				const limit = 10;
				const offset = Paginate(page, limit);
				const { rootContentId, content } = req.body;
				if (isNaN(rootContentId)) {
					return response.errorMessage(
						res,
						'Your root id must be an integer',
						404,
					);
				}
				const baseLanguageContent = await ContentServices.findContentByRootIdAndByLanguage(rootContentId, duplicatedLanguageId);
				const findRootContent = await RootContentServices.findContentByField(
					limit,
					offset,
					'id', rootContentId,
				);
				if (findRootContent.count <= 0) {
					return response.errorMessage(res, 'Root content not found', 404);
				}
				const findLanguage = await LanguageServices.findLanguage(language);
				if (!findLanguage) {
					return response.errorMessage(res, 'Language not registered', 404);
				}
				const ContentExistence = await ContentServices.findContentExistence(
					rootContentId,
					content,
				);
				if (ContentExistence) {
					return response.errorMessage(res, 'content already registered', 409);
				}

				const data = {
					rootContentId,
					languageId: findLanguage.id,
					content: req.body.content,
					contentAudio: baseLanguageContent.dataValues.contentAudio,
				};
				await ContentServices.CreateContent(data);
				return response.successMessage(
					res,
					'Content saved successfully',
					200,
					data,
				);
			}

			if (!req.file) {
				return response.errorMessage(
					res,
					'Please enter contentAudio',
					400,
				);
			}

			const { page } = req.query;
			const limit = 10;
			const offset = Paginate(page, limit);
			const { rootContentId } = req.body;
			if (isNaN(rootContentId)) {
				return response.errorMessage(
					res,
					'Your root id must be an integer',
					404,
				);
			}
			const { content } = req.body;
			const findRootContent = await RootContentServices.findContentByField(
				limit,
				offset,
				'id', rootContentId,
			);
			if (findRootContent.count <= 0) {
				return response.errorMessage(res, 'Root content not found', 404);
			}
			const findLanguage = await LanguageServices.findLanguage(language);
			if (!findLanguage) {
				return response.errorMessage(res, 'Language not registered', 404);
			}
			const ContentExistence = await ContentServices.findContentExistence(
				rootContentId,
				content,
			);
			if (ContentExistence) {
				return response.errorMessage(res, 'content already registered', 409);
			}
			const data = {
				rootContentId,
				languageId: findLanguage.id,
				content: req.body.content,
				contentAudio: req.file.location,
			};
			ContentServices.CreateContent(data);
			return response.successMessage(
				res,
				'Content saved successfully',
				200,
				data,
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async editContent(req, res) {
		try {
			const { id } = req.params;
			if (req.files.contentAudio) {
				req.body.contentAudio = req.files.contentAudio[0].location;
			}
			await ContentServices.updateContent(id, req.body);
			const updatedData = await ContentServices.findContentById(id);
			if (updatedData) {
				return response.successMessage(
					res,
					'Content updated successfully',
					200,
					updatedData,
				);
			}
			return response.errorMessage(res, 'Root content not found', 404);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async deleteContent(req, res) {
		try {
			const { id } = req.params;
			if (isNaN(id)) {
				return response.errorMessage(res, 'id must be an integer', 400);
			}
			const deleteContent = await ContentServices.deleteContent(
				id,
			);
			if (deleteContent) {
				return response.successMessage(
					res,
					'content deleted successfully',
					200,
				);
			}
			return response.errorMessage(res, 'check your content id', 404);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async searchContent(req, res) {
		const { primaryLanguageId } = req.user;
		try {
			if (req.query.content) {
				const { content } = req.query;
				const findContent = await ContentServices.searchContent(content);
				const findRootContent = await RootContentServices.searchContent(content);

				if (findContent.length > 0 && findRootContent.length > 0) {
					return response.successMessage(
						res,
						'Content and rootContent found',
						200,
						{ RootContent: findRootContent, Content: findContent },
					);
				} if (findContent.length > 0) {
					const translation = [];

					await Promise.all(
						findContent.map(async (course1, index) => {
							const { rootContentId } = findContent[index];
							const contentTranslated = await ContentServices.findContentByRootIdAndByLanguage(
								rootContentId, primaryLanguageId,
							);
							if (contentTranslated) {
								translation.push(
									{
										content: findContent[index],
										translated: contentTranslated,
									},
								);
							} else {
								translation.push(
									{
										content: findContent[index],
										translated: 'no content yet',
									},
								);
							}
						}),
					);
					if (translation.length !== 0) {
						return response.successMessage(
							res,
							'Content found',
							200,
							translation,
						);
					}
				} if (findRootContent.length > 0) {
					return response.successMessage(
						res,
						'Root Content found',
						200,
						findRootContent,
					);
				}
				return response.errorMessage(res, 'Content not found', 404);
			}
			return response.errorMessage(res, 'Please enter the content you want to search', 400);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async addContentsFromTranslate(req, res) {
		try {
			const { languageKey, languageId } = req.body;
			const key = 'en';
			const rootContents = await ContentServices.getRootContents();
			rootContents.map(async (rootContentsData, index) => {
				const text = rootContents[index].dataValues.content;
				const response = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${key}&tl=${languageKey}&dt=t&q=${text}`);
				const audioText = response.data[0][0][0].split(' ').join('');
				const data = {
					content: response.data[0][0][0],
					languageId,
					rootContentId: rootContents[index].dataValues.id,
					contentAudio: `http://translate.google.com.vn/translate_tts?ie=UTF-8&q=${audioText}+&tl=${languageKey}&client=tw-ob`
				};
				await ContentServices.createContents(data);
			});

			return response.successMessage(
				res,
				'Contents were created successfully',
				201,
			);
		} catch (error) {
			return response.errorMessage(res, error.message, 500);
		}
	}

	static async getRootContents() {
		try {
			const rootContents = await db.rootContent.findAll();
			return rootContents;
		} catch (error) {
			return error;
		}
	}

	static async createContents(data) {
		return Queries.create(db.content, data);
	}
}
export default ContentsController;
