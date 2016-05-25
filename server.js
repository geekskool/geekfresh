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

app.get('/admin',function(request,response){

    response.sendFile(__dirname+'/public/admin.html');


});

app.post('/admin', function(request, response) {
    
    
    // var body = _.pick(request.body, 'name', 'description', 'quantity', 'ingredients', 'category', 'cost', 'image', 'location');
    // var body = request.body;

var name = request.body.name;
var description = request.body.description;
var quantity = request.body.quantity;
var ingredients = request.body.ingredients;
var category = request.body.category;
var cost = request.body.cost;
var image = request.body.image;
var location = request.body.location;

var body ={
"name":name,
"description":description,
"quantity":quantity,
"ingredients":ingredients,
"category":category,
"cost":cost,
"image":image,
"location":location

}
    db.menu.create(body).then(function(menu) {
        response.json(menu.toJSON());
       // response.send("name"+body.name);
    }, function(e) {
        console.log(e);
    });


});

db.sequelize.sync({ force: true }).then(function() {

    app.listen(PORT, function() {

        console.log("listening at port" + PORT);

    });

});
