const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'))
app.use('/moviestore/', express.static('uploads'));

require('./routes/index')(app);

const server = app.listen(3000, function () {
    console.log("On: 3000");
});