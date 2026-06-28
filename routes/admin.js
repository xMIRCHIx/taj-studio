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

// Banner update route
router.post('/settings/banners', upload.fields([
  { name: 'banner_photos_wedding', maxCount: 1 },
  { name: 'banner_photos_prewedding', maxCount: 1 },
  { name: 'banner_photos_anniversary', maxCount: 1 },
  { name: 'banner_photos_engagement', maxCount: 1 },
  { name: 'banner_photos_birthday', maxCount: 1 },
  { name: 'banner_photos_indoor', maxCount: 1 },
  { name: 'banner_videos_wedding', maxCount: 1 },
  { name: 'banner_videos_prewedding', maxCount: 1 },
  { name: 'banner_videos_anniversary', maxCount: 1 },
  { name: 'banner_videos_engagement', maxCount: 1 },
  { name: 'banner_videos_birthday', maxCount: 1 },
  { name: 'banner_videos_indoor', maxCount: 1 },
]), ctrl.updateBanners);

// Reorder routes (AJAX)
router.put('/reorder-photos', ctrl.reorderPhotos);
router.put('/reorder-videos', ctrl.reorderVideos);

module.exports = router;
