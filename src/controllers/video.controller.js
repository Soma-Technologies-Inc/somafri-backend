import response from "../helpers/response";
import VideoServices from "../services/video.services";
class VideosController {
  static async addVideo(req, res) {
    try {
      if (!req.file) {
        return response.errorMessage(res, "Please enter Video ", 400);
      }
      const videoLink = req.file.location;
      const { title, languageId, genre, category } = req.body;
      const data = {
        title,
        videoLink,
        languageId,
        genre,
        category,
      };
      await VideoServices.create(data);
      return response.successMessage(
        res,
        'Video was created successfully',
        201,
      );
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }
}

export default VideosController;
