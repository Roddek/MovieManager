const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Movie = db.model('Movie', {
    title: String,
    genre: String,
    director: String,
    cast: String,
    release_date: Date,
    img_filename: String,
    watched: Boolean,
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Movie;