/**
 * TODO Studio 3T-ben a legvégén eldobni az adatbázist! -> jobb klikk, dropp database
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ux7cni');

module.exports = mongoose;