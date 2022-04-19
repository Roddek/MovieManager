/**
 * Ha nem érkezett post adat -> next()
 * Belépteti a felhasználót, ellenőrzi jó-e a jelszó:
 *      ha igen -> átirányít /movies-ra + session-be eltárol
 *      ha nem -> hiba kijelzés
 */

module.exports = (objectrepo) => {
    return (req, res, next) => {
        //return next();
        console.log("login siker");
        //return res.redirect('/movies');
        return next();
    }
}