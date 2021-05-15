const express = require('express');
const router = express.Router();
const data = require('../data');
const posts = data.postData;


router.get('/:idNumber', async (req, res) => {
    let retrievedPost = await posts.getPost(req.params.idNumber);

    const title = retrievedPost.name;
    console.log(JSON.stringify(retrievedPost.comments));
    res.render('page/viewrecipe', { title: title, post:retrievedPost, postId:req.params.idNumber, scriptFile: '<script src="/public/js/likes.js"></script><script src="/public/js/comments.js"></script>'});
});


module.exports = router;