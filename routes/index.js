const authMW = require('../middleware/auth/auth');
const inverseAuthMW = require('../middleware/auth/inverseAuth');
const loginMW = require('../middleware/auth/login');
const regMW = require('../middleware/auth/reg');
const uniqueUserMW = require('../middleware/auth/uniqueUser');
const forgotPwMW = require('../middleware/auth/forgotPw');
const logoutMW = require('../middleware/auth/logout');

const getMoviesMW = require('../middleware/movies/getMovies');
const getMovieMW = require('../middleware/movies/getMovie');
const saveMovieMW = require('../middleware/movies/saveMovie');
const deleteMovieMW = require('../middleware/movies/deleteMovie');
const watchedMovieMW = require('../middleware/movies/watchedMovie');

const renderMW = require('../middleware/render');
const multer  = require('multer');

const UserModel = require('../models/user');
const MovieModel = require('../models/movie');

module.exports = function addRoutes(app){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.png')
        }
    })
    const upload = multer({ dest: 'uploads/', storage })
    const objRepo = { UserModel, MovieModel };

    /**
     * new movie
     */
    app.use('/movies/new',
        authMW(objRepo),
        upload.single('movieimage'),
        saveMovieMW(objRepo),
        renderMW(objRepo, 'new')
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
        watchedMovieMW(objRepo),
        saveMovieMW(objRepo),
        getMoviesMW(objRepo)
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
        logoutMW(objRepo)
    );

    /**
     * registration
     */
    app.use('/registration',
        inverseAuthMW(objRepo),
        uniqueUserMW(objRepo),
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