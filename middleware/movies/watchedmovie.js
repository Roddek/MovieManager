/**
 *  Megjelöli az adott filmet, mint megnézett film az adatbázisban
 *  Átirányít: /movies
 */

module.exports = (objectrepo) => {
    return (req, res, next) => {
        console.log("watched siker");
        return next();
    }
}