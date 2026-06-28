CREATE DATABASE IF NOT EXISTS taj_studio;
USE taj_studio;

CREATE TABLE IF NOT EXISTS videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category ENUM('wedding','prewedding','anniversary','engagement','birthday','indoor') NOT NULL,
  video_type ENUM('youtube','upload') NOT NULL,
  youtube_url VARCHAR(500) DEFAULT NULL,
  file_path VARCHAR(500) DEFAULT NULL,
  thumbnail VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) DEFAULT NULL,
  category ENUM('wedding','prewedding','anniversary','engagement','birthday','indoor') NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  event_type VARCHAR(100),
  event_date DATE,
  message TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Default admin: password is "admin123" — CHANGE AFTER FIRST LOGIN
INSERT INTO admin_users (username, password)
SELECT 'admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE NOT EXISTS (SELECT 1 FROM admin_users WHERE username = 'admin');

-- -------------------------------------------------------------
-- SITE SETTINGS & BRAND CONFIG
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value TEXT
);

INSERT INTO settings (setting_key, setting_value) VALUES
('store_name', 'Taj Studio'),
('about_eyebrow', 'Who We Are'),
('about_title', 'We Breathe Life Into Your Memories'),
('about_text1', 'Based in the heart of India, Taj Studio is an elite collective of filmmakers and visual artists specializing in premium weddings, corporate events, and lifestyle portraiture. We believe that every frame should tell a profound story—combining ambient lighting, natural gestures, and rich colors.'),
('about_text2', 'Our approach is discreet, intimate, and deeply personal. From local traditions to contemporary setups, we ensure your emotional landscape is recorded with absolute fidelity and creative distinction.'),
('about_image', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'),
('hero_duration', '5000'),
('ugc_duration', '4000'),
('contact_address', '123 Palace Road, Jaipur, Rajasthan, India'),
('contact_phone', '+91 99999 99999'),
('contact_email', 'contact@tajstudio.com'),
('contact_instagram', 'https://instagram.com'),
('contact_facebook', 'https://facebook.com'),
('contact_youtube', 'https://youtube.com'),
('contact_whatsapp', 'https://wa.me/919999999999')
ON DUPLICATE KEY UPDATE setting_key=setting_key;

-- -------------------------------------------------------------
-- HERO SLIDES
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hero_slides (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_path VARCHAR(500) NOT NULL,
  title VARCHAR(255) DEFAULT NULL,
  subtitle VARCHAR(255) DEFAULT NULL,
  order_index INT DEFAULT 0
);

INSERT INTO hero_slides (image_path, title, subtitle, order_index) VALUES
('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80', 'Crafting Timeless Stories', 'Luxury Wedding Film & Photography', 1),
('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80', 'Cinematic Love Stories', 'Capturing Raw Unfiltered Emotions', 2),
('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80', 'Fine Art Photography', 'Bespoke Visual Narratives', 3)
ON DUPLICATE KEY UPDATE id=id;

-- -------------------------------------------------------------
-- UGC (USER GENERATED CONTENT) PORTRAIT REELS
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ugc_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('image', 'video') NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  thumbnail_path VARCHAR(500) DEFAULT NULL,
  order_index INT DEFAULT 0
);

INSERT INTO ugc_items (type, file_path, thumbnail_path, order_index) VALUES
('image', 'https://images.unsplash.com/photo-1520854221256-174b1ec358ef?auto=format&fit=crop&w=600&h=800&q=80', NULL, 1),
('image', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&h=800&q=80', NULL, 2),
('image', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&h=800&q=80', NULL, 3),
('image', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&h=800&q=80', NULL, 4)
ON DUPLICATE KEY UPDATE id=id;

