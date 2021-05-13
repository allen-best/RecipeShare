const loginRoutes = require('./login');
const searchRoutes = require('./search');
const recipeFormRoutes = require('./recipeForm');


const constructorMethod = (app) => {
  app.use('/login', loginRoutes);
  app.use('/search', searchRoutes);
  app.use('/recipe-form', recipeFormRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;