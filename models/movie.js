const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Movie = db.model('Movie', {
    title: String,
    genre: String,
    director: String,
    actors: String,
    release_date: String,
    img_filename: String,
    watched: Boolean,
    nextRelease: Boolean,
    _user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = Movie;