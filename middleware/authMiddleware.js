module.exports = (req, res, next) => {
  if (req.session.admin) return next();
  req.flash('error', 'Please login to access admin panel');
  res.redirect('/auth/login');
};
