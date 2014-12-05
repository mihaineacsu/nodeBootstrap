var express = require('express'),
    routes = require('./routes/index');

var app = express();
app.use('/', routes);

app.listen(8000);
