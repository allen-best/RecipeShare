const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 16;
//const userDB = require('../data/users.js');

router.get('/', async (req, res) => {
    try {
        res.render('page/login', { scriptFile: '<script src="/public/js/login.js"></script>' });
    } catch (e) {
        res.status(404);
    }
});
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    let authenticated = false;
    //check the username and password
    if (username === '1111' & password === '2222') {
        authenticated = true;
    }

    console.log(username);
    console.log(password);



    if (authenticated === true) {
        req.session.user = { username: username, userid: 'test id' }; //update later
        res.json({ status: 'login_success' });
    } else {
        res.json({ status: 'login_fail' });
    }
});

module.exports = router;
