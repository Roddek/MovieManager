/**
 *  Eltávolítja az adott filmet (res.locals.movie) az adatbázisból
 *  Átirányít: /movies
 */

module.exports = (objectrepo) => {
    return (req, res, next) => {
        console.log("del siker");
        return next();
    }
}