const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const searchRoutes = require('./search');
const recipeFormRoutes = require('./recipeForm');
const setupRoutes = require('./setup');
const homepageRoutes = require('./homepage');
const profileRoutes = require('./profile');
const registerRoutes = require('./register');
const postRoutes = require('./posts');


const constructorMethod = (app) => {
    app.use('/login', loginRoutes);
    app.use('/logout', logoutRoutes);
    app.use('/search', searchRoutes);
    app.use('/recipe-form', recipeFormRoutes);
    app.use('/setup', setupRoutes);
    app.use('/profile', profileRoutes);
    app.use('/register', registerRoutes);
    app.use('/post', postRoutes);
    app.use('/', homepageRoutes);

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;