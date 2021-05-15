const express = require('express');
const router = express.Router();
const data = require('../data');
const posts = data.postData;
const likes = data.likeData;
const ObjectId = require('mongodb').ObjectID;

router.get('/:idNumber', async(req, res) => {
    let retrievedPost = await posts.getPost(req.params.idNumber);

    const title = retrievedPost.name;
    //convert the date
    retrievedPost.postedDate = new Date(retrievedPost.postedDate).toLocaleString('English', { hour12: false });
    console.log(JSON.stringify(retrievedPost.comments));
    let showLike = 'hidden';
    let showDislike = 'hidden';
    let userId = ObjectId(req.session.user.userid).toString();
    let liked = await likes.getLikeByUserId(req.params.idNumber, userId);
    if (liked === null) {
        showLike = 'show';
    }
    else {
        showDislike = 'show';
    }
    res.render('page/viewrecipe', { title: title, post: retrievedPost, postId: req.params.idNumber, scriptFile: '<script src="/public/js/likes.js"></script><script src="/public/js/comments.js"></script>', showLike: showLike, showDislike: showDislike });

});

router.post('/edit/:idNumber', async(req, res) => {
    let retrievedPost = await posts.getPost(req.params.idNumber);

    const title = retrievedPost.name;
    //convert the date
    retrievedPost.postedDate = new Date(retrievedPost.postedDate).toLocaleString('English', { hour12: false });
    // console.log(JSON.stringify(retrievedPost.comments));
    res.render('page/editRecipe', { title: title, post: retrievedPost, postId: req.params.idNumber, scriptFile: '<script src="/public/js/likes.js"></script><script src="/public/js/comments.js"></script>' });
});


module.exports = router;