import response from '../helpers/response';

class uploaderController {
	static async uploadFiles(req, res) {
		try {
			if (!req.file) {
				return response.errorMessage(res, 'Please provide Image or Audio media', 400);
			}
			req.body.media = req.file.location;
			const { media } = req.body;

			return response.successMessage(
				res,
				'saved successfully',
				200,
				{ mediaLink: media },
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}
}

export default uploaderController;
