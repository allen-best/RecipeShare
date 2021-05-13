const express = require('express');
const router = express.Router();
const data = require('../data');
const posts = data.postData;

router.get('/', async (req, res) => {
    try {
        const title = "Create a Recipe";
        res.render('page/recipeform', {title: title});
    } catch (e) {
        res.status(404);
    }
});

router.post('/', async (req, res) => {
    try {
        let newPost = await posts.createPost(req.body);
        const title = "Recipe Created!";

        res.render('search/static', {title: title, searchTerm:searchTerm, shows:shows.slice(0, 19), isEmpty:false});
    } catch (e) {
        res.status(404);
    }
});

module.exports = router;