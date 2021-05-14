const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const searchRoutes = require('./search');
const recipeFormRoutes = require('./recipeForm');
const setupRoutes = require('./setup');


const constructorMethod = (app) => {
  app.use('/login', loginRoutes);
  app.use('/logout', logoutRoutes);
  app.use('/search', searchRoutes);
  app.use('/recipe-form', recipeFormRoutes);
  app.use('/setup', setupRoutes);
  app.use('/', (req, res) => {
    //check login status
    let user = req.session.user;
    let toolbar;
    if (!user) {
      toolbar = `<h2><a href='/login'>Sign in</a></h2>`;
    } else {
      toolbar = `<h2>Hi, ${user.username} ! &emsp; <a href='/logout'>Sign out</a></h2>`;
    }
    res.render('page/homepage', { scriptFile: '<script src="/public/js/homepage.js"></script>', toolBar: toolbar });
  });

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;