function checkGrantPermissions(allowedPermissions) {
    return function (req, res, next) {
        const selectedGrant = req.session.selectedGrant;
        const permissions = selectedGrant.permissions;
        const hasPermission = allowedPermissions.some(perm => permissions.includes(perm));
        if (!hasPermission) {
            return res.render('no-permission', {
                title: 'No Permission',
                company: req.session.selectedGrant.entity.name,
                user: req.user.user,
                logoutURL: req.logoutURL,
                selectedGrant: req.session.selectedGrant
            });
        }
        next();
    }
}

module.exports = checkGrantPermissions;

