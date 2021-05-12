const logoutRoutes = require('./logout');
const userRoutes = require('./users');
const loginRoutes = require('./login');
const privateRoutes = require('./private');

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/logout', logoutRoutes);
  app.use('/login', loginRoutes);
  app.use('/private', privateRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;