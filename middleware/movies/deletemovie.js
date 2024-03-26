/**
 *  Eltávolítja az adott filmet (res.locals.movie) az adatbázisból + beállítja az új legközelebb megjelenő filmeket
 *  Átirányít: /movies
 */
module.exports = (objectrepo) => {
    const MovieModel = objectrepo.MovieModel;
    return (req, res, next) => {
        if (typeof res.locals.movie === 'undefined'){
            return next();
        }

        return res.locals.movie.remove(err => {
            if(err) {
                return next(err);
            }
            MovieModel.find({
                _user: req.session.user_id
            }, (err2, movies) => {
                if (err2) {
                    return next(err2);
                }

                if (movies.length === 1){
                    movies[0].nextRelease = true;
                }
                if (movies.length > 0){
                    const now = new Date();
                    const today = now.getFullYear() + '' + now.getMonth() + '' + now.getDate();
                    let remainingTime;
                    let minRemaining = movies[0].release_date.replace('. ', '').replace('. ', '').replace('.', '') - today;
                    let idxs = [];
                    let j = 0;

                    for(let i = 1; i < movies.length; i++){
                        remainingTime = movies[i].release_date.replace('. ', '').replace('. ', '').replace('.', '') - today;
                        if(remainingTime < minRemaining) {
                            j = 0;
                            minRemaining = remainingTime;
                            idxs[j] = i;
                            j++;
                        }
                        if(remainingTime === minRemaining){
                            idxs[j] = i;
                            j++;
                        }
                    }
                    if(idxs.length === 0) {
                        movies[0].nextRelease = true;
                        movies[0].save(err => {
                            if (err) {
                                return next(err);
                            }
                        })
                    }

                    for(let i = 0; i < idxs.length; i++){
                        movies[idxs[i]].nextRelease = true;
                        movies[idxs[i]].save(err => {
                            if (err) {
                                return next(err);
                            }
                        })
                    }
                }
            })
            return res.redirect('/movies');
        })
    }
}