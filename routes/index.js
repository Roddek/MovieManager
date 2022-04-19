const authMW = require('../middleware/auth/auth');
const inverseAuthMW = require('../middleware/auth/inverseAuth');
const loginMW = require('../middleware/auth/login');
const regMW = require('../middleware/auth/reg');
const forgotPwMW = require('../middleware/auth/forgotPw');
const logoutMW = require('../middleware/auth/logout');

const getMoviesMW = require('../middleware/movies/getMovies');
const getMovieMW = require('../middleware/movies/getMovie');
const saveMovieMW = require('../middleware/movies/saveMovie');
const deleteMovieMW = require('../middleware/movies/deleteMovie');
const watchedMovieMW = require('../middleware/movies/watchedMovie');

const renderMW = require('../middleware/render');

module.exports = function addRoutes(app){
    const objRepo = {};

    /**
     * new movie
     */
    app.get('/movies/new',
        authMW(objRepo),
        renderMW(objRepo, 'new')
    );
    app.post('/movies/new',
        authMW(objRepo),
        saveMovieMW(objRepo)
    );

    /**
     * get movie
     */
    app.get(
        '/movies/get/:movieid',
        authMW(objRepo),
        getMovieMW(objRepo)
    );

    /**
     * update movie
     */
    app.get(
        '/movies/edit/:movieid',
        authMW(objRepo),
        getMovieMW(objRepo),
        renderMW(objRepo, 'update')
    );
    app.post(
        '/movies/edit/:movieid',
        authMW(objRepo),
        getMovieMW(objRepo),
        saveMovieMW(objRepo)
    );

    /**
     * delete movie
     */
    app.get(
        '/movies/del/:movieid',
        authMW(objRepo),
        getMovieMW(objRepo),
        deleteMovieMW(objRepo)
    );

    /**
     * watched movie
     */
    app.get('/movies/watched/:movieid',
        authMW(objRepo),
        getMovieMW(objRepo),
        watchedMovieMW(objRepo)
    );

    /**
     * main page, show movies
     */
    app.get('/movies',
        authMW(objRepo),
        getMoviesMW(objRepo),
        renderMW(objRepo, 'main')
    );

    /**
     * logout
     */
    app.get('/logout',
        authMW(objRepo),
        logoutMW(objRepo),
        renderMW(objRepo, 'login')
    );

    /**
     * registration
     */
    app.use('/registration',
        inverseAuthMW(objRepo),
        regMW(objRepo),
        renderMW(objRepo, 'registration')
    );

    /**
     * forgot password
     */
    app.use('/forgotpw',
        inverseAuthMW(objRepo),
        forgotPwMW(objRepo),
        renderMW(objRepo, 'forgotpw')
    );

    /**
     * login
     */
    app.use('/',
        inverseAuthMW(objRepo),
        loginMW(objRepo),
        renderMW(objRepo, 'login')
    );
}