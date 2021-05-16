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

        console.log(JSON.stringify(req.query.postInfo));

        res.render('page/recipeform', { title: title, type: req.params.type, postInfo: JSON.parse(req.query.postInfo), scriptFile: '<script src="/public/js/recipeForm.js"></script>' });
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

<<<<<<< HEAD
router.put('/', async(req, res) => {
=======
router.patch('/:id', async(req, res) => {
>>>>>>> 48a64a132057a4721847aaf8e215af3a8d866a14
    try {
        console.log(req.body);
        //add author
        req.body.author_id = req.session.user.userid;
        req.body.author_name = req.session.user.username;
<<<<<<< HEAD
        let newPost = await posts.updatePost(req.body.postID, req.body);
        const title = "Recipe Created!";
        console.log("Post updated.")
=======
        let newPost = await posts.createPost(req.body);
        const title = "Recipe Created!";
        console.log("Post created.")
>>>>>>> 48a64a132057a4721847aaf8e215af3a8d866a14

        if (newPost) {
            res.json({ status: 'post_created' });
            return;
        } else {
            res.json({ status: 'post_fail' });
            return;
        }

    } catch (e) {
<<<<<<< HEAD
        console.log("Error: Post update. " + e)
=======
        console.log("Error: Post creation. " + e)
>>>>>>> 48a64a132057a4721847aaf8e215af3a8d866a14
        res.json({ status: 'post_fail' });
        // return;
        res.render('page/error');
    }
});

module.exports = router;