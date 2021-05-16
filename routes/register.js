const express = require('express');
const router = express.Router();
//const xss = require('xss');
const user = require('../data/users');
//const postData = require('../data/posts');

router.get('/', async(req, res) => {
    try {
        const title = "Create an account on RecipeShare";
        res.render('page/registrationForm', { title: title });
    } catch (e) {
        res.status(404);
        res.render('page/error');
    }
});

router.post('/', async(req, res) => {
    try {
        let newUser = await user.createUser(req.body);
        const title = "User Created!";
        req.session.user = { username: `${newUser.firstName} ${newUser.lastName}`, userid: newUser._id };
        res.redirect("/");
    } catch (e) {
        console.log(e);
        res.status(404);
        res.render('page/error');
    }
});

router.get('/edit', async(req, res) => {
    try {
        const title = "Edit an account on RecipeShare";
        res.render('page/registrationForm', { title: title });
    } catch (e) {
        res.status(404);
        res.render('page/error');
    }
});

router.post('/edit', async(req, res) => {
    try {
        let newUser = await user.createUser(req.body);
        const title = "User Created!";
        req.session.user = { username: `${newUser.firstName} ${newUser.lastName}`, userid: newUser._id };
        res.redirect("/");
    } catch (e) {
        console.log(e);
        res.status(404);
        res.render('page/error');
    }
});

// app.use('*', (req, res) => {
//     res.redirect('/');
// });

module.exports = router;