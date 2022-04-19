/**
 * Megnézi, érkezett-e post adat:
 *      ha igen, és van ilyen felhasználónév -> kiírja az új jelszót
 *      ha nem -> hiba kijelzés
 */

module.exports = (objectrepo) => {
    return (req, res, next) => {
        console.log("forgotpw siker");
        return next();
    }
}