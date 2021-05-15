const express = require('express');
const router = express.Router();
const data = require('../data');
const user = data.userData;

router.get('/', async (req, res) => {
    try {
        
        res.render('page/register');
    } catch (e) {
        res.status(404);
    }
});

router.post('/', async (req, res) => {
    try {
        let newUser = await user.createUser(req.body);
        const title = "User Created!";

        res.redirect("/");
    } catch (e) {
        res.status(404);
    }
});

module.exports = router;