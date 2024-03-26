/**
 * Megnézi, érkezett-e post adat
 *      Ha nem -> next()
 *      Ha igen, de már van ilyen felhasználónév -> hiba kijelzés
 *      Ha igen, és még nincs ilyen felhasználónév -> elmenti az új felhasznáót + átirányít /-re
 */
module.exports = (objectrepo) => {
    const UserModel = objectrepo.UserModel;
    return (req, res, next) => {
        if ((typeof req.body.username === 'undefined') ||
            (typeof req.body.password === 'undefined') ||
            (typeof res.locals.error !== 'undefined')){
            return next();
        }

        const newUser = new UserModel();
        newUser.username = req.body.username;
        newUser.password = req.body.password;

        if(req.body.username === ''){
            res.locals.error = 'Please enter an username!';
            return next();
        }
        if(req.body.password === ''){
            res.locals.error = 'Please enter a password!';
            return next();
        }

        return newUser.save(err => {
            if(err){
                return next(err);
            }
            return next();
        })
    }
}