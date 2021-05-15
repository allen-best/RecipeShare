const express = require('express');
const router = express.Router();
const data = require('../data');
const posts = data.postData;

router.get('/', async(req, res) => {
    try {
        const title = "Create a Recipe";
        res.render('page/recipeform', { title: title, scriptFile: '<script src="/public/js/recipeForm.js"></script>' });
    } catch (e) {
        res.status(404);
    }
});

router.post('/', async(req, res) => {
    try {
        console.log(req.body);
        //add author
        req.body.author_id = req.session.user.userid;
        req.body.author_name = req.session.user.username;
        let newPost = await posts.createPost(req.body);
        const title = "Recipe Created!";
        console.log("Post created.")

        if (newPost) {
            res.json({ status: 'post_created' });
        } else {
            res.json({ status: 'post_fail' });
        }

    } catch (e) {
        console.log("Error: Post creation. " + e)
        res.json({ status: 'post_fail' });
        res.status(404).send(e);
        // res.render('page/error');
    }
});

module.exports = router;