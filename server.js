var PORT = process.env.PORT || 3000;
var db = require('./db.js')
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    console.log("at index");
});

app.get('/all', function(request, response) {

	db.menu.findAll().then(function(items){
		response.json(items);
	},function(e){
		response.status(500).send();
	});


});

app.post('/menu', function(request, response) {

    var body = _.pick(request.body, 'name', 'description', 'quantity', 'ingredients', 'category', 'cost', 'image', 'location');
    // var body = request.body;
    db.menu.create(body).then(function(menu) {
        response.json(menu.toJSON());
    }, function(e) {
        console.log(e);
    });


});

db.sequelize.sync({ force: true }).then(function() {

    app.listen(PORT, function() {

        console.log("listening at port" + PORT);

    });

});
