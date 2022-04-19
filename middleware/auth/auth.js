/**
 * Ellenőrzi, hogy a felhasználó be van-e lépve
 *      ha igen -> next()
 *      ha nem -> átirányít / -re
 */

module.exports = (objectrepo) => {
    return (req, res, next) => {
        /*if (typeof req.session.userid === 'undefined') {
            return res.redirect('/');
        }*/
        console.log("auth siker");
        return next();
    }
}