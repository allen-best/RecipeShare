const express = require('express');
const router = express.Router();
const postsDB = require('../data/posts');

router.post('/', async (req, res) => {
    let keyword = req.body.keyword;
    let type = req.body.type;
    let data = await postsDB.searchPost(keyword, type);
    res.json({
        data: data
    });

});


module.exports = router;
