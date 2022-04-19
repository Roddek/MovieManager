/**
 * Megnézi, érkezett-e post adat
 *      Ha igen -> adatbázisba ment + átirányítás: /movies
 *      Ha nem -> átirányítás: /movies/new
 */

module.exports = (objectrepo) => {
    return (req, res, next) => {
        console.log("save siker");
        return next();
    }
}