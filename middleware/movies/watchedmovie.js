/**
 *  Megjelöli az adott filmet, mint megnézett film az adatbázisban
 *      + A nextRelease értékét átállítja false-ra
 *      + Újraértékeli a többi film nextRelease értékeit
 *      + next()
 */
module.exports = (objectrepo) => {
    const MovieModel = objectrepo.MovieModel;
    return (req, res, next) => {
        const selectedMovie = res.locals.movie;
        selectedMovie.watched = true;
        selectedMovie.nextRelease = false;

        selectedMovie.save(err => {
            if(err){
                return next(err);
            }
        })

        MovieModel.find({
            _user: req.session.user_id,
            nextRelease: false,
            watched: false
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
                    }else if(remainingTime === minRemaining){
                        idxs[j] = i;
                        j++;
                    }
                }

                    if (idxs.length === 0) {
                        movies[0].nextRelease = true;
                        movies[0].save(err => {
                            if (err) {
                                return next(err);
                            }
                        })
                }
                for (let i = 0; i < idxs.length; i++) {
                    movies[idxs[i]].nextRelease = true;
                    movies[idxs[i]].save(err => {
                        if (err) {
                            return next(err);
                        }
                    })
                }
            }
            return next();
        })

    }
}