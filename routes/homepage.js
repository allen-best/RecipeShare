const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    //check login status
    let user = req.session.user;
    let toolbar;
    if (!user) {
        toolbar = `<h2>Hi! <a href='/login'>Sign in</a> or <a href='/register'>register</a></h2>`;
    } else {
        toolbar = `<h2>Hi, ${user.username} ! &emsp; <a href='/logout'>Sign out</a></h2>`;
    }
    res.render('page/homepage', { scriptFile: '<script src="/public/js/homepage.js"></script>', toolBar: toolbar });
});



module.exports = router;