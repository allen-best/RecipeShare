const loginRoutes = require('./login');
const searchRoutes = require('./search');
const recipeFormRoutes = require('./recipeForm');
const setupRoutes = require('./setup');


const constructorMethod = (app) => {
  app.use('/login', loginRoutes);
  app.use('/search', searchRoutes);
  app.use('/recipe-form', recipeFormRoutes);
  app.use('/setup',setupRoutes);
  app.use('/', (req, res) => {
    //check login status
    res.render('page/homepage', {scriptFile:'<script src="/public/js/homepage.js"></script>'});
    /*
    if (req.session.user) {
        res.redirect('/private');
    } else {
        res.render('page/form', {});
    }*/
  });

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;