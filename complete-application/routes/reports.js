var express = require('express');
var router = express.Router();
var checkGrantPermissions = require('../permissions');

const reportData = require('../data/reports.json');

router.get('/', checkGrantPermissions(['Admin', 'Reports', 'Viewer']), function (req, res, next) {

    const companyName = req.session.selectedGrant.entity.name;
    
    // you would load this from a database probably, and most likely with an ID instead of name. 
    const data = reportData[companyName];

    res.render('reports', {
        title: companyName + ' - Reports',
        data: data, 
        user: req.user.user,
        company: companyName
    });
});


router.post('/', checkGrantPermissions(['Admin', 'Reports']), function (req, res, next) {
    res.send('respond with a resource');
});


module.exports = router;