/**
 * Ellenőrzi, hogy a felhasználó be van-e lépve
 *      ha igen -> next()
 *      ha nem -> átirányít / -re
 */
module.exports = (objectrepo) => {
    return (req, res, next) => {
        if (typeof req.session.user_id === 'undefined') {
            return res.redirect('/');
        }
        return next();
    }
}