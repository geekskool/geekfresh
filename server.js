var PORT = process.env.PORT || 3000;
var db = require('./db.js')
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.send("GeekFresh.com");
});

app.post('/menu', function(request, response) {

    var body = _.pick(request.body,'name','description','quantity','ingredients','category','cost','image','location');
   // var body = request.body;
    db.menu.create(body).then(function(menu){
    	response.json(menu.toJSON());
    },function(e){
    	console.log(e);
    });


});

db.sequelize.sync({ force: true }).then(function() {

    app.listen(PORT, function() {

        console.log("listening at port" + PORT);

    });

});
