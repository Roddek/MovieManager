/**
 * Az movieid és a userid alapján lekéri az adatbázisból az adott filmet, ha nem talál ilyet -> átirányít /movies-ra
 */
module.exports = (objectrepo) => {
    const MovieModel = objectrepo.MovieModel;

    return (req, res, next) => {
        return MovieModel.findOne({
            _id: req.params.movieid,
            _user: req.session.user_id
        }, (err, movie) =>{
            if(err){
                return next(err);
            }
            if (movie === null){
                return res.redirect('/movies');
            }
            res.locals.movie = movie;
            return next();
        })
    };
};