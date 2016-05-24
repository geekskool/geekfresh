var PORT = process.env.PORT || 3000;
var db = require('./db.js')
var express = require('express');

var app = express();

db.sequelize.sync().then(function() {

    app.listen(PORT, function() {

        console.log("listening at port" + PORT);
        
    });

});
