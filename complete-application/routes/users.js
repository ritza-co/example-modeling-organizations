const express = require('express');
const router = express.Router();
const checkGrantPermissions = require('../permissions');
const querystring = require('querystring');
const e = require('express');

const FUSIONAUTH_URL = process.env.FUSIONAUTH_URL;
const FUSIONAUTH_APP_CLIENTID = process.env.FUSIONAUTH_APP_CLIENTID;
const FUSIONAUTH_APP_CLIENT_SECRET = process.env.FUSIONAUTH_APP_CLIENT_SECRET;
const FUSIONAUTH_API_KEY = process.env.FUSIONAUTH_API_KEY;

/* GET users listing. */
//?applicationId=${FUSIONAUTH_APP_CLIENTID}
router.get('/', checkGrantPermissions(['Admin']), async function (req, res, next) {

  var queryString = querystring.stringify({ queryString: '{"bool":{"must":[{"nested":{"path":"registrations","query":{"bool":{"must":[{"match":{"registrations.applicationId":"e9fdb985-9173-4e01-9d73-ac2d60d1dc8e"}}]}}}}]}}' });
  queryString = 'queryString=*';

  const request = await fetch(`${FUSIONAUTH_URL}/api/user/search?${queryString}`, {
    headers: {
      'Method': 'GET',
      'Authorization': FUSIONAUTH_API_KEY,
    }
  });

  const results = await request.json();

  // Get the grants for each user:
  const allPermissions = req.session.selectedGrant.entity.type.permissions
  for (let i = 0; i < results.users.length; i++) {
    const user = results.users[i];
    const grantsResponse = await fetch(`${FUSIONAUTH_URL}/api/entity/grant/search?userId=${user.id}`, {
      headers: {
        'Authorization': FUSIONAUTH_API_KEY
      }
    });
    const grants = await grantsResponse.json();
    // Only include the grants for the selected entity (company)

    userGrants = grants.grants.find(grant => grant.entity.id === req.session.selectedGrant.entity.id);
    // make a list of all permissions, and mark the ones the user has:
    user.permissions = allPermissions.map(perm => {
      return {
        permission: perm,
        hasPermission: userGrants ? userGrants.permissions.includes(perm.name) : false
      }
    });
  }


  res.render('users', {
    title: 'Users',
    data: results.users,
    user: req.user.user,
    logoutURL: req.logoutURL,
    selectedGrant: req.session.selectedGrant,
    allPermissions: req.session.selectedGrant.entity.type.permissions,
    company: req.session.selectedGrant.entity.name
  });

});


router.post('/', checkGrantPermissions(['Admin']), async function (req, res, next) {
  console.log(JSON.stringify(req.body));
  res.redirect('/users');
});

module.exports = router;
