/**
 * Megnézi, érkezett-e post adat:
 *      ha igen, és van ilyen felhasználónév -> kiírja az új jelszót, és elmenti az adatbázisba
 *      ha nem -> hiba kijelzés
 */
module.exports = (objectrepo) => {
    const UserModel = objectrepo.UserModel;
    return (req, res, next) => {
        UserModel.findOne( {
            username: req.body.username
        }, (err, user) => {
            if(err){
                return next(err);
            }
            if(user === null){
                res.locals.error = 'User does not exist';
                return next();
            }
            user.password = `${Math.random()}`.substring(2);
            return user.save(err2 => {
                if(err2){
                    return next(err2);
                }
                console.log('New password: ' + user.password);
                return next();
            })
        })
    }
}