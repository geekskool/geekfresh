var PORT = process.env.PORT || 3000;
var db = require('./db.js')
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
app.use(express.static(__dirname +'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('view engine', 'ejs')

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





    db.menu.create(body).then(function(menu) {
        response.json(menu.toJSON());
       // response.send("name"+body.name);
    }, function(e) {
        console.log(e);
    });


});


app.get('/:id', function(request, response) {
    var id1=  parseInt(request.params.id,10);
    db.menu.findById(id1).then(function(items) {
        // var temp = JSON.stringify(items);
        // alert(items);
        var temp = items.image;
        response.sendFile(__dirname + items.image);
    }, function(e){
        response.status(500).send();
    });
});


db.sequelize.sync({ force: false }).then(function() {

    app.listen(PORT, function() {

        console.log("listening at port" + PORT);

    });

});
