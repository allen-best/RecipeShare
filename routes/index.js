const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const searchRoutes = require('./search');
const recipeFormRoutes = require('./recipeForm');
const setupRoutes = require('./setup');
const homepageRoutes = require('./homepage');
const profileRoutes = require('./profile');
const registerRoutes = require('./register');
const postRoutes = require('./post');
const data = require('../data');
const posts = data.postData;
const likes = data.likeData;
const comments = data.commentData;

const ObjectId = require('mongodb').ObjectID;


const constructorMethod = (app) => {
    app.use('/login', loginRoutes);
    app.use('/logout', logoutRoutes);
    app.use('/search', searchRoutes);
    app.use('/recipe-form', recipeFormRoutes);
    app.use('/setup', setupRoutes);
    app.use('/profile', profileRoutes);
    app.use('/register', registerRoutes);
    app.use('/post', postRoutes);
    app.use('/',homepageRoutes);

    app.post('/new-like', async (req, res) => {
        try {
            let newLike = await likes.createLike(ObjectId(req.body.postId).toString());
            console.log("Post created.")
    
            if (newLike) {
                res.json({ status: 'like_created' });
            } else {
                res.json({ status: 'like_fail' });
            }
    
        } catch (e) {
            console.log("Error: Post creation. " + e)
            res.json({ status: 'like_fail' });
            res.status(404).send(e);
        }
    });

    app.post('/new-comment', async (req, res) => {
        try {
            let newComment = await comments.createComment(ObjectId(req.body.postId).toString(), {rating: req.body.rating, comment:req.body.comment});
    
            if (newComment) {
                res.json({ status: 'comment_created' });
            } else {
                res.json({ status: 'comment_fail' });
            }
    
        } catch (e) {
            console.log("Error: Post creation. " + e)
            res.json({ status: 'comment_fail' });
            res.status(404).send(e);
        }
    });

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;