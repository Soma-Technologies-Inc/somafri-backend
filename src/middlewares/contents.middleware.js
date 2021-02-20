import response from '../helpers/response';
import RootContentServices from '../services/content.root';

/**
 * Class for courses
 */
class ContentsMiddleware {
	static async findRootContentExistence(req, res, next) {
		const { rootCourseId, content, } = req.body;
		const ContentExistence = await RootContentServices.findContentExistence(
			rootCourseId,
			content,
		);
		if (ContentExistence) {
			return response.errorMessage(res, 'root content already registered', 409);
		}
		return next();
	}
}
export default ContentsMiddleware;
