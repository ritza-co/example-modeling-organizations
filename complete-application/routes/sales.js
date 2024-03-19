var express = require('express');
var router = express.Router();
var checkGrantPermissions = require('../permissions');

const salesData = require('../data/sales.json');

router.get('/', checkGrantPermissions(['Admin', 'Sales', 'Viewer']), function (req, res, next) {

    const companyName = req.session.selectedGrant.entity.name;
    
    // you would load this from a database probably, and most likely with an ID instead of name. 
    const data = salesData[companyName];

    res.render('sales', {
        title: companyName + ' - Sales',
        data: data, 
        user: req.user.user,
        company: req.session.selectedGrant.entity.name,
        logoutURL: req.logoutURL,
        selectedGrant: req.session.selectedGrant
    });
});


router.post('/', checkGrantPermissions(['Admin', 'Sales']), function (req, res, next) {
    
    res.redirect('/sales');
});


module.exports = router;