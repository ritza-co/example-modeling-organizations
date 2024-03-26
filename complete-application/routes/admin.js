const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const checkGrantPermissions = require('../permissions');

const adminData = require('../data/admin.json');

router.get('/', checkGrantPermissions(['Admin']), function (req, res, next) {

    const companyName = req.session.selectedGrant.entity.name;
    

    res.render('admin', {
        title: companyName + ' - Admin',
        user: req.user.user,
        company: req.session.selectedGrant.entity.name,
        logoutURL: req.logoutURL,
        selectedGrant: req.session.selectedGrant, 
        data: adminData[companyName]
    });
});


router.post('/', checkGrantPermissions(['Admin']), async function (req, res, next) {
    const companyName = req.session.selectedGrant.entity.name;
    // update the data for the company:
    adminData[companyName] = req.body;
    // save the data to the file:
    await fs.writeFile('data/admin.json', JSON.stringify(adminData, null, 2));
    res.redirect('/admin');
});



module.exports = router;