/**
 * Ellenőrzi, hogy a felhasználó be van-e lépve
 *      ha igen -> átirányít /movies-ra
 *      ha nem -> next()
 */

module.exports = (objectrepo) => {
    return (req, res, next) => {
        if (typeof req.session.user_id !== 'undefined') {
            return res.redirect('/movies');
        }
        return next();
    }
}