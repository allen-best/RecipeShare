const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 16;
const xss = require('xss');
//const userDB = require('../data/users.js');

router.get('/', async (req, res) => {
    try {
        res.render('page/login', { scriptFile: '<script src="/public/js/login.js"></script>' });
    } catch (e) {
        res.status(404);
    }
});
router.post('/', async (req, res) => {
    if(!req.body.email || !req.body.password){
        console.log('email or password not exist');
        res.sendStatus(404);
        return;
    }
    const email = xss(req.body.email);
    const password = xss(req.body.password);

    let authenticated = false;
    //check the email and password
    if (email === '1111' & password === '2222') {
        authenticated = true;
    }
    /*
    
    */

    if (authenticated === true) {
        req.session.user = { username: 'test username update later', userid: 'test id' }; //update later
        res.json({ status: 'login_success' });
    } else {
        res.json({ status: 'login_fail' });
    }
});

module.exports = router;
