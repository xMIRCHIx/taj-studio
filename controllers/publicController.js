const db = require('../config/db');

exports.home = async (req, res, next) => {
  try {
    const [featuredVideos] = await db.query('SELECT * FROM videos ORDER BY created_at DESC LIMIT 3');
    const [featuredPhotos] = await db.query('SELECT * FROM photos ORDER BY created_at DESC LIMIT 3');
    const [heroSlides] = await db.query('SELECT * FROM hero_slides ORDER BY order_index ASC');
    const [ugcItems] = await db.query('SELECT * FROM ugc_items ORDER BY order_index ASC');
    res.render('index', { 
      title: 'Taj Studio — Where Every Frame Tells a Story', 
      featuredVideos, 
      featuredPhotos,
      heroSlides,
      ugcItems
    });
  } catch (err) {
    console.error('Home Page Error:', err);
    res.render('index', { 
      title: 'Taj Studio — Where Every Frame Tells a Story', 
      featuredVideos: [], 
      featuredPhotos: [],
      heroSlides: [],
      ugcItems: []
    });
  }
};

exports.videosLanding = (req, res) => {
  res.render('videos', { title: 'Our Films — Taj Studio', navSolid: true });
};

exports.photosLanding = (req, res) => {
  res.render('photos', { title: 'Our Photography — Taj Studio', navSolid: true });
};

exports.videoCategory = async (req, res, next) => {
  const { category } = req.params;
  const validCats = ['wedding','prewedding','anniversary','engagement','birthday','indoor'];
  if (!validCats.includes(category)) return res.redirect('/videos');
  
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const offset = (page - 1) * limit;
    
    const [videos] = await db.query(
      'SELECT * FROM videos WHERE category = ? ORDER BY order_index ASC, created_at DESC LIMIT ? OFFSET ?',
      [category, limit, offset]
    );
    
    const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM videos WHERE category = ?', [category]);
    const totalPages = Math.ceil(total / limit) || 1;

    // Fetch page banner
    const [[bannerRow]] = await db.query(
      'SELECT setting_value FROM settings WHERE setting_key = ?',
      [`banner_videos_${category}`]
    );
    const pageBanner = bannerRow ? bannerRow.setting_value : null;
    
    res.render('category', { 
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Films — Taj Studio`, 
      type: 'video', 
      category, 
      items: videos, 
      page, 
      totalPages,
      navSolid: true,
      pageBanner
    });
  } catch (err) {
    console.error('Video Category Error:', err);
    next(err);
  }
};

exports.photoCategory = async (req, res, next) => {
  const { category } = req.params;
  const validCats = ['wedding','prewedding','anniversary','engagement','birthday','indoor'];
  if (!validCats.includes(category)) return res.redirect('/photos');
  
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const offset = (page - 1) * limit;
    
    const [photos] = await db.query(
      'SELECT * FROM photos WHERE category = ? ORDER BY order_index ASC, created_at DESC LIMIT ? OFFSET ?',
      [category, limit, offset]
    );
    
    const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM photos WHERE category = ?', [category]);
    const totalPages = Math.ceil(total / limit) || 1;

    // Fetch page banner
    const [[bannerRow]] = await db.query(
      'SELECT setting_value FROM settings WHERE setting_key = ?',
      [`banner_photos_${category}`]
    );
    const pageBanner = bannerRow ? bannerRow.setting_value : null;
    
    res.render('category', { 
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Photography — Taj Studio`, 
      type: 'photo', 
      category, 
      items: photos, 
      page, 
      totalPages,
      navSolid: true,
      pageBanner
    });
  } catch (err) {
    console.error('Photo Category Error:', err);
    next(err);
  }
};

exports.contactPage = (req, res) => {
  res.render('contact', { title: 'Contact — Taj Studio', navSolid: true });
};

exports.contactSubmit = async (req, res, next) => {
  const { name, email, phone, event_type, event_date, message } = req.body;
  try {
    await db.query(
      'INSERT INTO contacts (name, email, phone, event_type, event_date, message) VALUES (?,?,?,?,?,?)',
      [name, email, phone, event_type, event_date || null, message]
    );
    req.flash('success', 'Message sent! We will get back to you soon.');
    res.redirect('/contact');
  } catch (err) {
    console.error('Contact Submission Error:', err);
    req.flash('error', 'Something went wrong. Please try again.');
    res.redirect('/contact');
  }
};

exports.pricingPage = (req, res) => {
  res.render('pricing', { title: 'Pricing & Packages — Taj Studio' });
};
