/**
 * Megnézi, érkezett-e post adat
 *      Ha igen -> adatbázisba ment + next()
 *                  + beállítja megfelelően a nextRelease értékeket (db-ben lévőkét is felülírja, ha kell)
 *      Ha nem -> next()
 */
module.exports = (objectrepo) => {
    const MovieModel = objectrepo.MovieModel;
    return (req, res, next) => {
        if ((typeof req.body.title === 'undefined') ||
            (typeof req.body.release_date === 'undefined')) {
            return next();
        }

        let newMovie;
        MovieModel.find({
            _user: req.session.user_id
        }, (err, movies) => {
            newMovie = res.locals.movie ? res.locals.movie : new MovieModel();
            newMovie._user = req.session.user_id;
            newMovie.title = req.body.title;
            newMovie.genre = req.body.genre;
            newMovie.director = req.body.director;
            newMovie.actors = req.body.actors;
            newMovie.release_date =  req.body.release_date;
            if(req.file){
                newMovie.img_filename = req.file.filename;
            }
            newMovie.watched = false;
            newMovie.nextRelease = false;

            const now = new Date();
            const today = now.getFullYear() + '' + now.getMonth() + '' + now.getDate();
            const newRemaining = newMovie.release_date.replace('. ', '').replace('. ', '').replace('.', '') - today;
            let previousRemaining;

            if(req.body.title === ''){
                res.locals.error = 'Please enter a title!';
                return next();
            }
            if(req.body.release_date === ''){
                res.locals.error = 'Please enter the release date!';
                return next();
            }
            if (err) {
                return next(err);
            }
            if(isNaN(newRemaining)){
                res.locals.error = 'Wrong release date format! Please enter correctly!';
                return next();
            }

            if (movies.length === 0){
                newMovie.nextRelease = true;
                return newMovie.save(err => {
                    if (err) {
                        return next(err);
                    }
                    return next();
                })
            } else {
                MovieModel.find({
                    _user: req.session.user_id,
                    nextRelease: true
                }, (err2, nextMovies) => {
                    if (err2) {
                        return next(err);
                    }

                    // TODO: FIX THIS SHIT
                    if(nextMovies.length !== 0) {
                        previousRemaining = nextMovies[0].release_date.replace('. ', '').replace('. ', '').replace('.', '') - today;

                        if (newRemaining < previousRemaining) {
                            newMovie.nextRelease = true;
                            for (let i = 0; i < nextMovies.length; i++) {
                                nextMovies[i].nextRelease = false;
                                nextMovies[i].save(err => {
                                    if (err) {
                                        return next(err);
                                    }
                                })
                            }
                        } else if (newRemaining === previousRemaining) {
                            newMovie.nextRelease = true;
                        }
                    } else {
                        newMovie.nextRelease = true;
                    }

                    return newMovie.save(err => {
                        if (err) {
                            return next(err);
                        }
                        return next();
                    })

                })
                res.locals.movies = movies;
            }
            return next();
        })
    }
}