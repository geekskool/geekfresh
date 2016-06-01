require('./password.js')();

var PORT = process.env.PORT || 3000;
var jsonf = require('./config.json');



var db = require('./db.js')
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var sha256 = require('js-sha256');
var rand = require('csprng');
var cookieSecret = process.env.COOKIE_SECRET || "tq2pdxrblkbgp8vt8kbdpmzdh1w8bex"
// session management
var sessionOptions = {
    secret: cookieSecret,
    resave: true,
    saveUninitialized: false,
}
var sess;
var user = "admin";
var salt = "secret";
//var pass = sha256(salt + sha256("password"));
var app = express();

app.use(session(sessionOptions));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ type: "application/x-www-form-urlencoded" }));

app.get('/', function(request, response) {
    console.log("at index");
});
// /admin/login --->post
app.post('/login', function(request, response) {
    var username = request.body.username
    var password = request.body.password
    if (user === username) {
        var hashedPass = password;
        if (jsonf.password == hashedPass) {
            request.session.username = username
            response.sendFile(__dirname + '/public/admin.html')
        } else {
            response.send("Invalid User Id or Password")
        }
    } else {
        response.send("Invalid User Id or Password")
    }
});

app.get("/admin", function(request, response) {
    sess = request.session
    if (typeof sess !== "undefined" && sess.username) {
        response.sendFile(__dirname + '/public/admin.html')   // Add view here:
    } else {                                                        
        response.sendFile(__dirname + '/public/login.html')  // get(/admin/login) -->login .html
    }
});

app.get("/user", function(request, response) {
    sess = request.session
    response.send(sess.username)
})

app.get("/logout", function(request, response) {
    sess = request.session
    if (typeof sess !== "undefined" && sess.username) {
        request.session.destroy(function(err) {
            if (err) {
                console.log("Error destroying session: " + err)
                response.render("pages/errorPage", { status: 500, error: "Internal Server Error" })
            }
        })
        response.sendFile(__dirname + '/public/login.html')
    }
});

app.get('/all', function(request, response) {
    db.menu.findAll().then(function(items) {
        response.json(items);
    }, function(e) {
        response.status(500).send();
    });
});

app.post('/checkout', function(request, response) {
    db.checkout.create(request.body).then(function(checkout) {
        response.json(checkout.toJSON());
    }, function(e) {
        console.log(e);
    });
});

app.post('/admin', function(request, response) {
    var name = request.body.foodName;
    var description = request.body.foodDesc;
    var quantity = request.body.quantity;
    var ingredients = request.body.ingredients;
    var category = request.body.category;
    var cost = request.body.cost;
    var image = request.body.image;
    var location = request.body.location;
    var body = {
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
        response.sendFile(__dirname+'/public/admin.html');
    }, function(e) {
        console.log(e);
    });    
});

app.get('/:id', function(request, response) {
    var id1 = parseInt(request.query.id, 10);
    db.menu.findById(id1).then(function(items) {
        // var temp = items.name;
        response.send(items);
    }, function(e) {
        response.status(404).send();
    });
});

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("listening at port" + PORT);
    });
});
