import response from "../helpers/response";
import PlaylistService from "../services/playlist.services";
import cron from "node-cron";
class PlaylistController {
  static async addPlaylist(req, res) {
    try {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const { audioId, title } = req.body;
      const data = {
        audioId,
        title,
        date,
        isCompleted: false,
      };
      await PlaylistService.create(data);
      return response.successMessage(
        res,
        "Playlist was added successfully",
        201
      );
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }

  static async addPlaylistTrack(req, res) {
    try {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const userId = req.user.id;
      const time = "00:00:00";
      const data = {
        userId,
        date,
        time,
      };

      await PlaylistService.addPlaylistTracker(data);
      return response.successMessage(
        res,
        "Playlist tracker was added successfully",
        201
      );
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }

  static async updatePlaylistTrack(req, res) {
    try {
      const { date, time } = req.body;
      const userId = req.user.id;
      const updateResponse = await PlaylistService.updatePlaylistTracker(
        userId,
        date,
        time
      );
      if (updateResponse) {
        return response.successMessage(
          res,
          "Playlist tracker was updated successfully",
          200
        );
      } else {
        return response.errorMessage(
          res,
          "Oops something happened playlist track was not updated",
          404
        );
      }
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }

  static async startPlaylist(req, res) {
    try {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const currentPlaylists = [];
      const playlists = await PlaylistService.getPlaylistByDate(date);
      playlists.map((data, index) => {
        const arrayData = {
          playlist: data.dataValues,
          audio: data.dataValues.audio.dataValues,
        };
        currentPlaylists.push(arrayData);
      });
      let duration;
      function setDuration() {
        duration = currentPlaylists[0].audio.duration;
      }
      cron.schedule(`* * * * * *`, function () {
        setDuration();
        const topCurrentPlaylist = {
          playlist1: currentPlaylists[0],
          playlist2: currentPlaylists[1],
        };
        res.send(topCurrentPlaylist);
        currentPlaylists.shift();
        res.removeHeader("topCurrentPlaylist");
        setDuration();
      });
    } catch (error) {}
  }
}

export default PlaylistController;
