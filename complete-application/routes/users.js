var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/company', function(req, res, next) {
  const grantId = req.body.grantId;
  // find the corresponding grant: 
  let selectedGrant = req.user.grants.find(grant=> grant.id === grantId)
  req.session.selectedGrant = selectedGrant; 
  console.log(`Selected company: ${grantId} - ${selectedGrant.entity.name}`);
  return res.redirect('/');
});

module.exports = router;
