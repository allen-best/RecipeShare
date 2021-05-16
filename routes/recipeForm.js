const express = require('express');
const router = express.Router();
const data = require('../data');
const posts = data.postData;

router.get('/:type', async(req, res) => {
    try {
        let title;
        if (req.params.type === 'create') {
            title = "Create a Recipe";
        } else if (req.params.type === 'edit') {
            title = "Edit a Recipe";
        }
        let postInfo = req.query.postInfo ? req.query.postInfo : "{}";

        res.render('page/recipeform', { title: title, type: req.params.type, postInfo: JSON.parse(postInfo), scriptFile: '<script src="/public/js/recipeForm.js"></script>' });
    } catch (e) {
        console.log(e);
        res.status(404);
        res.render('page/error');
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
            return;
        } else {
            res.json({ status: 'post_fail' });
            return;
        }

    } catch (e) {
        console.log("Error: Post creation. " + e)
        res.json({ status: 'post_fail' });
        // return;
        res.render('page/error');
    }
});

router.get('/:id', async(req, res) => {
    let postID = req.params.id;

    try {
        const userInfo = await posts.get(postID);

        const title = "Edit an account on RecipeShare";
        res.render('page/editRecipeform', { title: title, userInfo: userInfo });
    } catch (e) {
        res.status(404);
        res.render('page/error');
    }

});

router.put('/', async(req, res) => {

    try {
        console.log(req.body);
        //add author
        req.body.author_id = req.session.user.userid;
        req.body.author_name = req.session.user.username;
        let newPost = await posts.updatePost(req.body.postID, req.body);
        const title = "Recipe Created!";
        console.log("Post updated.")

        if (newPost) {
            res.json({ status: 'post_created' });
            return;
        } else {
            res.json({ status: 'post_fail' });
            return;
        }

    } catch (e) {
        console.log("Error: Post update. " + e)
        res.json({ status: 'post_fail' });
        // return;
        res.render('page/error');
    }
});

module.exports = router;