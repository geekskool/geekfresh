require('./password.js')();

var PORT = process.env.PORT || 3000;
var jsonf = require('./config.json');
var formidable = require('formidable');


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
var app = express();

app.use(session(sessionOptions));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ type: "application/x-www-form-urlencoded" }));

app.get('/', function(request, response) {
    console.log("at index");
});

app.post('/login', function(request, response) {
    var username = request.body.username
    var password = request.body.password
    if (user === username) {
        var hashedPass = password;
        if (jsonf.password == hashedPass) {
            request.session.username = username
            response.redirect('/admin')
        } else {
            response.send("Invalid User Id or Password")
        }
    } else {
        response.send("Invalid User Id or Password")
    }
})

app.get('/admin/login', function(request, response) {
    response.sendFile(__dirname + '/public/admin/login.html')
})

app.get('/login', function(request, response) {
    response.sendFile(__dirname + '/public/admin/login.html')
})

app.get("/admin", function(request, response) {
    sess = request.session
    if (typeof sess !== "undefined" && sess.username) {

        response.sendFile(__dirname + '/public/admin/admin.html')
    } else {
        response.redirect('/admin/login')

    }
})
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
        response.redirect('/login')
    }
})

app.get('/all', function(request, response) {
    db.menu.findAll().then(function(items) {
        response.json(items);
    }, function(e) {
        response.status(500).send();
    });
});


app.get('/allNames', function(request, response) {
    db.menu.findAll().then(function(items) {
        var arr = []
        for (var i in items) {
            arr.push((items[i].name))
        }
        response.send(arr)
    }, function(e) {
        response.status(404).send()
    })
})

app.post('/delete', function(request, response) {
    var selectedMenu = request.body.deleteMenu
    db.menu.destroy({
        where: {
            name: selectedMenu
        }
    }).then(function() {
        response.redirect('/admin')
    })
})


app.post('/checkout', function(request, response) {
    db.checkout.create(request.body).then(function(checkout) {
        response.json(checkout.toJSON());
    }, function(e) {
        console.log(e);
    });
});

app.delete('/del/:id', function(request, response) {
    var deleteId = parseInt(request.params.id, 10);
    db.checkout.destroy({
        where: {
            id: deleteId
        }
    }).then(function(rowDeleted) {
        if (rowDeleted == 0) {
            response.status(404).json({
                error: "no item with that id"
            });
        } else {
            response.status(204).send();
        }
    }, function() {
        response.status.send(500).send();
    });
});

app.post('/admin', function(request, response) {
    var form = new formidable.IncomingForm();
    form.parse(request, function(err, fields, files) {
        var name = fields.foodName;
        var description = fields.foodDesc;
        var quantity = fields.quantity;
        var ingredients = fields.ingredients;
        var category = fields.category;
        var cost = fields.cost;
        var image = files.image.name;
        var location = fields.location;
        var body = {
            "name": name,
            "description": description,
            "quantity": quantity,
            "ingredients": ingredients,
            "category": category,
            "cost": cost,
            "image": image,
            "location": location
        }
        db.menu.create(body).then(function(menu) {
            response.sendFile(__dirname + '/public/admin/admin.html')
        }, function(e) {
            console.log(e)
        })
    });
    form.on('fileBegin', function(name, file) {
        file.path = __dirname + '/public/images/' + file.name;
    });
    form.on('file', function(name, file) {
        console.log('Uploaded ' + file.name);
    });
    response.sendFile(__dirname + '/public/admin/admin.html');
});


app.post('/updatemenu', function(request, response) {

    // var fid = parseInt(request.params.id, 10);
    var fid = request.body.foodId;
    var name = request.body.foodName;
    var description = request.body.foodDesc;
    var quantity = request.body.quantity;
    var ingredients = request.body.ingredients;
    var category = request.body.category;
    var cost = request.body.cost;
    var image = request.body.image;
    var location = request.body.location;
    var body = {
        "name": name,
        "description": description,
        "quantity": quantity,
        "ingredients": ingredients,
        "category": category,
        "cost": cost,
        "image": image,
        "location": location
    }

    db.menu.findById(fid).then(function(menu) {
        menu.update(body).then(function(menu) {
            response.redirect('/admin');
        });

    });


}); //end put

app.get('/:id', function(request, response) {
    var id1 = parseInt(request.query.id, 10);
    db.menu.findById(id1).then(function(items) {
        response.send(items);
        var temp = items.image;
        response.sendFile(__dirname + "/public/images/" + items.image);
    }, function(e) {
        response.status(404).send();
    });
});

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("Listening at port " + PORT);
    });
});
