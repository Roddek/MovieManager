/**
 * Megsemmisíti a session-t, átirányítja a felhasználót /-re
 */

module.exports = (objectrepo) => {
    return (req, res, next) => {
        /*req.session.destroy(err => {
            if (typeof err !== 'undefined'){
                return next(err);
            }
            return res.redirect('/');
        })*/
        console.log("logout siker");
        return next();
    }
}