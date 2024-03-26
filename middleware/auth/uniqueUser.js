/**
 * ellenőrzi, egyedi-e a felhasználónév
 *      Ha nem, hibát dob
 *      Ha igen -> next()
 */
module.exports = (objectrepo) =>{
    const UserModel = objectrepo.UserModel;
    return (req, res, next) => {
        if(typeof req.body.username ==='undefined'){
            return next();
        }

        return UserModel.findOne({
            username: req.body.username
        }, (err, user) => {
            if (err) {
                return next(err);
            }
            if (user !== null){
                res.locals.error = 'User already exists';
            }
            return next();
        })
    }
}