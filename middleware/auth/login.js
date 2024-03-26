/**
 * Ha nem érkezett post adat -> next()
 * Belépteti a felhasználót, ellenőrzi jó-e a jelszó és létezik-e a felhasználónév:
 *      ha igen -> átirányít /movies-ra + session-be eltárol
 *      ha nem -> hiba kijelzés
 */

module.exports = (objectrepo) => {
    const UserModel = objectrepo.UserModel;
    return (req, res, next) => {
        if ((typeof req.body.username === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        return UserModel.findOne({
            username: req.body.username
        }, (err, user) => {
            if (err) {
                return next(err);
            }
            if(user === null){
                res.locals.error = 'User does not exist';
                return next();
            }
            if(req.body.password !== user.password){
                res.locals.error = 'Wrong password';
                return next();
            }
            req.session.user_id = user._id;
            return req.session.save(err => {
                if (err){
                    return next(err);
                }
                return res.redirect('/movies');
            });
        });
    }
}