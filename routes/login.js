const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 16;
//const userDB = require('../data/users.js');

router.get('/', async (req, res) => {
    try {
        res.render('page/login', {});
    } catch (e) {
        res.status(404);
    }
});
router.post('/', async (req, res) => {

    /*
    const { username, password } = req.body;
    let authenticated = false;
    for(let i = 0; i < userDB.length; i++) {
        if (userDB[i].username === username) {
            if (await bcrypt.compare(password, userDB[i].hashedPassword)){
                authenticated = true;
                break;
            }
        }
    }
    if(authenticated === true) {
        req.session.user = username;
        res.redirect('/private');
    } else {
        res.status(401);
        res.render('page/form', { errorMessage: "Please provide a valid username and/or password!" });
    }
    */

});


module.exports = router;
