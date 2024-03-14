var express = require('express');
var router = express.Router();
var checkGrantPermissions = require('../permissions');


router.get('/', checkGrantPermissions(['Admin']), function (req, res, next) {

    const companyName = req.session.selectedGrant.entity.name;
    

    res.render('admin', {
        title: companyName + ' - Admin',
        user: req.user.user,
        company: req.session.selectedGrant.entity.name,
        logoutURL: req.logoutURL,
        selectedGrant: req.session.selectedGrant
    });
});


router.post('/', checkGrantPermissions(['Admin']), function (req, res, next) {
    res.send('respond with a resource');
});



module.exports = router;