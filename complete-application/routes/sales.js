const express = require('express');
const router = express.Router();
const checkGrantPermissions = require('../permissions');
const fs = require('fs');

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
    // Get the data from the request body, and add the new row to the data file
    const companyName = req.session.selectedGrant.entity.name;
    req.body.total = req.body.price * req.body.quantity;
    salesData[companyName].push(req.body);
    // Save the data to the file
    fs.writeFileSync('data/sales.json', JSON.stringify(salesData, null, 2));
    res.redirect('/sales');
});


module.exports = router;