/**
 * Az movieid és a userid alapján lekéri az adatbázisból az adott filmet, ha nem talál ilyet -> átirányít /movies-ra
 */

module.exports = (objectrepo) => {
    return (req, res, next) => {
        console.log("getMovie siker");
        return next();
    };
};