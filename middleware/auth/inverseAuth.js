/**
 * Ellenőrzi, hogy a felhasználó be van-e lépve
 *      ha igen -> átirányít /movies-ra
 *      ha nem -> next()
 */

module.exports = (objectrepo) => {
    return (res, req, next) => {
        /*if (typeof req.session.userid === 'undefined') {
            return next();
        }*/
        //return res.redirect('/movies');
        console.log("inverseAuth siker");
        return next();
    }
}