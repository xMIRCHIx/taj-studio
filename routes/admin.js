const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.use(auth);

router.get('/dashboard', ctrl.dashboard);

router.get('/upload-video', ctrl.uploadVideoPage);
router.post('/upload-video', upload.fields([
  { name: 'video_file', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), ctrl.uploadVideo);

router.get('/upload-photo', ctrl.uploadPhotoPage);
router.post('/upload-photo', upload.array('photos', 20), ctrl.uploadPhotos);

router.get('/manage-videos', ctrl.manageVideos);
router.get('/manage-photos', ctrl.managePhotos);
router.get('/messages', ctrl.messages);

router.delete('/video/:id', ctrl.deleteVideo);
router.delete('/photo/:id', ctrl.deletePhoto);

// Site Custom Settings Routes
router.get('/settings', ctrl.settingsPage);
router.post('/settings/general', upload.single('about_image'), ctrl.updateGeneralSettings);
router.post('/settings/hero/add', upload.single('hero_image'), ctrl.addHeroSlide);
router.post('/settings/hero/delete/:id', ctrl.deleteHeroSlide);
router.post('/settings/ugc/add', upload.array('ugc_files', 24), ctrl.addUgcItems);
router.post('/settings/ugc/delete/:id', ctrl.deleteUgcItem);

module.exports = router;
