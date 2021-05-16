const express = require('express');
const router = express.Router();
const postsDB = require('../data/posts');
const xss = require('xss');

router.post('/', async(req, res) => {
    try {
        if (!req.body.keyword || !req.body.type) {
            console.log('keyword not exist');
            res.sendStatus(404);
            return;
        }
        let keyword = xss(req.body.keyword);
        let type = xss(req.body.type);
        let data = await postsDB.searchPost(keyword, type);
        res.json({
            data: data
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
        res.render('page/error');
    }
});


module.exports = router;