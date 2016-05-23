var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
    Sequelize = require('sequelize'),
	crypto = require('crypto');
	google = require('googleapis'),
	OAuth2Client = google.auth.OAuth2,
	plus = google.plus('v1'),
	readline = require('readline');
	app = express();

var secreteData = JSON.parse(fs.readFileSync(path.join(__dirname, 'secrete/secrete.json'), 'utf-8'));
var CLIENT_ID = secreteData.CLIENT_ID;
var CLIENT_SECRET = secreteData.CLIENT_SECRET;
var REDIRECT_URL = secreteData.REDIRECT_URL;

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
	secret : '!@#asdf!@#gre',
	resave : true,
	saveUninitialized : false
}));

var sequelize = new Sequelize('calendar', 'root', '1111', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
    }, function (err) {
    console.log('Unable to connect to the database:', err);
});

var User = sequelize.define('user', {
    userid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    useremail: {
		type: Sequelize.STRING
	}
});

var Todo = sequelize.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
		autoIncrement: true
    },
    todoname: {
        type: Sequelize.STRING
    },
    duedate: {
        type: Sequelize.DATE
    },
    // important: {
    //     type: Sequelize.ENUM,
    //     values: ['low', 'middle', 'high']
    // },
    userid: {
        type: Sequelize.INTEGER,
        references: { model: User, key: 'userid'}
    }
});

User.hasMany(Todo, { foreignKey: 'userid'});
sequelize.sync({force: true});

/////// Router
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

//addtodo
app.post('/addtodo', function(req, res) {
	if(req.session.username) {
		var uname = req.session.username;
		var uid = req.session.userid;
		var data = req.body;
		var todo = data.todoname;
		Todo.create({
			userid: uid,
			todoname: todo
		}).then(function(result) {
			res.json(result.todoname);
			// res.send('addtodo');
		});
	}
});

// deletetodo  // delete
app.delete('/deletetodo', function(req, res) {
	if(req.session.username) {
		var todoname = req.body.todoname;
		var uid = req.session.userid;
		var uname = req.session.username;

		Todo.destroy({
			where: {
				todoname: todoname,
				userid: uid
			}
		}).then(function(result) {
			res.json(result);
		});
	}
});

//addtododate  // update
app.post('/updatetodo', function(req, res) {
	if(req.session.username) {
		var todoname = req.body.todoname
		var duedate = req.body.duedate;
		var uid = req.session.userid;
		var uname = req.session.username;

		console.log(req.body);
		Todo.findOne({
			where: {
				todoname: todoname,
				userid: uid
			},
			attributes: ['id', 'todoname', 'duedate', 'userid']
		}).then(function(result) {
			result.updateAttributes({
				duedate: duedate
			}).then(function(update) {
				res.json(update);
			});
		});
	}
});

// login
app.post('/login', function(req, res) {
	if(!req.session.username) {

		var data = req.body;
		var uname = data.username;
		var sha2pwd = crypto.createHash('sha256').update(data.password).digest('base64');

		User.findOne({
			where: {
				username: uname,
			},
			attributes: ['username', 'password', 'userid']
			// attributes: ['username', 'password', 'userid', 'useremail']
		}).then(function(result) {
			if(result) {
				if(result.password == sha2pwd) {
					req.session.username = result.username;
					req.session.userid = result.userid;
					req.session.save(function() {
						res.redirect('/');
					});
				} else {
					// username is right but pwd is wrong.
					res.redirect('/');
				}
			} else {
				// username is wrong.
				res.redirect('/');
			}
		});
	}
});

// join
app.post('/join', function(req, res) {
	if(!req.session.username) {
		var data = req.body;
		var uname = data.username;
		var email = data.useremail;
		var sha2pwd = crypto.createHash('sha256').update(data.password).digest('base64');

		User.findOrCreate({
			where: {
				username: uname
			},
			defaults: {
				password: sha2pwd,
				useremail: email
			}
		}).spread(function(result, created) {

			if(created === true) {
				// created === true
				req.session.username = result.username;
				req.session.userid = result.userid;
				req.session.save(function() {
					res.redirect('/');
				});
			} else {
				res.send("false");
			}
        });
	} else {
		res.redirect('/');
	}
});

// logined
app.get('/logincheck', function(req, res) {
	if(req.session.username) {
		var userid = req.session.userid;
		// get all event
		User.findOne({
			where: {
				userid: userid,
			}
		}).then(function(result) {
			res.send(result.dataValues.username);
		});
	} else {
		res.send('false');
	}
});

// google

app.get('/googlelogin', function(req, res) {
	// generate consent page url
	var url = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: 'https://www.googleapis.com/auth/userinfo.email',
		approval_prompt: 'auto',
	});
	res.redirect(url);
});


app.get('/oauth2callback', function(req, res) {
	var code = req.query.code;
	//console.log(code);
	var username, useremail, accesstoken;
	oauth2Client.getToken(code, function(err, tokens){
		if (err) {res.send(err)};
		var token = JSON.parse(JSON.stringify(tokens));
		accesstoken = token.access_token;
		// console.log('accessToken: ' + accesstoken);
		oauth2Client.setCredentials(tokens);

		plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
			if (err) {
				return console.log('An error occured', err);
			}
			//console.log('profile.email: ' + profile.emails[0].value + ' name: ' + profile.name.familyName);
			var profiles = JSON.parse(JSON.stringify(profile));
			username = profiles.name.familyName;
			useremail = profiles.emails[0].value;

			User.findOrCreate({
				where: {username: username, useremail: useremail},
		        // attributes: ['username', 'userid']
			}).spread(function(result, created) {
				if(created === true) {
					req.session.username = result.dataValues.username;
					req.session.userid = result.dataValues.userid;
					req.session.save(function() {
						res.redirect('/');
					});
				} else {
					res.send("false");
				}
	        });
		});
	});
});

// get event in currentMonth
app.get('/getevent/:startday/:endday', function(req, res) {
	if(req.session.username) {
		var start = req.params.startday;
		var end = req.params.endday;
		var userid = req.session.userid;
		// get all event
		Todo.findAll({
			where: {
				userid: userid,
				// $and: [
				// 	{ duedate: {gt: start} },
				// 	{ duedate: {lte: end} },
				// ],
				$or: [{duedate: null},
					{$and: [
						{ duedate: {gt: start} },
						{ duedate: {lte: end} },
					]}
				]
			}
		}).then(function(result) {
			res.json(result);
		});
	} else {
		res.send('false');
	}
});


// logout
app.get('/logout', function(req, res) {
	if(req.session.username) {
		req.session.destroy(function() {
			res.redirect('/');
		});
	} else {
		res.redirect('/');
	}
});


///////
var server = app.listen(8080, function () {
	console.log('Server started!');
});
