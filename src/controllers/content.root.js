import RootContentServices from '../services/content.root';
import response from '../helpers/response';

class RootContentController {
  static async addContent(req, res) {
    try {
      if (!req.files.contentImage || !req.files.contentAudio) {
        return response.errorMessage(res, 'Please provide contentImage and contentAudio', 400);
      }
      req.body.contentImage = req.files.contentImage[0].location;
      req.body.contentAudio = req.files.contentAudio[0].location;
      const {
        rootCourseId,
        chapter,
        content,
        contentImage,
        contentAudio,
      } = req.body;
      const ContentExistence = await RootContentServices.findContentExistence(
        rootCourseId,
        content,
      );
      if (ContentExistence) {
        return response.errorMessage(res, 'content already registered', 409);
      }
      RootContentServices.CreateContent(req.body);
      const data = {
        rootCourseId,
        chapter,
        content,
        contentImage,
        contentAudio,
      };
      return response.successMessage(
        res,
        'Course saved successfully',
        200,
        data,
      );
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
      const deleteContent = await RootContentServices.deleteContent(
        id,
      );
      if (deleteContent) {
        return response.successMessage(
          res,
          'Root content deleted successfully',
          200,
        );
      }
      return response.errorMessage(res, 'check your content id', 404);
    } catch (e) {
      return response.errorMessage(res, e.message, 500);
    }
  }

  static async editRootContent(req, res) {
    try {
      const { id } = req.params;

      if (req.files.contentImage && req.files.contentAudio) {
        req.body.contentImage = req.files.contentImage[0].location;
        req.body.contentAudio = req.files.contentAudio[0].location;
      } else if (req.files.contentImage) {
        req.body.contentImage = req.files.contentImage[0].location;
      } else if (req.files.contentAudio) {
        req.body.contentAudio = req.files.contentAudio[0].location;
      }
      await RootContentServices.updateContent(id, req.body);
      const updatedData = await RootContentServices.findContentFields('id', id);
      if (updatedData.count > 0) {
        return response.successMessage(
          res,
          'Content updated successfully',
          200,
          updatedData.rows,
        );
      }
      return response.errorMessage(res, 'Root content not found', 404);
    } catch (e) {
      return response.errorMessage(res, e.message, 500);
    }
  }
}
export default RootContentController;
