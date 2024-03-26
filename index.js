const db = require('./config/db');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const {request} = require('express');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('trust proxy', 1)
app.use(session({
    secret: 'H5YIGoDGS6ddXe02jfd1KgnO',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use('/public', express.static('public'));
app.use('/moviestore/', express.static('uploads'));

require('./routes/index')(app);


app.listen(3000, function () {
    console.log("On: 3000");
});