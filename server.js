//Initializations
var express = require("express")
//npm install body-parser --save
var bodyParser = require("body-parser")
var session = require('express-session')
// npm install js-sha256 --save
var sha256 = require('js-sha256')
// npm install csprng --save
var rand = require('csprng')
var app = express()
var cookieSecret = process.env.COOKIE_SECRET || "tq2pdxrblkbgp8vt8kbdpmzdh1w8bex"	
// session management
var sessionOptions = {
  secret: cookieSecret,
  resave : true,
  saveUninitialized : false,
}
var sess
var user = "admin"
var salt = rand(160, 36)
var pass = sha256(salt + sha256("password"))

//Configurations
app.set("port",(process.env.PORT||5000))
app.use(session(sessionOptions))
app.use(express.static(__dirname + "/public"))

//Parses POST requests. The Content-type in the HTTP request header is set to application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({type:"application/x-www-form-urlencoded"}))

app.get('/', function(request,response) {
	response.sendFile(__dirname + '/public/login.html')
})

app.post('/login', function(request, response) {
	var username = request.body.username
	var password = request.body.password
	if(user === username) {
		var hashedPass = sha256(salt + password)
		if(pass == hashedPass) {
			request.session.username = username
			response.sendFile(__dirname + '/public/admin.html')
		}
		else {
			response.send("Invalid User Id or Password")
		}
	}
	else {
		response.send("Invalid User Id or Password")
	}
})

app.get("/admin", function(request, response) {
	sess = request.session
	if(typeof sess !== "undefined" && sess.username) {
		response.sendFile(__dirname + '/public/admin.html')
	}
	else {
		response.sendFile(__dirname + '/public/login.html')
	}
})

//Route handler - logout
app.get("/logout", function(request, response) {
	sess = request.session
	if(typeof sess !== "undefined" && sess.username) {
		request.session.destroy(function(err) {
			if(err) {
				console.log("Error destroying session: " + err)
				response.render("pages/errorPage", {status: 500, error: "Internal Server Error"})
			}
		})
		response.sendFile(__dirname + '/public/login.html')
	}
})

//Listening to port for requests
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})
