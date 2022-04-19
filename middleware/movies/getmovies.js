/**
 * Lekéri adatbázisból a gelhasználó egy filmjét az url-ben érkező id alapján, eltárolja res.locals.movie-ba, majd next()-et hív
 * Ha nem talál ilyen movie-t, átirányít /movies-ra
 */

module.exports = (objectrepo) => {
    return (req, res, next) => {
        res.locals.movies =
        [
            {
                _id: 'elsofilm',
                user_id: 'elsouser',
                title: 'flash',
                genre: 'akcio',
                director: 'Spielberg',
                casting: 'Robert, Anna',
                date: '2023-03-02',
                image: 'flash.jpg'
            },
            {
                _id: 'masodikfilm',
                user_id: 'elsouser',
                title: 'avatar',
                genre: 'kaland',
                director: 'Spielberg',
                casting: 'Emma, Dwane',
                date: '2023-05-12',
                image: 'avatar.jpg'
            }
        ]
        console.log("getAllMovies siker");
        return next();
    }
}