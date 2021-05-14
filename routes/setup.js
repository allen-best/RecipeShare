const express = require('express');
const router = express.Router();
const postsDB = require('../data/posts');

router.get('/', async (req, res) => {
    let data = await postsDB.postForHomepage();
    res.json({
        data: data
    });
});

module.exports = router;