/**
 * Megnézi, érkezett-e post adat
 *      Ha nem -> next()
 *      Ha igen, de már van ilyen felhasználónév -> hiba kijelzés
 *      Ha igen, és még nincs ilyen felhasználónév -> redirect /-re
 */

module.exports = (objectrepo) => {
    return (req, res, next) => {
        console.log("reg siker");
        return next();
    }
}