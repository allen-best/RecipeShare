const express = require('express');
const router = express.Router();
const xss = require('xss');
const userData = require('../data/users');
const postData = require('../data/posts');

router.get('/', async(req, res) => {
    try {
        const title = "Create an account on RecipeShare";
        res.render('page/registrationForm', { title: title });
    } catch (e) {
        res.status(404);
    }
});



module.exports = router;