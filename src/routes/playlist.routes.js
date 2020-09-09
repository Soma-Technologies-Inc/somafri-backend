import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import PlaylistController from '../controllers/playlist.controller';
import verifyAdmin from '../middlewares/verify.admin';


const router = express.Router();

router.post('/', PlaylistController.addPlaylist);
router.post('/start', PlaylistController.startPlaylist);
router.post('/tracker',verifyToken.headerToken, PlaylistController.addPlaylistTrack);
router.patch('/tracker',verifyToken.headerToken, PlaylistController.updatePlaylistTrack);

export default router;