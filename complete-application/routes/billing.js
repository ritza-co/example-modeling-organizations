var express = require('express');
var router = express.Router();
var checkGrantPermissions = require('../permissions');

const billingData = require('../data/billing.json');

router.get('/', checkGrantPermissions(['Admin', 'Billing', 'Viewer']), function (req, res, next) {

    const companyName = req.session.selectedGrant.entity.name;
    
    // you would load this from a database probably, and most likely with an ID instead of name. 
    const data = billingData[companyName];

    res.render('billing', {
        title: companyName + ' - Billing',
        data: data, 
        user: req.user.user,
        company: req.session.selectedGrant.entity.name,
        logoutURL: req.logoutURL,
        selectedGrant: req.session.selectedGrant
    });
});


router.post('/', checkGrantPermissions(['Admin', 'Billing']), function (req, res, next) {
    res.send('respond with a resource');
});


module.exports = router;