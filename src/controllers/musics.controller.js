import response from "../helpers/response";
import MusicServices from "../services/music.services";
class MusicsController {
  static async addMusic(req, res) {
    try {
      if (!req.file) {
        return response.errorMessage(res, "Please enter music audio", 400);
      }
      const musicLink = req.file.location;
      const { title, languageId, genre, category } = req.body;
      const data = {
        title,
        musicLink,
        languageId,
        genre,
        category,
      };
      await MusicServices.create(data);
      return response.successMessage(
        res,
        'Music was created successfully',
        201,
      );
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }
}

export default MusicsController;
