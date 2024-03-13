function checkGrantPermissions(allowedPermissions) {
    return function (req, res, next) {
        const selectedGrant = req.session.selectedGrant;
        const permissions = selectedGrant.permissions;
        const hasPermission = allowedPermissions.some(perm => permissions.includes(perm));
        if (!hasPermission) {
            return res.render('no-permission', { title: 'No Permission' })
        }
        next();
    }
}

module.exports = checkGrantPermissions;

