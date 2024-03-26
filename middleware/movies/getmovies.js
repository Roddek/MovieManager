/**
 * Lekéri a felhasználó összes adatbázisban lévő filmjét, majd next()-et hív
 */
module.exports = (objectrepo) => {
    return (req, res, next) => {
        const MovieModel = objectrepo.MovieModel;
        return req.session.save((err) => {
            MovieModel.find({
                _user: req.session.user_id
            }, (err, movies) => {
                if(err){
                    return next(err);
                }
                res.locals.movies = movies;
                return next();
            })
        })
    }
}